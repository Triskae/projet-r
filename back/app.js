const app = require('./server')
const R = require('r-script')

app.get('/hw', async (req, res) => {
    console.log('someone entered...')
    var out = R('ex-sync.R').data('hello world', 20).callSync()
    console.log(out)

    res.send('hello world')
})
