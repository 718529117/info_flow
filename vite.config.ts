import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  // base: '/info_flows/',
  plugins: [vue()],
  resolve: {
    //别名配置，引用src路径下的东西可以通过@如：import Layout from '@/layout/index.vue'
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  server: {
    proxy: {
      '/api_mt': {//反向代理的请求名
        target: 'https://peppermall.meituan.com',//此处写后端地址
        changeOrigin: true,//默认是false,当为true时可以将当前ip改为目标url，故启用该功能
        rewrite: path => path.replace(/^\/api_mt/, '')//重写url，注意一定要和请求名一致
      },
      '/api_tc': {//反向代理的请求名
        target: 'https://wx.17u.cn',//此处写后端地址
        changeOrigin: true,//默认是false,当为true时可以将当前ip改为目标url，故启用该功能
        rewrite: path => path.replace(/^\/api_tc/, '')//重写url，注意一定要和请求名一致
      },
      '/api_qn': {//反向代理的请求名
        target: 'https://touch.qunar.com',//此处写后端地址
        changeOrigin: true,//默认是false,当为true时可以将当前ip改为目标url，故启用该功能
        rewrite: path => path.replace(/^\/api_qn/, '')//重写url，注意一定要和请求名一致
      },
      '/api_xc': {//反向代理的请求名
        target: 'https://m.ctrip.com',//此处写后端地址
        changeOrigin: true,//默认是false,当为true时可以将当前ip改为目标url，故启用该功能
        rewrite: path => path.replace(/^\/api_xc/, '')//重写url，注意一定要和请求名一致
      },
      '/api_tj': {//反向代理的请求名
        target: 'https://apisg.meituan.com',//此处写后端地址
        changeOrigin: true,//默认是false,当为true时可以将当前ip改为目标url，故启用该功能
        rewrite: path => path.replace(/^\/api_tj/, '')//重写url，注意一定要和请求名一致
      },
      '/api_gzyw': {//反向代理的请求名
        target: 'https://news.ycwb.com',//此处写后端地址
        changeOrigin: true,//默认是false,当为true时可以将当前ip改为目标url，故启用该功能
        rewrite: path => path.replace(/^\/api_gzyw/, '')//重写url，注意一定要和请求名一致
      },
      '/api_gold': {//反向代理的请求名
        target: 'http://beijingrtj.com',//此处写后端地址
        changeOrigin: true,//默认是false,当为true时可以将当前ip改为目标url，故启用该功能
        rewrite: path => path.replace(/^\/api_gold/, '')//重写url，注意一定要和请求名一致
      }
    }
  }
})
