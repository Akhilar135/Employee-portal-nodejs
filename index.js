const express = require('express')

const jwt = require('jsonwebtoken')

const app = express()
const manager={
id:2,
name:"Akhila",
gpin:"10113"

}

const emp={

id:1,
name:"Arjun",
gpin:"10342",
leave:"available",
lApplied:false,
lApproved:true

}

app.listen(5003, ()=>{console.log('server started')})

app.post('/login/emp',(req,res)=>{
jwt.sign({emp},'secretkey',(err,token)=>{
res.json({
token
})
 })


})
app.post('/login/admin',(req,res)=>{
jwt.sign({manager},'secretkey',(err,token)=>{
res.json({
token
})
})



})

app.get('/getLeave', verifyToken,(req,res)=>{
jwt.verify(req.token, 'secretkey', (err,data)=>{
if(err){
res.sendStatus(403)
}else{
res.json({
data: data.emp.leave

        })

}

})


})

//Apply Leave

app.post ('/applyLeave', (req,res)=>{
jwt.verify(req.token, 'secretkey', (err,data)=>{
if(err){

res.sendStatus(403)
}else{

if (emp.leave=="Available"){
data.emp.lApplied =true

emp.lApplied=true

res.json({
req_status: emp.lApplied,
message:"Applied"
})}else {
res.json({
message:"cannot apply"

            })

        }
    }
})
})

app.post('/approveLeave', verifyToken, (req,res)=>{

jwt.verify(req.token, 'secretkey', (err,data)=>{
if (err){
res.sendStatus(403);
}
})

})
function verifyToken(req,res,next){
const bearerHeader = req.headers['authorization']
if (typeof bearerHeader !== 'undefined'){
const bearer = bearerHeader.split(' ')
const bearerToken = bearer[1]
req.token = bearerToken
next()
}else{
res.sendStatus(403)

}

}

