const request = require('supertest');
const app = require('../app');

describe('task routes',() => {
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

    it('Should fetch all task',async() => {
        const res = await request(app)
        .get('/tasks');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('Should Fetch a task by ID', async () =>{
        const create = await request(app)
        .post('/tasks')
        .send({title:'Get Task',description:'Fetch'});
        
        const res = await request(app)
        .get(`/tasks/${create.body.id}`);
        expect(res.statusCode).toBe(200);
    });

    it('Should Delete a task by ID', async () => {
        const create = await request(app)
        .post('/tasks')
        .send({title:'To Delete',description:'Delete'});

        const del = await request(app).delete(`/tasks/${create.body.id}`);
        expect(del.statusCode).toBe(200);
    });

    
});