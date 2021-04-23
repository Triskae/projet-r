const _ = require('lodash')

module.exports = {
    Rlist_to_array: (Rlist) => [_.keys(Rlist[0]), ..._.map(Rlist, _.values)],
}
