import Authentication from '../controllers/authentication'
import Middlewares from './middlewares'
import api from './api'

const router = require('express').Router()

router.use('/api', Middlewares.loginRequired, api)
router.post('/signup', Authentication.signup)
router.post('/signin', Authentication.signin)
router.get('/ping', (req, res) => res.send('pong'))
router.get('/', (req, res) => res.json({ 'source': 'https://www.google.com' }))
router.post('/upload',Middlewares.loginRequired, Authentication.upload)
router.get('/allUsers',Middlewares.loginRequired, Authentication.allUsers)
router.post('updateUserProfile/:id', Middlewares.loginRequired, Authentication.updateUserProfile)

export default router;