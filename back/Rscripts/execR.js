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
        image: null,
        ...(await R(core(rScript + '.R')).data(inputs).callSync()),
    }

    outputData.image = await H.base64Encode(rScript)

    const { AUC, prediction, dataet, confusionMatrix, image } = outputData

    const CM = {
        predictedPositive: null,
        predictedNegative: null,
        ...confusionMatrix,
    }

    return {
        AUC: AUC,
        image,
        predicted_data: H.Rlist_to_array(
            _.map(prediction, (x, i) => ({
                ...dataet[i],
                prediction: x,
            }))
        ),
        confusionMatrix: [CM.predictedPositive, CM.predictedNegative],
    }
}
