const fs = require('fs')
// const book = {
//     title: 'ego is the enemy',
//     author: 'ryan holiday'
// }

// const bookJSON = JSON.stringify(book)
// fs.writeFileSync('1-json.json', bookJSON)
const data = JSON.parse(fs.readFileSync('1-json.json').toString())
data.name = 'Loc Nguyen'
data.age = 24
fs.writeFileSync('1-json.json', JSON.stringify(data))
