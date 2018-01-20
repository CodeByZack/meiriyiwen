module.exports = function (app) {
    app.get('/', function (req, res) {
      res.redirect('/index')
    })
    app.use('/index', require('./index'))
    app.use('/random', require('./random'))
    app.use('/voicelist', require('./voicelist'))
    app.use('/playrandom', require('./playrandom'))
    app.use('/play', require('./play'))
  
    // 404 page
    app.use(function (req, res) {
      if (!res.headersSent) {
        res.status(404).render('404')
      }
    })
  }