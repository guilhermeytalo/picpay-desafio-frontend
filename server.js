const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()

const router = jsonServer.router('./db.json')

const userdb = {
    users: [{
        "id": 0,
        "name": "usuario",
        "email": "usuario@gmail.com",
        "password": "usuario"
    }]
};

server.use(jsonServer.defaults());

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

const SECRET_KEY = '!@#$%^&*()'
const expiresIn = '1h'

function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn })
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ? decode : err)
}

function isAuthenticated({ email, password }) {
    return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}

server.post('/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!isAuthenticated({ email, password })) {
        const status = 401;
        res.status(401).json({ status, message: 'Incorrect email or password' })
        return
    }

    res.status(200).json({
        access_token: createToken({ email, password })
    });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
    console.log(req.headers.authorization);
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401;
        res.status(status).json({ status, message: 'Bad authorization header' })
        return
    }

    try {
        verifyToken(req.headers.authorization.split(' ')[1])
        next()
    } catch (err) {
        res.status(status).json({ status: 401, message: 'Error: access_token is not valid' })
    }
});

server.use(router)

server.listen(3000, () => {
    console.log('Run Auth API Server')
})

server.use('/api', router);
