/*
 * @Author: your name
 * @Date: 2020-03-07 21:23:24
 * @LastEditTime: 2020-03-07 21:57:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SellingPlat\src\store\user.js
 */
const user = {
    namespaced: true,
    types: {},
    state: {
        isLogin: true,
        username: '334'
    },
    mutations: {
        setUsername (state, data) {
            state.username = data
        }
    },
    actions: {
        
    }
}
export default user