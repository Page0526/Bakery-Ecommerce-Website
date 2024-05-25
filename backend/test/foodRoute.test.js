import { expect } from 'chai';
import express from 'express';
import request from 'supertest';
import foodRouter from '../routes/foodRoute.js';
import * as foodController from '../controllers/foodController.js';
import sinon from 'sinon';

describe('Food Router', () => {
    const app = express();
    app.use(express.json());
    app.use('/', foodRouter);

    describe('GET /get', () => {
        it('should call getFoodByName controller function', async () => {
            const getFoodByNameSpy = sinon.spy(foodController, 'getFoodByName');

            await request(app).get('/get');

            expect(getFoodByNameSpy.calledOnce).to.be.true;

            getFoodByNameSpy.restore();
        });
    });

    describe('GET /search', () => {
        it('should call searchFood controller function', async () => {
            const searchFoodSpy = sinon.spy(foodController, 'searchFood');

            await request(app).get('/search');

            expect(searchFoodSpy.calledOnce).to.be.true;

            searchFoodSpy.restore();
        });
    });

    describe('POST /add', () => {
        it('should call addFood controller function', async () => {
            const addFoodSpy = sinon.spy(foodController, 'addFood');

            await request(app).post('/add');

            expect(addFoodSpy.calledOnce).to.be.true;

            addFoodSpy.restore();
        });
    });

    // Add more tests for other routes and scenarios as needed
});
