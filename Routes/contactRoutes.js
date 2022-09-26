const express=require('express')
const router=express.Router()
const mongoose = require('mongoose');


const contact = require("../Models/contactShema")

// add contact @post
//Create and Save a Record of a Model 

router.post('/newContact',(req,res)=>{
    let newContact=new contact(req.body)
        newContact.save((err,data)=>{
            err? console.log('err'):res.send('contact was added')
        })
})
//3.Create Many Records with model.create()

  var CreateManyPeople=function(arrayOfPeople,done) {
    contact.Create (arrayOfPeople,(err,data)=>err? console.log(err) : done (null,data));
    
};
router.post('/add/manycontact', (req,res)=>{
    CreateManyPeople (req.body,(err,data)=>{
        err? console.log(err) : res.send('manycontact was created')
    } )
})

//4.Use model.find() to Search Your Database 
router.get('/:Name',(req,res)=> {
    contact.find({Name:req.params.Name},(err,data)=> { 
        err ?  console.log(err) : res.json(data)
    })
})

//5.Use model.findOne() to Find just one person (argument food as a search key.) 
router.get('/getfavorite/:favoritefoods',(req,res)=> {
    console.log('get favorite')
    contact.findOne({favoritefoods: {$elemMatch:{$eq:req.params.favoritefoods}} },(err,data)=> { 
        err ?  console.log(err) : res.json(data)
    })
}) 

//6.Use model.findById()
router.get('/getid/:id' , (req,res)=>{
    contact.findById({_id:req.params.id},(err,data)=>{
        err? console.log(err) : res.json(data)
    })
})

//7.Perform Classic Updates by Running Find, Edit, then Save
router.put('/:id',async (req,res)=>{
    
    try{
        var foodToAdd = 'hamburger';
        const data=await contact.findById(req.params.id)
        data.favoritefoods=[...data.favoritefoods,foodToAdd]
        const result= await  data.save()
        res.status(200).json(result)
        }
        catch(err){
            res.status(400).json({error:err})
        }
})
//8.Perform New Updates on a Document Using model.findOneAndUpdate()

router.put('/update/:name',(req,res)=> {

    var ageToSet = 20;
    contact.findOneAndUpdate({Name:req.params.Name},{$set: {"age":ageToSet}},{returnNewDocument : true}, function(err, doc){
    if(err){return console.log("Something wrong when updating record!");}
    res.json(doc);                  
    })
})  

//9.Delete One Document Using model.findByIdAndRemove

router.delete('/:id' , (req,res) =>{
    contact.findByIdAndDelete({_id:req.params.id},(err,data)=> {
        err? console.log(err) : res.send('contact was deleted ')
    })
})
// 10.Delete Many Documents with model.remove

router.delete('/removeNames/:name',(req,res)=> {
    contact.remove({Name:req.params.Name},(err,data)=> { 
        err ?  console.log(err) : res.send('all contact named mary were deleted')
    })   
})
//11.Chain Search Query Helpers to Narrow Search Results

    router.get('/',(req,res)=> {
    var foodToSearch = "pizza";
    contact.find({favoritefoods:{$elemMatch:{$eq:foodToSearch }}})
    .sort({Name : "desc"})
    .limit(2)
    .select("-age")
    .exec((err, data) => {
        if(err)
        return  console.log(err);
    res.json(data)
    })
})

module.exports=router