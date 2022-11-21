const express = require('express')


const app = express()

const PORT = process.env.PORT || 3000

// 挂载路由
app.use('/api', router)

// 挂载统一处理服务端错误中间件
app.use(errorHandler())

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
