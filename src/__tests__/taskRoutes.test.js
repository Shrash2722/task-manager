const request = require('supertest');
const app = require('../app');

describe('POST /tasks',(){
    it('Should create new task and return 201',async () =>{
        const res = await request(app)
        .post('/tasks')
        .send({
            title: 'Test Task',
            description: 'This is a test'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe('Test Task');
        expect(res.body.description).toBe('This is a test');
    });

    it('Should return 400 if title or description is missing',async () => {
        const res = await request(app)
        .post('/tasks')
        .send({
            title: 'Missing Description'
        });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});