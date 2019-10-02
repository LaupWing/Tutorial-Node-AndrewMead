const chalk = require('chalk')
module.exports = {
    succes: (value) =>{
        return chalk.green.inverse(value)
    },
    fail: (value) =>{
        return chalk.red.inverse(value)
    },
}