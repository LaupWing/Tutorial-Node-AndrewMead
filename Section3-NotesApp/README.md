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