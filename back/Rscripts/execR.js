const _ = require('lodash')
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
        accuracy: _.round(H.getAccuracyFromMatrix([
            CM.predictedPositive,
            CM.predictedNegative,
        ]),3),
        AUC: _.round(parseFloat(AUC),3),
        image,
        dataEtPrediction: H.Rlist_to_array(dataEtPrediction),
        dataNewPrediction: H.Rlist_to_array(dataNewPrediction),
        confusionMatrix: [CM.predictedPositive, CM.predictedNegative],
        score:_.round(100*(parseFloat(AUC)+H.getAccuracyFromMatrix([
            CM.predictedPositive,
            CM.predictedNegative,
        ]))/2)
    }
}
