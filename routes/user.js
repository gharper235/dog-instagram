const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/userCtrl');

router.post('/create', UserCtrl.createUser);
router.put('/update', UserCtrl.updateUser);
router.delete('/delete', UserCtrl.deleteUser);

// show user
// router.get( '/:userId', ctrls.user.show );

module.exports = router;
