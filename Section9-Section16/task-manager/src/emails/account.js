const sgMail = require('@sendgrid/mail')
const sendGridAPIKey = ''

sgMail.setApiKey(sendGridAPIKey)

sgMail.send({
    to: 'locdragon@gmail.com',
    from: 'loc_strict@hotmail.com',
    subject: 'This is my first creation!',
    text: 'Email content'
})
