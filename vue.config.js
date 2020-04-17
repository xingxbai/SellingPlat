module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    // devServer: {
    //     disableHostCheck: true
    // },
    devServer: {
        disableHostCheck: true,
        public: 'http://localhost:8080',
        //sockHost: 'http://172.16.17.54:8080',
        proxy: {
            '/':{
                target:'http://47.93.117.14:8080/second-hand/',
                changeOrigin:true
            }
        }
    },
}