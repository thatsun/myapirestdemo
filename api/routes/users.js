const express= require('express');
const router = express.Router();


const UserController=require('../controllers/user_controller');

const CheckAuth=require('../middleware/check-auth');


router.post('/singup',UserController.user_singup);

router.post('/login',UserController.user_login);

router.delete('/:userId',CheckAuth, UserController.user_delete);

module.exports = router;