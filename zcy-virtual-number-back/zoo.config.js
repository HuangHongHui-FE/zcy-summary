// 脚手架限制不能使用 es6 导出方式
/* eslint-disable no-undef */
module.exports = {
  pages: {
    index: {
      entry: 'examples/index.tsx',
      template: 'examples/index.hbs',
      filename: 'index.html',
    },
  },
  webpack: {
    configureWebpack: {
      resolve: {
        alias: {
          doraemon: '@zcy/doraemon',
        },
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)?$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                ],
                plugins: [
                     
                  [
                    '@babel/plugin-proposal-decorators',
                    {
                      legacy: true,
                    },
                  ],
                  ['@babel/plugin-proposal-export-default-from'],
                  ['@babel/plugin-transform-runtime'],
                  [
                    'import',
                    {
                      libraryName: 'doraemon',
                          
                      style: true,
                          
                    },
                  ],
                ],
              },
            },
            exclude: /node_modules/,
          },
        ],
      }, 
    },
  },
  babel: {
    use6: true,
  },
};
