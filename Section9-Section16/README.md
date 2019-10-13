### MongoDB
*   **mongodb** module
    In node you have a mode module made and maintained by the mongodb developers. It makes it easier to connect your node application to your mongodb database.
    *   When you `require` the package you got the a object back from the package. In order to connect to your mongodb database you need to activate the mongodb client by calling the following property `mongodb.MongoClient`.
        *   The `MongoClient.connect` methods needs quite a few parameters: The first is your  connectionUrl which is the url of your mongodb server (localhost and the port), second is a options object (which hold your options for the connection) and third is a callback function, to see if node can connect to your database.
            ```js
            const connectionUrl = 'mongodb://127.0.0.1:27017' // this is often the samen unless you assigned the port to another value 
            MongoClient.connect(
                connectionUrl, 
                {useNewUrlParser:true}, // this is must to correctly parse the url
                (err, client)=>{
                    if(err) return // it here is an error that means you cant connect to your database
                }
                )
            ```
            *   You can have multiple databases in mongodb which can hold your data. If the connection to your mongodb is succesful you can specify the MongoClient which database to use. If the database doesnt exist Mongo will make it for you then.
                ```js
                const connectionUrl = 'mongodb://127.0.0.1:27017'
                const databaseName = 'task-manager' // databaseName
                MongoClient.connect(
                    connectionUrl, 
                    {useNewUrlParser:true}, // this is must to correctly parse the url
                    (err, client)=>{
                        if(err) return // it here is an error that means you cant connect to your database
                        const db = client.db(databaseName) // use task-manager db

                        db.collection('users') // use the collection users of the task-manager db
                    }
                    )
                ```
            *   **insertOne/insertMany:** Inside the **MongoClient.connect** callback parameter you can insert documents to your database. In order to do this you first need to specifiy which database to use `const db = client.db(databaseName)` and than which the collection to use of this database `db.collection('users')`. Than you can choose to `inserOne` or `insertMany` documents.
                ```js
                const connectionUrl = 'mongodb://127.0.0.1:27017'
                const databaseName = 'task-manager' // databaseName
                MongoClient.connect(connectionUrl, {useNewUrlParser:true},(err, client)=>{
                    if(err) return 
                    const db = client.db(databaseName)
                    db.collection('users').insertOne({ // to insert one document
                        name: 'Andrew',
                        age: 27
                    })
                    db.collection('users').insertMany({ // to insert multiple documents
                        name: 'Andrew',
                        age: 27
                    })
                })
                ```