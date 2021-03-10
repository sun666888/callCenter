import axios from './api'
import qs from 'qs'
// import comApi from './api'
// const comApi = 'http://47.100.177.141:8086' 

const loginApi = {
    // 获取验证码
    verify(data) {
        return axios({
            url: "/api/verify",
            method: "get",
            params: data
        }).then();
    },

    // 注册
    register(data) {
        return axios({
            url: "/api/reg",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 登录
    login(data) {
        return axios({
            url: "/api/login",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 退出登录
    logout() {
        return axios({
            url: "/api/user/logout",
            method: "get",
        }).then();
    },

    // 修改密码
    modifyPasswd(data) {
        return axios({
            url: "/api/user/modifyPasswd",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },


    // 员工申请注销
    deleUser(reason) {
        return axios({
            url: "/api/cancellation/create",
            method: "post",
            data: qs.stringify({reason})
        }).then();
    },



}

export default loginApi