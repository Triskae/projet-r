const _ = require('lodash')
const csvPath = './data/dataset.csv'
const csv = require('csvtojson')
const fs = require('fs')

const getDataset = async () => await csv().fromFile(csvPath)

const getAccuracyFromMatrix = (CM) => {
    return (CM[0][0] + CM[1][1]) / (_.sum(CM[0]) + _.sum(CM[1]))
}

const Rlist_to_array = (Rlist) =>
    _.map([_.keys(Rlist[0]), ..._.map(Rlist, _.values)], (x) => {
        const [data, ...rest] = _.chunk(x, _.size(x) - 1)
        const prob = _.first(...rest)
        return [...data, prob < 0.5 ? Math.abs(prob - 1) : prob]
    })

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
    return new Buffer(bitmap).toString('base64')
}

module.exports = {
    base64Encode,
    getAccuracyFromMatrix,
    getDataset,
    Rlist_to_array,
    rScripts,
}
