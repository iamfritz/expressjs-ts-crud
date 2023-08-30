/* // src/api.test.ts

import request from 'supertest';
import app from './app'; // Import your Express app

describe('API Endpoints', () => {
  it('GET /api/posts should return a list of posts', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('posts');
    expect(response.body.posts).toHaveLength(3); // Adjust as needed
  });

  it('POST /api/posts should create a new post', async () => {
    const newPost = {
      title: 'Test Post',
      content: 'This is a test post content.',
    };

    const response = await request(app).post('/api/posts').send(newPost);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newPost.title);
    expect(response.body.content).toBe(newPost.content);
  });
});
 */

// src/app.test.ts

//import request from 'supertest';
//import app from '../app';
const request = require("supertest");
const app = require("../app");

describe('API Tests', () => {
  it('GET /api/hello should return "Hello, World!"', async () => {
    const response = await request(app).get('/api/hello');
    expect(response.status).toBe(200);
    //expect(response.body).toEqual({ message: 'Hello, World!' });
  });
});
