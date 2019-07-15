const proxy = require('http-proxy-middleware');

module.exports = function(app) {

  app.use(
    proxy('/web/rec/api/scm', { 
      target: 'http://srd.iptime.org:8001', 
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/oms', { 
      target: 'http://srd.iptime.org:8002', 
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/bms', {
      target: 'http://srd.iptime.org:8003',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/mpa', {
      target: 'http://srd.iptime.org:8004',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/blog', {
      target: 'http://srd.iptime.org:8005',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/file', {
      target: 'http://srd.iptime.org:8006',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/srd/common', {
      target: 'http://srd.iptime.org:8007',
      changeOrigin: true
    })
  );
}