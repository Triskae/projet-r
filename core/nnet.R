#--------------------------------------#
# ACTIVATION DES LIRAIRIES NECESSAIRES #
#--------------------------------------#
attach(input[[1]])
needs(nnet)
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

jpeg('nnet.jpg')

#-----------------#
# NEURAL NETWORKS #
#-----------------#

test_nnet <- function(arg1, arg2, arg3, arg4){
  # Redirection de l'affichage des messages intermédiaires vers un fichier texte
  sink('output.txt', append=T)

  # Apprentissage du classifeur
  nn <- nnet(default~., data_et, size = arg1, decay = arg2, maxit=arg3)

  # Réautoriser l'affichage des messages intermédiaires
  sink(file = NULL)

  # Test du classifeur : classe predite
  nn_class <- predict(nn, data_et, type="class")

  # Test des classifeurs : probabilites pour chaque prediction
  nn_prob <- predict(nn, data_et, type="raw")

  # Courbe ROC
  nn_pred <- prediction(nn_prob[,1], data_et$default)
  nn_perf <- performance(nn_pred,"tpr","fpr")

  plot(nn_perf, main = "Réseaux de neurones nnet()", add = FALSE, col = arg4)
    dev.off()

  # Calcul de l'AUC
  nn_auc <- performance(nn_pred, "auc")

  confusionMatrix <- as.matrix(
    table(data_et$default, nn_class),
  )

  #this is a security to ensure a 2 dimensionnal confusion matrix
  if(length(confusionMatrix[1,])==1){
    confusionMatrix <- cbind(c(confusionMatrix[1,],0), c(confusionMatrix[2,],0))
  }

  nn.class <- predict(nn, data_new, type="class" )
  nn.prob <- predict(nn, data_new, type="raw")

  data_new$default <- nn.class
  data_new$probability<-nn.prob[,1]

  data_et$prediction <- nn_class
  data_et$probability <- nn_prob[,1]


  return(list("AUC"=as.character(attr(nn_auc, "y.values")),
              "dataEtPrediction"=data_et,
              "dataNewPrediction"=data_new,
              "confusionMatrix"=
                list("predictedPositive"=confusionMatrix[1,]
                  ,"predictedNegative"=confusionMatrix[2,])
  ))

}

test_nnet(arg1,arg2,arg3,arg4)