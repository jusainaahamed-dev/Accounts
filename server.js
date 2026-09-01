const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const api= require('./api/register');
const app=express();
const port=5001;
app.use(cors());
app.use(bodyparser.json());
app.use('/api', api);
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
    console.log("The Port  is running in "+port);
})