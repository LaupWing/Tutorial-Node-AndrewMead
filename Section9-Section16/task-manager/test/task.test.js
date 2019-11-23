const request = require('supertest')
const Task = require('../src/models/task')
const app = require('../src/app')
const {
    setupDatabase, 
    userOne,
    userOneId, 
    userTwo,
    userTwoId, 
    taskOne
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for the user',async ()=>{
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('Get correct tasks of this user', async ()=>{
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    expect(response.body.length).toBe(2)
    console.log('---------------------------tasks--------------------------')
    console.log(response.body)
})

test('Should fail when user two deletes task of usertwo', async ()=>{
    await request(app)
        .delete(`/task/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
    
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})