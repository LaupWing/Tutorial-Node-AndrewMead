const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const userOneId = new mongoose.Types.ObjectId() // we need to reference this outside the user because we are going to use this in multiple places
const userOne = {
    _id: userOneId,
    name: 'Test',
    email: 'test@example.com',
    password: 'test123',
    tokens: [{
        token: jwt.sign({_id:userOneId}, process.env.JWT_SECRET)
    }]
}

beforeEach(async ()=>{
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async()=>{
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Jest',
            email: 'Jest@hotmail.com',
            password: 'MypassJEst123'
        })
        .expect(201)
    
    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    // console.log('------------------------------------------------------',user)
    expect(user).not.toBeNull()

    // Assertions about the response
    console.log('-------------------------------------',response.body)
    expect(response.body).toMatchObject({
        user:{
            name: 'Jest',
            email: 'jest@hotmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('MypassJEst123')
})

test('Should login existing user', async()=>{
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})
test('Should not login non existing user', async()=>{
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email +"fail",
            password: userOne.password
        }).expect(400)
})

test('Should get user profile for user', async()=>{
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile unauth user', async()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should delete user profile for user', async()=>{
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete profile unauth user', async()=>{
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

