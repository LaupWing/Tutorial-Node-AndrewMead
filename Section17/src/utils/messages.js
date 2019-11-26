const messageObject = (value) => {
    return {
        text: value,
        createdAt: new Date().getTime()
    }
}

const locationObject = (url)=>{
    return{
        url,
        createdAt: new Date().getTime()
    }
}

module.exports ={
    messageObject,
    locationObject
}