const R = require('./Rscripts')
const app = require('./server')

app.get('/classifier/rpart', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // "gini" || "information"
        arg2: req.body.arg2, // number ex: 5, 10, ...
        arg3: req.body.arg3, // boolean
        arg4: req.body.arg4, // color ex: 'orange', 'green', 'red', 'blue', ...
    }

    const output = await R.rpart(inputs)

    res.send(output)
})

//for random forest
app.get('/classifier/rf', async () => {})

//k nearest neighbors
app.get('/classifier/knn', async () => {})

//support vector machine
app.get('/classifier/svm', async () => {})

//naive bayes
app.get('/classifier/nb', async () => {})

//neural network
app.get('/classifier/nn', async () => {})
