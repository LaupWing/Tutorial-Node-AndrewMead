const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

sgMail.send({
    to: 'locdragon@gmail.com',
    from: 'loc_strict@hotmail.com',
    subject: 'This is my first creation!',
    text: 'Email content'
})

const sendWelcomeEmail = (email, name)=>{
    console.log('Sending Welcome')
    sgMail.send({
        to: email,
        from: 'loc_strict@hotmail.com',
        subject: 'Welcome to the app',
        text:`Have fun fellow human ${name}`
    })
}

const sendCancelEmail = (email, name)=>{
    console.log('Sending Cancel')
    sgMail.send({
        to: email,
        from: 'loc_strict@hotmail.com',
        subject: 'Hoped you liked the service',
        text:`I wish you the best huma named: ${name}`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}