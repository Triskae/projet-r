const csvPath = './data/dataset.csv'
const csv = require('csvtojson')

const getDataset = () =>
    csv()
        .fromFile(csvPath)
        .then((jsonObj) => {
            console.log(jsonObj)
        })

module.exports = { getDataset }
