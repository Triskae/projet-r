# example/ex-sync.R
needs(magrittr)
set.seed(512)
a <- c(1,2,3,4,5)
do.call(rep, input) %>%
  strsplit(NULL) %>%
  sapply(sample) %>%
  apply(2, paste, collapse = "")

input