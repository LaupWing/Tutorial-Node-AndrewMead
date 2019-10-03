const fs = require('fs')
const logs = require('./chalkLogs.js')
console.log(logs)

const getNotes = ()=>{
    return 'Your Notes...'
}

const addNote = (title, body)=>{
    const notes = loadNotes()
    const duplicateNote = notes.find(note=>note.title === title)
    if(!duplicateNote){
        notes.push({
            title,
            body
        })
        console.log(logs.succes('Note has ben added'))
        saveNotes(notes)
    }else{
        console.log(logs.fail('Note has ben taken'))
    }
}

const removeNote = (title)=>{
    const notes = loadNotes()
    const deletedNote = notes.filter(note=>note.title===title)
    if(deleteNote.length !== notes.length){
        saveNotes(deletedNote)
        console.log(logs.fail('Note deleted!!'))
    }else{
        console.log(logs.fail('Note title not found'))

    }
}


const readNote = (title) =>{
    const notes = loadNotes()
    const findNote = notes.find(note=>note.title === title)
    if(findNote){
        console.log(`${logs.succes('Title '+findNote.title)} Body: ${findNote.body}`)
    }else{
        console.log(`${logs.fail('None Found')}`)
    }
}

const listNotes = () =>{
    const notes = loadNotes()
    console.log(logs.succes('Your notes'))
    notes.forEach(note=>{
        console.log(`Title: ${logs.succes(note.title)}`)
    })
}


const loadNotes = ()=>{
    try{
        return JSON.parse(fs.readFileSync('notes.json').toString())
    }catch(e){
        return []
    }
}

const saveNotes = (notes)=>{
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

module.exports = {getNotes, addNote, removeNote, listNotes, readNote}