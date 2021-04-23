#--------------------------------------#
# ACTIVATION DES LIRAIRIES NECESSAIRES #
#--------------------------------------#
attach(input[[1]])
needs(rpart)
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

jpeg('rpart.jpg')

#-------------------------#
# ARBRE DE DECISION RPART #
#-------------------------#

# Apprentissage du classifeur
test_rpart <- function(arg1, arg2, arg3, arg4){
dt <- rpart(default~., data_ea, parms = list(split = arg1), control = rpart.control(minbucket = arg2))

 # Tests du classifieur : classe predite
 dt_class <- predict(dt, data_et, type="class")

 # Tests du classifieur : probabilites pour chaque prediction
 dt_prob <- predict(dt, data_et, type="prob")

# Courbes ROC
dt_pred <- prediction(dt_prob[,2], data_et$default)
dt_perf <- performance(dt_pred,"tpr","fpr")
plot(dt_perf, main = "Arbres de décision rpart()", add = arg3, col = arg4)
 dev.off()

# Calcul de l'AUC et affichage par la fonction cat()
dt_auc <- performance(dt_pred, "auc")

 confusionMatrix <- as.matrix(
   table(data_et$default, dt_class),
 )

 return(list("AUC"=as.character(attr(dt_auc, "y.values")),
             "prediction"=dt_class,
             "dataet"=data_et,
             "confusionMatrix"=
               list("predictedPositive"=confusionMatrix[1,]
               ,"predictedNegative"=confusionMatrix[2,])
 ))
}


test_rpart(arg1,arg2,arg3,arg4)

