const _ = require('lodash')
const R = require('r-script')
const core = require('./core')
const H = require('../helpers')

module.exports = async (inputs, rScript) => {
    const outputData = {
        AUC: null,
        prediction: null,
        dataet: null,
        confusionMatrix: null,
        ...(await R(core(rScript)).data(inputs).callSync()),
    }

    const { AUC, prediction, dataet, confusionMatrix } = outputData

    const CM = {
        predictedPositive: null,
        predictedNegative: null,
        ...confusionMatrix,
    }

    return {
        AUC: AUC,
        predicted_data: H.Rlist_to_array(
            _.map(prediction, (x, i) => ({
                ...dataet[i],
                prediction: x,
            }))
        ),
        confusionMatrix: [CM.predictedPositive, CM.predictedNegative],
    }
}
