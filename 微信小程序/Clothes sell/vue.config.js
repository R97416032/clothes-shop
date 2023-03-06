module.exports = {
configureWebpack : {
performance : {
hints:'warning',
//入口起点的最大体积 整数类型（以字节为单位）
maxEntrypointSize: 500000000,
//生成文件的最大体积 整数类型（以字节为单位 300k）
maxAssetSize: 300000000,
//只给出 js 文件的性能提示
assetFilter: function(assetFilename) {
return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
}
}
}
}