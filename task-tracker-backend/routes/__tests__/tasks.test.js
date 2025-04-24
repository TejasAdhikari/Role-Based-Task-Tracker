import request from 'supertest';
import app from '../../server.js';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

const SECRET_KEY = 'secret-key';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tasksPath = join(__dirname, '../../data/tasks.json');

// Create mock users and tokens
const submitter = { id: '1', name: 'Test Submitter', role: 'submitter' };
const approver = { id: '2', name: 'Test Approver', role: 'approver' };

const submitterToken = sign(submitter, SECRET_KEY);
const approverToken = sign(approver, SECRET_KEY);

describe('Task API RBAC Tests', () => {
  let server;
  // Start the server before all tests
  beforeAll(() => {
    server = app.listen(5001); 
  });

  // Reset tasks before each test
  beforeEach(() => {
    const initialTasks = [
      {
        id: 'test-task-1',
        title: 'Test Task 1',
        description: 'Test description',
        status: 'pending',
        createdAt: new Date().toISOString(),
        createdBy: submitter.id
      }
    ];
    
    writeFileSync(tasksPath, JSON.stringify(initialTasks, null, 2));
  });

  // Test: submitter cannot approve tasks
  test('Submitter cannot change task status to approved', async () => {
    const res = await request(app)
      .put('/api/tasks/test-task-1')
      .set('x-auth-token', submitterToken)
      .send({ status: 'approved' });
    
    expect(res.statusCode).toBe(403);
  });

  // Test: approver cannot edit task content
  test('Approver cannot edit task title or description', async () => {
    const res = await request(app)
      .put('/api/tasks/test-task-1')
      .set('x-auth-token', approverToken)
      .send({ title: 'Updated Title' });
    
    expect(res.statusCode).toBe(403);
  });

  // Test: submitter can edit their own task
  test('Submitter can edit their own task', async () => {
    const res = await request(app)
      .put('/api/tasks/test-task-1')
      .set('x-auth-token', submitterToken)
      .send({ title: 'Updated Title', description: 'Updated description' });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Title');
    expect(res.body.description).toBe('Updated description');
  });

  // Test: approver can approve a pending task
  test('Approver can change task status from pending to approved', async () => {
    const res = await request(app)
      .put('/api/tasks/test-task-1')
      .set('x-auth-token', approverToken)
      .send({ status: 'approved' });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('approved');
  });

  // Close the app after all tests
  afterAll(done => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });
});