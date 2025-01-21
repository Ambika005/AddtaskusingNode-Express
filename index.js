const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.get('/',function(req,res){
    fs.readdir(`./files`,(err,files)=>{
        res.render("Render.ejs",{files:files})
    })   
})
app.get('/file/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function(err,filedata){
       res.render("show.ejs",{filename:req.params.filename,filedata: filedata})
    })
})

app.get("/edit/:filename",function(req,res){
    res.render("edit.ejs",{filename:req.params.filename})

})
// app.post("/edit",function(req,res){
//     fs.rename('files/heelo.txt','files/edited.txt',function(err){
//           console.log(err);
//           res.redirect("/")
//     })
// })

app.post("/edit",function(req,res){
    console.log(req.body)
    fs.rename(`./files/${req.body.oldfilename}`,`./files/${req.body.newfilename}`,function(err){
       if(err){
        console.log(err)
       } 
       else{
        res.redirect("/")
       }
    })
    
})
app.post('/create',function(req,res){
     fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
    if (err){
        console.log(err)
    }
    else{  
        res.redirect("/")
        console.log(req.body)
    }
  })
})

app.listen(3000);