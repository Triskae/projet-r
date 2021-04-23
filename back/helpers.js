const _ = require('lodash')
const csvPath = './data/dataset.csv'
const csv = require('csvtojson')

const getDataset = async () => await csv().fromFile(csvPath)

const Rlist_to_array = (Rlist) => [_.keys(Rlist[0]), ..._.map(Rlist, _.values)]

module.exports = {
    getDataset,
    Rlist_to_array,
}
