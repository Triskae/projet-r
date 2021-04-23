#--------------------------------------#
# ACTIVATION DES LIRAIRIES NECESSAIRES #
#--------------------------------------#
attach(input[[1]])
needs(randomForest)
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

jpeg('rf.jpg')


#----------------#
# RANDOM FORESTS #
#----------------#

test_rf <- function(arg1, arg2, arg3, arg4){
  # Apprentissage du classifeur
  rf <- randomForest(default~., data_ea, ntree = arg1, mtry = arg2)

  # Test du classifeur : classe predite
  rf_class <- predict(rf,data_et, type="response")

  # Test du classifeur : probabilites pour chaque prediction
  rf_prob <- predict(rf, data_et, type="prob")

  # Courbe ROC
  rf_pred <- prediction(rf_prob[,2], data_et$default)
  rf_perf <- performance(rf_pred,"tpr","fpr")
  plot(rf_perf, main = "Random Forests randomForest()", add = arg3, col = arg4)
    dev.off()

  # Calcul de l'AUC et affichage par la fonction cat()
  rf_auc <- performance(rf_pred, "auc")

  confusionMatrix <- as.matrix(
    table(data_et$default, dt_class),
  )

  return(list("AUC"=as.character(attr(rf_auc, "y.values")),
              "prediction"=rf_class,
              "dataet"=data_et,
              "confusionMatrix"=
                list("predictedPositive"=confusionMatrix[1,]
                  ,"predictedNegative"=confusionMatrix[2,])
  ))
}

test_rf(arg1,arg2,arg3,arg4)