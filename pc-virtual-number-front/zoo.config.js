const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'examples/index.html',
      filename: 'index.html',
    },
  },
  webpack: {
    chainWebpack: (config) => {
      config.resolve.alias
        .set('~', 'src/')
        .set('doraemon','@zcy/doraemon');

      config.module
        .rule('vue')
        .test(/\.vue$/)
        .use('vue')
        .loader('vue-loader')
        
      config.module
        .rule('md')
        .test(/\.md$/)
        .use('vue')
        .loader('vue-loader')
        .end()
        .use("md")
        .loader(path.resolve(__dirname, './build/vue-md-loader'));
        
      config.plugin('vue')
        .use(new VueLoaderPlugin());
    },
    configureWebpack: {
      module: {
        rules: [
          { parser: { amd: false } }
        ]
      }
    }
  },
  babel: {
    // use6: true,
    import: [{
      libraryName: 'uni-design-vue',
      style: true
    }],
    presets: [
      '@vue/app'
    ],
  },
};