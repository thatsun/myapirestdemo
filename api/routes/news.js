const express= require('express');
const router = express.Router();
const checkAuth=require('../middleware/check-auth');
const NewsController=require('../controllers/news_controller');
//pendiente extirpar logica de almacenamiento





router.get('/',checkAuth,NewsController.news_get_all);

router.post("/",checkAuth,NewsController.news_add_post);

router.get('/:postId',checkAuth,DogsController.news_get_post);

router.patch('/:postId',checkAuth,DogsController.news_edit_post);

router.delete('/:postId',checkAuth,DogsController.news_delete_post);
module.exports = router;