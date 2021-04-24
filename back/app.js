const R = require('./Rscripts')
const app = require('./server')
const H = require('./helpers')

app.get('/dataset', async (req, res) => {
    const dataset = await H.getDataset()

    try {
        res.json(H.Rlist_to_array(dataset))
    }
    catch (e) {
        res.error(e);
    }
})

//for decision tree
app.get('/classifier/rpart', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // "gini" || "information"
        arg2: req.body.arg2, // number ex: 5, 10, ...
        arg3: req.body.arg3, // color ex: 'orange', 'green', 'red', 'blue', ...
    }

    try {
        const output = await R.execR(inputs, H.rScripts.decisionTree)
        res.send(output)
    }
    catch (e) {
        res.error(e)
    }
})

//for random forest
app.get('/classifier/rf', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // number ex: 300, 500, ...
        arg2: req.body.arg2, // number ex: 3, 5, ...
        arg3: req.body.arg3, // color ex: 'orange', 'green', 'red', 'blue', ...
    }

    try {
        const output = await R.execR(inputs, H.rScripts.decisionTree)
        res.send(output)
    }
    catch (e) {
        res.error(e)
    }
})

//k nearest neighbors
app.get('/classifier/kknn', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // number ex: 10, 20, ...
        arg2: req.body.arg2, // number ex: 5, 10, ...
        arg3: req.body.arg3, // color ex: 'orange', 'green', 'red', 'blue', ...
    }

    try {
        const output = await R.execR(inputs, H.rScripts.kNearestNeighbors)
        res.send(output)
    }
    catch (e) {
        res.error(e)
    }
})

//support vector machine
app.get('/classifier/svm', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // "linear" || "polynomial" || "radial" || "sigmoid"
        arg2: req.body.arg2, // color ex: "red", "blue", "green", "orange"
    }

    try {
        const output = await R.execR(inputs, H.rScripts.supportVectorMachine)
        res.send(output)
    }
    catch (e) {
        res.error(e)
    }

})

//naive bayes
app.get('/classifier/nb', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // number ex: 0, 20, ...
        arg2: req.body.arg2, // boolean
        arg3: req.body.arg3, // color ex: 'orange', 'green', 'red', 'blue', ...
    }
    const output = await R.execR(inputs, H.rScripts.naiveBayes)

    res.send(output)
})

//neural network
app.get('/classifier/nnet', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // number ex: 25, 50, ...
        arg2: req.body.arg2, // number ex: 0.01, 0.001, ...
        arg3: req.body.arg3, // number ex: 100, 300, ...
        arg4: req.body.arg4, // color ex: 'orange', 'green', 'red', 'blue','tomato', ...
    }

    const output = await R.execR(inputs, H.rScripts.neuralNetwork)

    res.send(output)
})
