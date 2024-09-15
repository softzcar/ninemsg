const express = require('express');
// const serverless = require('serverless-http');
const app = express();
const router = express.Router();

const authController = require('../controllers/authController');
const whatsappController = require('../controllers/whatsappController');
// const authenticateToken = require('../middleware/authenticateToken');

router.get('/', (req, res) => {
    const loginUrl = '/login'
    res.json({ name: 'NTMSG API', version: '1.0.0', login: loginUrl });
});

router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './public' });
});

router.get('/send', (req, res) => {
    res.sendFile('send.html', { root: './public' });
});

router.post('/login', authController.verifyCredentials);

router.get('/qr', whatsappController.showQRCode);
// router.get('/qr', authenticateToken, authController.verifyCredentials);

// Ruta para enviar un mensaje
router.post('/send-message', whatsappController.sendMessage);

// app.use('/.netlify/functions/api', router);
// app.use('/.netlify/routes/index', router);
// module.exports.handler = serverless(app);
module.exports = router;

