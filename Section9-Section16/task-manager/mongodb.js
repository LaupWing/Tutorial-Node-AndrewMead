const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const id = new ObjectID()
console.log(id.getTimestamp())
const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, {useNewUrlParser:true, useUnifiedTopology:true},(error, client)=>{
    if(error){
        return console.log('Unable to connect',error)
    }
    const db = client.db(databaseName)
    
    // db.collection('users').insertOne({
    //     name: 'Laup',
    //     age: 24
    // }, (error, result)=>{
    //     if(error){
    //         console.log('Unable to insert user')
    //         console.log(error)
    //     }else{
    //         console.log(result.ops)
    //     }
    // })
    db.collection('tasks').insertMany([
        {
            task: 'TEST',
            description: 'HAlllo',
            completed: false
        },
        {
            task: 'Insertmany',
            description: 'Inserting many',
            completed: true
        },
    ],(error,result)=>{
        if(error){
            console.log(error, 'there is an error')
        }else{
            console.log(result.ops)
        }
    })
})