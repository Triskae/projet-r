const R = require('r-script')
const _ = require('lodash')
const app = require('./server')
const h = require('./helpers')

const core = (rScript) => `../core/${rScript}`

// this is a hello world to connect R to nodejs.
app.get('/exsync', async (req, res) => {
    console.log('R is processing.')
    R(core('ex-sync.R'))
        .data('hello world', 20)
        .call((err, out) => {
            if (err) throw err
            res.send(out)
        })
    await h.getDataset()
    console.log('R has processed.')
})

app.get('/test', async (req, res) => {
    console.log('R is processing.')
    R(core('test.R'))
        .data({ toto: 'The output string' })
        .callSync((err, out) => {
            if (err) throw err
            res.send(out)
        })
    console.log('R has processed.')
})

app.get('/model', async (req, res) => {
    console.log('R is processing.')
    const outputData = R(core('processData.R'))
        .data({ toto: 'The output string' })
        .callSync()

    const response = _.map(outputData.prediction, (x, i) => ({
        ...outputData.dataet[i],
        prediction: x,
    }))

    res.send(response)
    console.log('R has processed.')
})
