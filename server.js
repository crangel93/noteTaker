const express = require('express');
const  fs  = require('fs');
const path=require('path');
// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;
const notes=require('./db/db.json');

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//serves index.html
app.get('/',(req,res)=>{
res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get('/notes',(req,res)=>{
    res.sendFile(path.join(__dirname, "./public/notes.html"));
 });

 app.get('/api/notes',(req,res)=>{
    res.json(notes);


 });

 app.post('/api/notes',(req,res)=>{
    req.body.id=Math.floor(Math.random()*10000);
    notes.push(req.body);
    fs.writeFileSync('./db/db.json',JSON.stringify(notes)); 
    
    
    res.json(notes);
 });



// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));