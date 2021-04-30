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
data_new <- read.csv("predict.csv", header = TRUE, sep = ",", dec = ".", stringsAsFactors = T)
setwd('../images')
data_shuffle <- data[sample(seq_along(data[, 1])),]

data_ea <- data_shuffle[1:800,]
data_et <- data_shuffle[801:1200,]

jpeg('rforest.jpg')

#----------------#
# RANDOM FORESTS #
#----------------#

test_rf <- function(arg1, arg2, arg3){
# Apprentissage du classifeur
rf <- randomForest(default~., data_ea, ntree = arg1, mtry = arg2)

# Test du classifeur : classe predite
rf_class <- predict(rf,data_et, type="response")

# Test du classifeur : probabilites pour chaque prediction
rf_prob <- predict(rf, data_et, type="prob")

# Courbe ROC
rf_pred <- prediction(rf_prob[,2], data_et$default)
rf_perf <- performance(rf_pred,"tpr","fpr")
plot(rf_perf, main = "Random Forests randomForest()", add = FALSE, col = arg3)
  dev.off()

# Calcul de l'AUC
rf_auc <- performance(rf_pred, "auc")

confusionMatrix <- as.matrix(
  table(data_et$default, rf_class),
)

  #this is a security to ensure a 2 dimensionnal confusion matrix
  if(length(confusionMatrix[1,])==1){
    confusionMatrix <- cbind(c(confusionMatrix[1,],0), c(confusionMatrix[2,],0))
  }

  rf.class <- predict(rf, data_new, type="class" )
  rf.prob <- predict(rf, data_new, type="prob")

  data_new$default <- rf.class
  data_new$probability<-rf.prob[,1]

  data_et$prediction <- rf_class
  data_et$probability <- rf_prob[,1]

return(list("AUC"=as.character(attr(rf_auc, "y.values")),
            "dataEtPrediction"=data_et,
            "dataNewPrediction"=data_new,
            "confusionMatrix"=
              list("predictedPositive"=confusionMatrix[1,]
                ,"predictedNegative"=confusionMatrix[2,])
))
}

test_rf(arg1,arg2,arg3)