module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    // devServer: {
    //     disableHostCheck: true
    // },
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/':{
                target:'http://47.93.117.14:8080/',
                changeOrigin:true
            }
        }
    }
}