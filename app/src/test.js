const { expect } = require('chai');
const request = require('supertest');
const app = require('./app'); // Replace with the actual path to your Express app file

describe('HTML to JSON Converter', () => {
    it('should return a processed JSON object when submitting valid HTML', (done) => {
        const validHtml = '<div>Hello, world!</div>';
        request(app)
            .post('/process')
            .send({ data: validHtml })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                // Add more assertions based on the expected JSON structure
                done();
            });
    });

    it('should return an error when submitting invalid HTML', (done) => {
        const invalidHtml = '<div><p>Unclosed tag';
        request(app)
            .post('/process')
            .send({ data: invalidHtml })
            .expect(500)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.text).to.include('Error');
                done();
            });
    });
});

// Add more test cases as needed
