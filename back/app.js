const R = require('./Rscripts')
const app = require('./server')
const H = require('./helpers')

const datasetPath = './data/dataset.csv'

app.get('/dataset', async (req, res) => {
    const dataset = await H.getDataset()

    res.json(H.Rlist_to_array(dataset))
})

//for decision tree
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
app.get('/classifier/rf', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // number ex: 300, 500, ...
        arg2: req.body.arg2, // number ex: 3, 5, ...
        arg3: req.body.arg3, // boolean
        arg4: req.body.arg4, // color ex: 'orange', 'green', 'red', 'blue', ...
    }
})

//k nearest neighbors
app.get('/classifier/knn', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // number ex: 10, 20, ...
        arg2: req.body.arg2, // number ex: 5, 10, ...
        arg3: req.body.arg3, // boolean
        arg4: req.body.arg4, // color ex: 'orange', 'green', 'red', 'blue', ...
    }
})

//support vector machine
app.get('/classifier/svm', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // "gini" || "information"
        arg2: req.body.arg2, // number ex: 5, 10, ...
        arg3: req.body.arg3, // boolean
        arg4: req.body.arg4, // color ex: 'orange', 'green', 'red', 'blue', ...
    }
})

//naive bayes
app.get('/classifier/nb', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // "gini" || "information"
        arg2: req.body.arg2, // number ex: 5, 10, ...
        arg3: req.body.arg3, // boolean
        arg4: req.body.arg4, // color ex: 'orange', 'green', 'red', 'blue', ...
    }
})

//neural network
app.get('/classifier/nn', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // "gini" || "information"
        arg2: req.body.arg2, // number ex: 5, 10, ...
        arg3: req.body.arg3, // boolean
        arg4: req.body.arg4, // color ex: 'orange', 'green', 'red', 'blue', ...
    }
})
