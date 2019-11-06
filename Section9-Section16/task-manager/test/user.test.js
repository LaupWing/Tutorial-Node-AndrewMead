const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const userOne = {
    name: 'Test',
    email: 'test@example.com',
    password: 'test123'
}

beforeEach(async ()=>{
    await User.deleteMany()
    await new User(userOne).save()
})

test('Should signup a new user', async()=>{
    await request(app)
        .post('/users')
        .send({
            name: 'Jest',
            email: 'Jest@hotmail.com',
            password: 'MypassJEst123'
        })
        .expect(201)
})

test('Should login existing user', async()=>{
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})
test('Should not login non existing user', async()=>{
    await request(app).post('/users/login').send({
        email: userOne.email +"fail",
        password: userOne.password
    }).expect(400)
})