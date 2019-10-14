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
                    }, callback) promise // See the next section for how this works
                    db.collection('users').insertMany(// to insert multiple documents the only diffrence is that you use a array now
                        [  
                            { 
                                name: 'Andrew',
                                age: 27
                            },
                            { 
                                name: 'LaupWing',
                                age: 24
                            }
                        ], callback) promise // See the next section for how this works
                })
                ```
                *   **Callback or Promise:** You can choose handle the error and succes handling by either a callback or a promise
                    ```js
                    // Callback method
                    db.collection('users').insertOne({
                        name: 'LaupWing',
                        age: 24
                    },(error, result)=>{
                        // do what you want to do here
                    })
                    ```
                    ```js
                    // Callback method
                    db.collection('users').insertOne({
                        name: 'LaupWing',
                        age: 24
                    }
                    .then(()=>{
                        // succes
                    })
                    .catch(err=?{
                        // failed
                    })
                    ```
        *   **ObjectID:** In mongodb every item has an Id stored in an `ObjectID` class object. If you want to receive, delete or update an item with a specifik id you need to use the `ObjectID` method from the `mongodb` package. You cannot search through the database by simply refering to the id with `_id="3ru23o4234"`, but you need to use this ObjectID method around the id.
            ```js
            const ObjectID = mongodb.ObjectID
            {
                _id: new ObjectID('fr23434f32432423')
            } 
            ```
        *   **findOne:** You can look through a mongodb database by using the findOne or findAll methods. If the findOne methods finds more than 1 matching it will always use the first one found.
            ```js
            db
                .collection('users')
                .findOne({name: 'Laup'},(err, user)=>{
                    if(err) return
                    console.log(user)
                })
            ``` 
        *   **find:** Unlike insert findOne and other similar methods `find` returns a cursor which points to the data. Aftrer the find method you can choose what you want to do with the data, like putting in in an array (`toArray`) or count it etc.
            ```js
            db
                .collection('users')
                .find({name: 'Laup'}).toArray((err,users)=>{
                    console.log(users) // returns an array you can also use count to count the results
                })
            ``` 
        *   **updateOne/updateMany:** This is just like the insertOne and insertMany method but than it updates the matching parameter. And in the $set property it updates the things you want it to update.
            ```js
            // Callback method
            db.collection('users').updateOne({
                name: 'LaupWing' // updates the user with this name
            },{
                $set:{
                    name: 'LocNguyen'
                }
            },
            (error, result)=>{
                // do what you want to do here
            })
            ```
            ```js
            // Callback method
            db.collection('users').updateOne({
                name: 'LaupWing'
            },{
                $set:{
                    name: 'LocNguyen'
                }
            })
            .then(()=>{
                // succes
            })
            .catch(err=>{
                // failed
            })
            ```
        *   **deleteOne/deleteMany:** This is exactly like the `insertOne`/`insertMany` methods. But both this one deletes instead of inserts it.