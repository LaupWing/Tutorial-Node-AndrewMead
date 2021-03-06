# Weather App
## What have i learned from this tutorial?
### Callbacks
*   A handy way to use callbacks. I didnt knew you could define your parameters in the callback functions. Before i thought you would get a `error` or `data` variable not defined error
    ```js
    const callbackExample = async (callback)=>{
        const url = 'example.com'
        const data = await fetch(url)
        if(!data){
            calback('Unable to connect', undefined)
        }else if(data.length === 0){
            callback('Data not found', undefined)
        }else{
            callback(undefined, data)
        }
    }

    callbackExample((error,data)=>{
        console.log(error)
        console.log(data)
    })
    ```

### Destructering 
*   You can rename destructered properties by 
    ```js
    // Normal destructering with assigned properties as variables
    const person = {
        name: 'Laup',
        age: 24,
        gender: 'male'
    }
    const {name, age, gender} = person
    ```
    ```js
    // Rename destructerd object
    const person = {
        name: 'Laup',
        age: 24,
        gender: 'male'
    }
    const {name: personName, age, gender} = person // now the value of name can be asccet by using the personName variable
    ```
*   **Destructering with a default value**: if propertie isnt declared in the object it will show as `undefined` or you can set a default value when a propertie isnt available. If a property is available and it has a value it will you use that value.
    ```js
    // property is not declared so it will use the default value
    const person = {
        name: 'Laup',
        age: 24,
        gender: 'male'
    }
    const {name, age, gender, height = 100} = person
    console.log(height) // this log 100
    ```
    ```js
    const person = {
        name: 'Laup',
        age: 24,
        gender: 'male',
        height: 120
    }
    const {name, age, gender, height = 100} = person
    console.log(height) // this will log 120 because height already exist in the object person 
    ```
*   You can destructer in the function parameter braces
    ```js
    const person = {
        name: 'Laup',
        age: 24,
        gender: 'male'
    }
    const destructerFunction = ({name, age, gender})=>{ // ofcourse you can also make a default value for the destructer version of this
        console.log(name, age, gender) // this will log the destructerd person
    }
    destructerFunction(person) // call the function with the object you want to destructure
    ```
*   **Error Preventing when no object has been assigned:** When you dont define an object into the function about it will try to destructre a undefined object. To fixs this we will need to set a default value for the destructered parameter in the above function like so
    ```js
    const destructerFunction = ({name, age, gender})=>{
        console.log(name, age, gender) 
    }
    destructerFunction() // will set an error of name of undefined
    ```
    ```js
    const destructerFunction = ({name, age, gender}={})=>{ // by adding a default object it can run the function
        console.log(name, age, gender) // this will be undefined because it doesnt exist but the function can still run because we set a default value of an empty objectz
    }
    destructerFunction() // will set an error of name of undefined
    ```

### Dirname Filename and path
*   To see what the path is of the directory use `__dirname`
*   To see what the path is of the current file use  `__filename`
*   To make a custom path string use the `path` module (which is a core module of node)
    ```js
    path.join(__dirname, '../') // from the current directory make a path which is one layer above the current directory
    ```

### Express
*   To use a specifik directery as static directory in express you need to use this code
    ```js
    app.use(express.static(path)) // specifiy your path in the place of path
    ```
*   `app.set('view engine', 'hbs')`: to set the settings of the express app, first parameter is the what do you want to set and second is the value u want it to set to
*   **Pathing**
    *   **Absolute path:** If you have specified your static directory in your express server you can reference to documents by using the path relative from this static directory by beginning with the `/`
        ```
        /css/style
        ```
    *   **Relative path:** Relative path is the path relative to the current file you are trying to reference to another file

### Handlebars

### Nodemon
*   You can set a watcher on nodemon to watch these file extensions. If you save on hbs for exameple and you didnt set a watcher it will not reload when you save hbs file. In order to do this you need to set it in the bash command. The command is as follows
    ```bash
    nodemon src/app.js -e js,hbj
    ```