const _ = require('lodash')
const R = require('r-script')
const core = require('./core')

module.exports = async (inputs) => {
    const outputData = { ...(await R(core('rpart.R')).data(inputs).callSync()) }

    return {
        predicted_data: _.map(outputData.prediction, (x, i) => ({
            ...outputData.dataet[i],
            prediction: x,
        })),
        dataet: outputData.dataet,
        confusionMatrix: outputData.confusionMatrix,
    }
}
