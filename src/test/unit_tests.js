let chai = require('chai');
let chaiHTTP = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHTTP);

const uid = 'mateusTeste123';
const email = 'mateusTeste123@gmail.com';

describe("Funcionalidades do Server", () => {
  //  this.timeout(30000);

    describe('métodos GET/POST', () => {
        it('POST /registrarUsuario', (done) => {
            chai.request(server).post('/registrarUsuario?uid=' + uid + '&email=' + email).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
        it('POST /depositarQuentinha', (done) => {
            chai.request(server).post('/depositarQuentinha?uid=' + uid).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
        it('POST /depositarQuentinha', (done) => {
            chai.request(server).post('/depositarQuentinha?uid=' + uid).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
        it('POST /depositarQuentinha', (done) => {
            chai.request(server).post('/depositarQuentinha?uid=' + uid).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
        it('POST /confirmarQuentinha', (done) => {
            chai.request(server).post('/confirmarQuentinha?uid=' + uid).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
        it('GET /totalQuentinhas', (done) => {
            chai.request(server).get('/totalQuentinhas?uid=' + uid).end((err, res) => {
                res.should.have.status(200);
                console.log('#Quentinhas=', res.body['ans']);
                done();
            });
        });
        it('GET /ultimaQuentinha', (done) => {
            chai.request(server).get('/ultimaQuentinha?uid=' + uid).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
        it('POST /coletarRecompensa', (done) => {
            chai.request(server).post('/coletarRecompensa?uid=' + uid).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
        it('GET /totalQuentinhas', (done) => {
            chai.request(server).get('/totalQuentinhas?uid=' + uid).end((err, res) => {
                res.should.have.status(200);
                console.log('#Quentinhas=', res.body['ans']);
                done();
            });
        });
        it('POST /deletarUsuario', (done) => {
            chai.request(server).post('/deletarUsuario?uid=' + uid).end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });
});