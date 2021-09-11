const router = require('express').Router();
const { User }= require('../models');

router.get('/', async (req, res)=> {
    const userData = await User.findAll();
    console.log(userData)

    const users = userData.map((user) =>
    user.get({ plain: true})
    );
    console.log(users);
    res.render('homepage', {users});
});

module.exports = router;