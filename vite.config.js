import reactRefresh from '@vitejs/plugin-react-refresh';
import legacyPlugin from '@vitejs/plugin-legacy';
const path = require('path');

// https://cn.vitejs.dev/config/
export default ({ command, mode }) => {
  console.log(command, mode);
  return {
    base: './',
    root: './',
    resolve: {
      alias: {
        'react-native': 'react-native-web',
        '@': path.resolve(__dirname, 'src'),
      }
    },
    define: {
      'process.env.REACT_APP_IS_LOCAL': "'true'",
      'window.__CID__': JSON.stringify(process.env.cid || 'id'),
    },
    server: {
      port: 8080,
      proxy: {
        '/api': {
          target: 'https://stoku.test.shopee.co.id/',
          changeOrigin: true,
          onProxyRes(proxyRes, _, res) {
            const cookies = proxyRes.headers['set-cookie'] || [];
            const re = /domain=[\w.]+;/i;
            const newCookie = cookies.map(cookie => cookie.replace(re, 'Domain=localhost;'));
            res.writeHead(proxyRes.statusCode, {
              ...proxyRes.headers,
              'set-cookie': newCookie,
            });
        }
      },
      }
    },
    build: {
      target: 'es2015',
      minify: 'terser',
      manifest: false,
      sourcemap: false,
      outDir: 'build',
      rollupOptions: {},
    },
    esbuild: {},
    optimizeDeps: {},
    plugins: [
      reactRefresh(),
      legacyPlugin({
        targets: [
          'Android > 39',
          'Chrome >= 60',
          'Safari >= 10.1',
          'iOS >= 10.3',
          'Firefox >= 54',
          'Edge >= 15',
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  };
};
