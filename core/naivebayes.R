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

  # Calcul de l'AUC et affichage par la fonction cat()
  nb_auc <- performance(nb_pred, "auc")

  return(list("AUC"=as.character(attr(nb_auc, "y.values")),
              "prediction"=nb_class,
              "dataet"=data_et,
              "confusionMatrix"=
                list("predictedPositive"=confusionMatrix[1,]
                  ,"predictedNegative"=confusionMatrix[2,])
  ))

}


test_nb(arg1,arg2,arg3)