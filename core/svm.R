#--------------------------------------#
# ACTIVATION DES LIRAIRIES NECESSAIRES #
#--------------------------------------#
attach(input[[1]])
needs(e1071)
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


jpeg('svm.jpg')

#-------------------------#
# SUPPORT VECTOR MACHINES #
#-------------------------#

test_svm <- function(arg1, arg2){
  # Apprentissage du classifeur
  svm <- svm(default~., data_ea, probability=TRUE, kernel = arg1)

  # Test du classifeur : classe predite
  svm_class <- predict(svm, data_et, type="response")

  # Test du classifeur : probabilites pour chaque prediction
  svm_prob <- predict(svm, data_et, probability=TRUE)

  # Recuperation des probabilites associees aux predictions
  svm_prob <- attr(svm_prob, "probabilities")

  # Courbe ROC
  svm_pred <- prediction(svm_prob[,1], data_et$default)
  svm_perf <- performance(svm_pred,"tpr","fpr")

  plot(svm_perf, main = "Support vector machines svm()", add = FALSE, col = arg2)
  dev.off()

  # Calcul de l'AUC et affichage par la fonction cat()
  svm_auc <- performance(svm_pred, "auc")

  confusionMatrix <- as.matrix(
    table(data_et$default, svm_class),
  )

  svm.class <- predict(svm, data_new, type="response" )
  svm.prob <- attr(predict(svm, data_new, probability = TRUE),"probabilities")

  data_new$default <- svm.class
  data_new$probability<-svm.prob[,1]

  data_et$prediction <- svm_class
  data_et$probability <- svm_prob[,1]



  return(list("AUC"=as.character(attr(svm_auc, "y.values")),
              "dataEtPrediction"=data_et,
              "dataNewPrediction"=data_new,
              "confusionMatrix"=
                list("predictedPositive"=confusionMatrix[1,]
                  ,"predictedNegative"=confusionMatrix[2,])
  ))

}

test_svm(arg1,arg2)