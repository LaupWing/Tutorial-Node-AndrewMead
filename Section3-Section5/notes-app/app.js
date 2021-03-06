// const notes = require('./notes')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe:'Add a new note',
    builder:{
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title, argv.body)
    }
})


// Create remove command
yargs.command({
    command: 'remove',
    describe:'remove a new note',
    builder:{
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe:'list a new note',
    handler(argv){
        notes.listNotes()
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe:'read a new note',
    builder:{
        title:{
            discribe: 'Title to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

// Add, remove, read, list Notes
yargs.parse()