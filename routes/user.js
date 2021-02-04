const express = require('express');
const router = express.Router();

const {user} = require('../controllers');

router.post('/create', user.createUser);
router.put('/update', user.updateUser);
router.delete('/delete', user.deleteUser);

// show user
// router.get( '/:userId', ctrls.user.show );

module.exports = router;
