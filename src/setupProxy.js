const proxy = require('http-proxy-middleware');

module.exports = function(app) {

  app.use(
    proxy('/web/rec/api/scm', { 
      target: 'http://172.26.12.10:8001', 
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/oms', { 
      target: 'http://172.26.12.10:8002', 
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/bms', {
      target: 'http://localhost:8003',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/mpa', {
      target: 'http://localhost:8004',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/blog', {
      target: 'http://172.26.12.10:8005',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/file', {
      target: 'http://localhost:8006',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/srd/common', {
      target: 'http://172.26.12.10:8007',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/sol', { 
      target: 'http://localhost:8008',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/uaa', { 
      target: 'http://172.26.12.10:8000', 
      changeOrigin: true
    })
  );
}