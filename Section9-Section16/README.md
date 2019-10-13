### MongoDB
*   **mongodb** module
    In node you have a mode module made and maintained by the mongodb developers. It makes it easier to connect your node application to your mongodb database.
    *   When you `require` the package you got the a object back from the package. In order to connect to your mongodb database you need to activate the mongodb client by calling the following property `mongodb.MongoClient`.
        *   The `MongoClient` methods needs 2 parameters: The connectionUrl which is the url of your mongodb server (localhost and the port) and a databaseName. When de database name is not available in the database mongo will make it for you.