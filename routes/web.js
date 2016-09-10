'use strict';
const router=require('express').Router();
const controller=require('../controllers/web');

router.get('/',(req,res)=>{
    res.render('index');
});
router.get('/add',(req,res)=>{
    res.render('add');
});
router.post('/add',controller.add.add);
router.post('/begin',controller.add.begin);

module.exports=router;
