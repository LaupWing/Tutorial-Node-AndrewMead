const add =  (a,b)=>{
    return new Promise((resolev, reject)=>{
        setTimeout(()=>{
            resolev(a+b)
        }, 2000)
    })
}

add(1,2)
    .then(sum=>{
        console.log(sum)
        add(sum, 5)
            .then(sum2=>{
                console.log(sum2)
            })
            .catch(err=>{
                console.log(err)
            })
    })
    .catch(err=>{
        console.log(err)
    })

// This is the same as above
add(1,2)
    .then(sum =>{
        return add(sum, 2)
    })
    .then(sum2=>{
        console.log(sum2)
    })
    .catch(e=>{
        console.log(e)
    })