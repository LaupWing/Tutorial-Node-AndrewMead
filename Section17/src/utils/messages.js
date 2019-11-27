const messageObject = (username,value) => {
    return {
        username,
        text: value,
        createdAt: new Date().getTime()
    }
}

const locationObject = (username, url)=>{
    return{
        username,
        url,
        createdAt: new Date().getTime()
    }
}

module.exports ={
    messageObject,
    locationObject
}