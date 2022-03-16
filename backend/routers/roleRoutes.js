import express from 'express';
import roles from '../controllers/roleController.js';



const router = express.Router();


router.post('/registerRole', roles.registerRole)

router.get('/listRole', roles.listRole);

router.put('/delete/:_id', roles.deleteRole);

router.put('/updateRole', roles.updateRole)

export default router;

