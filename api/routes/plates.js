const express= require('express');
const router = express.Router();


const plateController=require('../controllers/ressetplates_controller');



router.post('/resetplates',plateController.resetPlates);

router.post('/getplatedata',plateController.get_platedata);



module.exports = router;