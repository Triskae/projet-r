const R = require('./Rscripts')
const app = require('./server')

app.get('/classifier/rpart', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1,
        arg2: req.body.arg2,
        arg3: req.body.arg3,
        arg4: req.body.arg4,
    }

    const output = await R.rpart(inputs)

    res.send(output)
})
