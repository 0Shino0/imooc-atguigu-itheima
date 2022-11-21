const express = require('express')
const router = require('./router/index')
const routerVideo = require('./router/video')
const app = express()

// app.all('/xx',(req,res)=>{
//   res.send('xxx')
// })

// app.get('/us*er',(req,res)=>{
//   res.send(`${req.method}---${req.url}`)
// })


// app.get('/user/:id/video/:id',(req,res)=>{
//   console.log(req.params);
//   res.send(`${req.method}---${req.url}`)
// })

app
.get('/user',(req,res)=>{
  // res.send(`${req.method}---${req.url}`)
  // res.download()
  // res.end()
  // res.json()
  // res.redirect()
  // res.render()
  // res.sendStatus
  res.status(200).json()
})
.post('/video',(req,res)=>{
  res.send(`${req.method}---${req.url}`)
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
