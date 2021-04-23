const _ = require('lodash')
const R = require('r-script')
const core = require('./core')
const H = require('../helpers')

module.exports = async (inputs, rScript) => {
    const outputData = {
        prediction: null,
        dataet: null,
        ...(await R(core(rScript)).data(inputs).callSync()),
    }

    const CM = {
        predictedPositive: null,
        predictedNegative: null,
        ...outputData.confusionMatrix,
    }

    return {
        predicted_data: H.Rlist_to_array(
            _.map(outputData.prediction, (x, i) => ({
                ...outputData.dataet[i],
                prediction: x,
            }))
        ),
        confusionMatrix: [CM.predictedPositive, CM.predictedNegative],
    }
}
