const notes = require('./notes')
const yargs = require('yargs')


// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe:'Add a new note',
    builder:{
        title: {
            describe: 'Note Title',
            demandOption: true
        }
    },
    handler: function(argv){
        console.log('Adding a new note', argv)
    }
})


// Create remove command
yargs.command({
    command: 'remove',
    describe:'remove a new note',
    builder:{
        title: {
            describe: 'Note Title'
        }
    },
    handler: function(){
        console.log('remove a note')
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe:'list a new note',
    handler: function(){
        console.log('list a note')
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe:'read a new note',
    handler: function(){
        console.log('read a note')
    }
})

// Add, remove, read, list Notes


console.log(yargs.argv)