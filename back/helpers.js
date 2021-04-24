const _ = require('lodash')
const csvPath = './data/dataset.csv'
const csv = require('csvtojson')
const fs = require('fs')

const getDataset = async () => await csv().fromFile(csvPath)

const Rlist_to_array = (Rlist) => [_.keys(Rlist[0]), ..._.map(Rlist, _.values)]

const rScripts = {
    decisionTree: 'rpart',
    randomForest: 'rforest',
    kNearestNeighbors: 'kknn',
    supportVectorMachine: 'svm',
    naiveBayes: 'naivebayes',
    neuralNetwork: 'nnet',
}

const base64Encode = (fileName) => {
    const bitmap = fs.readFileSync('./images/' + fileName + '.jpg')
    console.log(new Buffer(bitmap).toString('base64'))
    return new Buffer(bitmap).toString('base64')
}

module.exports = {
    base64Encode,
    getDataset,
    Rlist_to_array,
    rScripts,
}
