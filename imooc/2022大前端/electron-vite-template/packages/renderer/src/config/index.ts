const isDev = process.env.NODE_ENV === 'development'

export default {
  baseUrl: {
    dev: 'http://localhost:3000',
    pro: 'http://api.dev.toimc.com:22000'
  },
  publicPath: [/^\/public/, /^\/login/],
  wsconfig: {
    url: isDev ? '127.0.0.1' : 'api.dev.toimc.com',
    port: isDev ? '3001' : 22001
  }
}
