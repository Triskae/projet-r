const R = require('./Rscripts')
const app = require('./server')
const H = require('./helpers')

app.get('/dataset', async (req, res) => {
    const dataset = await H.getDataset()

    try {
        res.json(H.Rlist_to_array(dataset))
    } catch (e) {
        res.status(500).send(e)
    }
})

//for decision tree
app.get('/classifier/rpart', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // "gini" || "information"
        arg2: req.body.arg2, // number [0,20] step:0.1
        arg3: req.body.arg3, // color ex: 'orange', 'green', 'red', 'blue', ...
    }

    try {
        const output = await R.execR(inputs, H.rScripts.decisionTree)
        res.send(output)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

//for random forest
app.get('/classifier/rf', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // number ex: [0,500] step:1
        arg2: req.body.arg2, // number ex: [0,10] step:0.1
        arg3: req.body.arg3, // color ex: 'orange', 'green', 'red', 'blue', ...
    }

    try {
        const output = await R.execR(inputs, H.rScripts.decisionTree)
        res.send(output)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

//k nearest neighbors
app.get('/classifier/kknn', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // number [0,20] step:0.1
        arg2: req.body.arg2, // number [0,10] step:0.1
        arg3: req.body.arg3, // color ex: 'orange', 'green', 'red', 'blue', ...
    }

    try {
        console.log('reached')
        const output = await R.execR(inputs, H.rScripts.kNearestNeighbors)
        res.send(output)
        console.log('reached')
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
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
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

//naive bayes
app.get('/classifier/nb', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // number [0,20] step:0.1
        arg2: req.body.arg2, // boolean
        arg3: req.body.arg3, // color ex: 'orange', 'green', 'red', 'blue', ...
    }
    const output = await R.execR(inputs, H.rScripts.naiveBayes)

    res.send(output)
})

//neural network
app.get('/classifier/nnet', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1, // number [0,100] step:1
        arg2: req.body.arg2, // number [0,1] step: 0.0001
        arg3: req.body.arg3, // number [0,500] step:1
        arg4: req.body.arg4, // color ex: 'orange', 'green', 'red', 'blue','tomato', ...
    }

    const output = await R.execR(inputs, H.rScripts.neuralNetwork)

    res.send(output)
})
