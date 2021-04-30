#--------------------------------------#
# ACTIVATION DES LIRAIRIES NECESSAIRES #
#--------------------------------------#
attach(input[[1]])
needs(naivebayes)
needs(ROCR)

#-------------------------#
# PREPARATION DES DONNEES #
#-------------------------#

setwd('data')
data <- read.csv("dataset.csv", header = TRUE, sep = ",", dec = ".", stringsAsFactors = T)
data_new <- read.csv("predict.csv", header = TRUE, sep = ",", dec = ".", stringsAsFactors = T)
setwd('../images')
data_shuffle <- data[sample(seq_along(data[, 1])),]

data_ea <- data_shuffle[1:800,]
data_et <- data_shuffle[801:1200,]

jpeg('naivebayes.jpg')

#-------------#
# NAIVE BAYES #
#-------------#

# Definition de la fonction d'apprentissage, test et evaluation par courbe ROC
test_nb <- function(arg1, arg2, arg3){
  # Apprentissage du classifeur
  nb <- naive_bayes(default~., data_ea, laplace = arg1, usekernel = arg2)

  # Test du classifeur : classe predite
  nb_class <- predict(nb, data_et, type="class")

  # Test du classifeur : probabilites pour chaque prediction
  nb_prob <- predict(nb, data_et, type="prob")

  # Courbe ROC
  nb_pred <- prediction(nb_prob[,2], data_et$default)
  nb_perf <- performance(nb_pred,"tpr","fpr")
  plot(nb_perf, main = "Classifieurs bayésiens naïfs naiveBayes()", add = FALSE, col = arg3)
  dev.off()

  confusionMatrix <- as.matrix(
    table(data_et$default, nb_class),
  )

  #this is a security to ensure a 2 dimensionnal confusion matrix
  if(length(confusionMatrix[1,])==1){
    confusionMatrix <- cbind(c(confusionMatrix[1,],0), c(confusionMatrix[2,],0))
  }

  # Calcul de l'AUC et affichage par la fonction cat()
  nb_auc <- performance(nb_pred, "auc")

  nb.class <- predict(nb, data_new, type="class" )
  nb.prob <- predict(nb, data_new, type="prob")

  data_new$default <- nb.class
  data_new$probability<-nb.prob[,1]

  data_et$prediction <- nb_class
  data_et$probability <- nb_prob[,1]

  return(list("AUC"=as.character(attr(nb_auc, "y.values")),
              "dataEtPrediction"=data_et,
              "dataNewPrediction"=data_new,
              "confusionMatrix"=
                list("predictedPositive"=confusionMatrix[1,]
                  ,"predictedNegative"=confusionMatrix[2,])
  ))

}


test_nb(arg1,arg2,arg3)