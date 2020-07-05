//Install express server
const express = require('express');
const app = express();

const path = require('path');
 const PORT=process.env.PORT || 5000;
 var app_path='../dist/newProject';


 //testing
// Serve only the static files form the angularapp directory
app.use(express.static(path.join(__dirname,app_path)))

app.get('*', function(req,res) {
 
    res.sendFile(path.join(__dirname,app_path,+'index.html'))
    })

.listen(PORT,()=>console.log(PORT));
 
// app.get('/*', function(req,res) {
 
// res.sendFile(path.join(__dirname+'/angularapp/index.html'));
// });
 
// // Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);