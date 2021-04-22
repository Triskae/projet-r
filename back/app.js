const R = require('r-script')
const _ = require('lodash')
const app = require('./server')
const h = require('./helpers')

app.get('/classifier/rpart', async (req, res) => {
    const inputs = {
        arg1: req.body.arg1,
        arg2: req.body.arg2,
        arg3: req.body.arg3,
        arg4: req.body.arg4,
    }

    const outputData = R(core('rpart.R')).data().callSync()
})
