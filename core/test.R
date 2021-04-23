


test_rf <- function(arg1, arg2, arg3, arg4){
  # Apprentissage du classifeur
  rf <- randomForest(Produit~., produit_QF_EA, ntree = arg1, mtry = arg2)

  # Test du classifeur : classe predite
  rf_class <- predict(rf,produit_QF_ET, type="response")

  # Matrice de confusion
  print(table(produit_QF_ET$Produit, rf_class))

  # Test du classifeur : probabilites pour chaque prediction
  rf_prob <- predict(rf, produit_QF_ET, type="prob")

  # Courbe ROC
  rf_pred <- prediction(rf_prob[,2], produit_QF_ET$Produit)
  rf_perf <- performance(rf_pred,"tpr","fpr")
  plot(rf_perf, main = "Random Forests randomForest()", add = arg3, col = arg4)

  # Calcul de l'AUC et affichage par la fonction cat()
  rf_auc <- performance(rf_pred, "auc")
  cat("AUC = ", as.character(attr(rf_auc, "y.values")))

  # Return sans affichage sur la console
  invisible()
}