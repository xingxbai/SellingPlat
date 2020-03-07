/*
 * @Author: your name
 * @Date: 2020-03-07 21:22:27
 * @LastEditTime: 2020-03-07 21:48:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat\src\store\index.js
 */

import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import goods from './goods'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        user,
        goods
    }
})