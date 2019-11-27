const users = []

const addUser =({id, username ,room})=>{
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if(!username || !room){
        return {
            error:  'Username and room are required'
        }
    }
    
    const existingUser = users.find(user=>{
        return user.room === room && user.username===username
    })
    if(existingUser){
        return{
            error: 'User already exists in this room'
        }
    }
    const user = {username,room,id}
    users.push(user)
    return {user}
}

const removeUser = (id)=>{
    const index = users.findIndex(user=>user.id === id)
    if(index!==-1){
        return users.splice(index, 1)[0]
    }
}

const getUser =(id)=>{
    return users.find(user=>user.id===id)
}

const getUsersInRoom = (roomName)=>{
    return users.filter(user=>user.room === roomName)
}

module.exports ={
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}