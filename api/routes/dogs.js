const express= require('express');
const router = express.Router();
const multer=require('multer');
const checkAuth=require('../middleware/check-auth');
const DogsController=require('../controllers/dogs_controller');
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


router.get('/',DogsController.dogs_get_all);

router.post("/",checkAuth,upload.single('dogImage'),DogsController.dogs_add_dog);

router.get('/:dogId',DogsController.dogs_get_dog);

router.patch('/:dogId',checkAuth,DogsController.dogs_edit_dog);

router.delete('/:dogId',checkAuth,DogsController.dogs_delete_dog);
module.exports = router;