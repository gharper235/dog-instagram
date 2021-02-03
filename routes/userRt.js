const express = require('express');
const router = express.Router();

//TODO need to get this to point to index.js instead
const UserCtrl = require('../controllers/userCtrl');

router.post('/user/create', (UserCtrl.createUser));
router.post('/user/update', (UserCtrl.updateUser));
router.delete('/user/delete', (UserCtrl.deleteUser));

// show user
// router.get( '/:userId', ctrls.user.show );

module.exports = router;
