#attach(input[[1]])

#--------------------------------------#
# ACTIVATION DES LIRAIRIES NECESSAIRES #
#--------------------------------------#

needs(rpart)

setwd('data')
data <- read.csv("dataset.csv", header = TRUE, sep = ",", dec = ".", stringsAsFactors = T)
data_shuffle <- data[sample(seq_along(data[, 1])),]

data_ea <- data_shuffle[1:800,]
data_et <- data_shuffle[801:1200,]

arg1<-"gini"
arg2<-10


# Apprentissage du classifeur
dt <- rpart(default~., data_ea, parms = list(split = arg1), control = rpart.control(minbucket = arg2))

 # Tests du classifieur : classe predite
 dt_class <- predict(dt, data_et, type="class")

 # Matrice de confusion
 print(table(data_et$default, dt_class))

 # Tests du classifieur : probabilites pour chaque prediction
 dt_prob <- predict(dt, data_et, type="prob")

list("prediction"=dt_class,"dataet"=data_et)
