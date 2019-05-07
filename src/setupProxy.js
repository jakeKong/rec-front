const proxy = require('http-proxy-middleware');

module.exports = function(app) {

  app.use(
    proxy('/web/rec/api/scm', { 
      target: 'http://localhost:8001', 
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/oms', { 
      target: 'http://localhost:8002', 
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/bms', {
      target: 'http://localhost:8003',
      changeOrigin: true
    })
  );
}