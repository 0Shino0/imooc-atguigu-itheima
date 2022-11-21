const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000
// app.use((req, res, next) => {

// })

// app.get('/user',(req,res,next)=>{

// })

app.get('/user',(req,res,next)=>{
  console.log(req.method);
  next()
},function(req,res,next){
  console.log('666');
  next()
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
