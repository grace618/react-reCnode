const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addLessLoader,
} = require('customize-cra');
const path = require('path');
// const rewireLess = require('react-app-rewire-less');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}
// 这个方法貌似css.map还在
const rewiredMap = () => (config) => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
  return config;
};
process.env.GENERATE_SOURCEMAP = 'false';
module.exports = override(
  // 配置路径别名
  addWebpackAlias({
    views: resolve('src/views'),
    service: resolve('src/service'),
    store: resolve('src/store'),
    utils: resolve('src/utils'),
    component: resolve('src/component')
  }),
  // antd按需加载
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#1DA57A',
    },
  }),
  // rewiredMap()
);
