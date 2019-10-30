const mongoose = require('mongoose')
const databaseName = 'task-manager-api'

mongoose.connect(`${process.env.MONGODB_URL}/${databaseName}`, {
    useNewUrlParser:true,
    useCreateIndex:true, // true to quickly acces the data we need
    useUnifiedTopology: true
})

