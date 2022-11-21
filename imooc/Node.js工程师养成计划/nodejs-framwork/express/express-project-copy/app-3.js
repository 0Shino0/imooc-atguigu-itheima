const express = require('express')
const router = require('./router/index')
const routerVideo = require('./router/video')
const app = express()
app.use('/user', router)
app.use('/video', routerVideo)

app.use((req, res, next)=>{
  res.status(404).send('404 Not Found.')
})

app.use((err,req,res,next)=>{
  console.log(err);
  res.status(500).send('service Error')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
