const proxy = require('http-proxy-middleware');

module.exports = function(app) {

  app.use(
    proxy('/web/rec/api/scm', { 
      target: 'http://172.26.12.10:8001', 
      // target: 'http://localhost:8001',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/oms', { 
      target: 'http://172.26.12.10:8002', 
      // target: 'http://localhost:8002',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/bms', {
      target: 'http://algozip.co.kr:8003',
      // target: 'http://localhost:8003',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/mpa', {
      target: 'http://algozip.co.kr:8004',
      // target: 'http://localhost:8004',
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
      target: 'http://algozip.co.kr:8006',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/srd/common', {
      target: 'http://172.26.12.10:8007',
      // target: 'http://localhost:8007',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/web/rec/api/sol', { 
      target: 'http://172.26.10.111:8008',
      // target: 'http://localhost:8007',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/uaa', { 
      target: 'http://172.26.12.10:8000', 
      // target: 'http://localhost:8000',
      changeOrigin: true
    })
  );
  app.use(
    proxy('/crosswalk', { 
      // target: 'http://srd.iptime.org:8080',
      target: 'http://bdre.algozip.co.kr:8080',
      changeOrigin: true
    })
  );
}