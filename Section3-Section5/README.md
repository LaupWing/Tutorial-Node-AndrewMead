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