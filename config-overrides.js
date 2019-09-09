const {override, fixBabelImports, addLessLoader ,addDecoratorsLegacy,addWebpackAlias} = require('customize-cra');

module.exports = override(
    //按需加载组件代码和样式
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    //自定义主题色
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'},
    }),
    //添加babel插件  支持装饰器语法
    addDecoratorsLegacy(),
    //添加路径别名  简化路径（问题：路径没有提示）
    addWebpackAlias({

    })
);