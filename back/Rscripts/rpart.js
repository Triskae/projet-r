const R = require('r-script')
const core = require('./core')

module.exports = {
    processRpart: async (inputs, RFile) => {
        const outputData = R(core('rpart.R')).data().callSync()

        const response = _.map(outputData.prediction, (x, i) => ({
            ...outputData.dataet[i],
            prediction: x,
        }))
    },
}
