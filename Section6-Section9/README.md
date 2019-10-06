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