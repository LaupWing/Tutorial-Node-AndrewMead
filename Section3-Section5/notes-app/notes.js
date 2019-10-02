const fs = require('fs')
const logs = require('./chalkLogs.js')
console.log(logs)

const getNotes = ()=>{
    return 'Your Notes...'
}

const addNote = (title, body)=>{
    const notes = loadNotes()
    const duplicateNotes = notes.filter(note=>note.title === title)
    if(duplicateNotes.length === 0){
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

module.exports = {getNotes, addNote, removeNote}