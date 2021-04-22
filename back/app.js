const R = require('r-script')
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
        .call((err, out) => {
            if (err) throw err
            res.send(out)
        })
    console.log('R has processed.')
})

app.get('/model', async (req, res) => {
    console.log('R is processing.')
    R(core('processData.R'))
        .data({ toto: 'The output string' })
        .call((err, out) => {
            if (err) throw err
            res.send(out)
        })
    console.log('R has processed.')
})
