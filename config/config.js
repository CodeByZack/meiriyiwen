module.exports = {
    port: 3000,
    session: {
      secret: 'myblog',
      key: 'myblog',
      maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost/article',
    qiniu: 'http://oztlwbo2e.bkt.clouddn.com/'
  }