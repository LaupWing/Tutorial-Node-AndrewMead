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

*   **Mongoose:** Mongoose is a library which builds on the mongodb library package. It makes crud operations much easier to work with and it adds some additional features to make your server more sufficient. 
    *   **Models:** This is the operations of the data. Does this item exist? Delete this item. Aka basic crud operations.
        *   **CRUD:** The crud operations in mongoose if quite basic. You call the model you want to perform the crud operation on and use one of the many crud operation like `findByIdAndDelete` or `findAndDelete`. The only diffrence between those two is that you need id by the first and the second you can freestyle it. There are many more other methods by deleting with mongoose so is for update and add. See the mongoose documentation for the specifications of the operation
            ```js
            const tasks = await Task.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true}) // 1st parameter is the search id, 2st parameter is the updated value, 3rd is the options paramater (new is use the newly updated data en runValidators is running the validators first before saving) 
            ```
    *   **Schema:** This is the structure of the data. How does it looks like? What kind of properties does it got?
        *   In the schema properties you can define the settings of this property. Is this field required? You can transform the value to lowercase before saving it in the database and much more.
            ```js
            {
                email:{
                    type: String,
                    required: true,
                    trim: true,
                    lowercase: true,
                    validate(value){ // extra validation check
                        if(!validator.isEmail(value)){
                            throw new Error('Email is invalid') // Throw error so it stops the code
                        }
                    }
                },
            }
            ```
    *   **Functions before actions(`pre`):** In Mongoose its possible to call a functions some actions are started like delete update or save. This gives us more controle before something happends. These functions can be called by using the `pre` keyword on the schema/model you want to use one. The `pre` keyword accepts two parameters. First parameter you need to define before which action you want to start the function for example before `save` or `remove`. There are more. The second parameter is the function you want to start. In this fucntion you have a next parameter which you need to start before going on with the action you have called.
        ```js
         // findByIdAndUpdate doesnt work here because mongoose bypasses it so we need to change it > see > routers > users
        userSchema.pre('save', async function(next){
            const user = this

            // Looking for modified password this is a build in mongoose feature
            if(user.isModified('password')){    
                user.password = await bcrypt.hash(user.password, 8)
            }

            next()
        })

        // Deletes user tasks when user is removed
        userSchema.pre('remove', async function(next){
            const user = this
            await Tasks.deleteMany({ owner: user._id })
            next()
        })
        ```
*   **Async/Await:** The code below is the replacement for the promise chaining. See the commented out code and the replacement code with async await.
    ```js
    app
    .use(express.json()) // use this to parse incoming data to an Object
    .get('/users', async (req,res)=>{
        // User
        //     .find({})
        //     .then(users=>{
        //         res.send(users)
        //     })
        //     .catch(err=>{
        //         res.status(500).send(err)
        //     })
        try{
            const users = await User.find({})
            res.send(users)
        }
        catch(e){
            res.status(500).send(e)
        }
    })
    ```