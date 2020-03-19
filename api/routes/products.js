const express= require('express');
const router = express.Router();
const multer=require('multer');
const checkAuth=require('../middleware/check-auth');
const ProductController=require('../controllers/products_controller');
//pendiente extirpar logica de almacenamiento
const storage= multer.diskStorage({
    destination: function(req,file,cb){

        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null, Date.now()+ file.originalname);

    }
});

const filefilter = (req,file,cb)=>{
    if(file.mimetype=== 'image/jpeg' || file.mimetype==='image/png'){
        cb(null,true);
    }
    else{
        cb(null,false);
    }
};
const upload=multer({storage: storage, 
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: filefilter
});


router.get('/',ProductController.products_get_all);

router.post("/",checkAuth,upload.single('productImage'),ProductController.products_crate_product);

router.get('/:productId',ProductController.products_get_product);

router.patch('/:productId',checkAuth,ProductController.products_edit_product);

router.delete('/:productId',checkAuth,ProductController.products_delete_product);
module.exports = router;