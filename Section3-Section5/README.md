# Notes App
## What have i learned from this tutorial?

### Require Other Files
*   Required file has to be relative to the file you are calling it
    ```js
        require('./utils) //This has to be relative to the path of the file your requiring it
    ```
    *   If you require a file, that file will run its functions that has started within the required file.
*   Every file in node has his own scope so you cant use variables from other files you required
    *   Unless you export is with
        ```js
            module.exports = exampleVar
        ```

### JSON
*   In JSON files you need parantheses around propertynames
    "name" : "Loc Nguyen"

### Input from command line arguments
*   You can give the node app data by running the code in your terminal `node app.js` and adding the data aftwards like `node app.js LaupWing`
    *   How to acces it? To access this variable you need to run this code `console.log(process.argv)`. The output will be as follows
    	```
        [ 'C:\\Program Files\\nodejs\\node.exe',
        'C:\\Users\\locdr\\Desktop\\Current Projects\\Tutorials\\Udemy\\Andrew Mead\\node-tutorial\\Section3-Section5\\notes-app\\app',
        'LaupWing' ]
        ```
        *   The first item in the array is the path to the node.js executable
        *   The second is second to the path app.js file (where you put the console.log)
        *   The third is the value that you put in the console.log
    *   String Parsing (Yargs)
        *   With the Yargs package you can print out formatted strings in your console.log by `console.log(yargs.argv)` it will format the data you put behind your node statement
        *   You can customize your Yargs to fit your needs. By default yargs begins with version 1.0.0.. You can check this version by typing in --version behind your node command like `node app.js --version`
            *   YargsCommand: In order to customize yargs you need to set yargs command settings. The command is the name of the command, describe is a describtion and handler is the code that will be executed when starting the yarg command. To start this yarg command just simply run the bash command like this `node app.js add`
                ```js
                yargs.command({
                    command: 'add',
                    describe:'Add a new note',
                    handler: function(){
                        console.log('Adding a new note')
                    }
                })
                ```
                *   YargsArguments: You can add arguments in the yarg command by adding a builder property in the object with the argument property name you want to use. These property name are objects which you can define a describiption `describe` of the property and a required option which is called `demandOption` and you can define the type of data with `type`
                    ```js
                    yargs.command({
                        command: 'add',
                        describe:'Add a new note',
                        builder:{
                            title: {
                                describe: 'Note Title',
                                demandOption: true,
                                type: 'string'
                            }
                        },
                        handler: function(argv){
                            console.log('Adding a new note', argv)
                        }
                    })
                    ```
### JSON
*   **JSON.stringify**: If you want to convert your JSON data to a string you need to use JSON.stringify. Example = `JSON.stringify(data)` See below how the data changes. The reason why you want to make a string of the JSON data is that some of the packages can only read string data like the fs package.
    ```js
    // Before
    const book = {
        title: 'Catcher in the rye',
        author: 'LaupWing'
    }
    ```
    ```js
    // after
    const book = {
        'title': 'Catcher in the rye',
        'author' : 'LaupWing'
    }
    ```
*   **JSON.parse**: The reverse of the JSON.stringify is the JSON.parse. It will make a object from a string. See above but in reverse
    