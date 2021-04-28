const R = require('r-script')
const core = require('./core')
const H = require('../helpers')

module.exports = async (inputs, rScript) => {
    const outputData = {
        AUC: null,
        dataEtPrediction: null,
        dataNewPrediction: null,
        confusionMatrix: null,
        image: null,
        ...(await R(core(rScript + '.R'))
            .data(inputs)
            .callSync()),
    }

    outputData.image = await H.base64Encode(rScript)

    const {
        AUC,
        dataEtPrediction,
        dataNewPrediction,
        confusionMatrix,
        image,
    } = outputData

    const CM = {
        predictedPositive: null,
        predictedNegative: null,
        ...confusionMatrix,
    }

    return {
        AUC: AUC,
        image,
        dataEtPrediction: H.Rlist_to_array(dataEtPrediction),
        dataNewPrediction: H.Rlist_to_array(dataNewPrediction),
        confusionMatrix: [CM.predictedPositive, CM.predictedNegative],
    }
}
