import axios from './api'
import qs from 'qs'
// import comApi from './api'
// const comApi = 'http://47.100.177.141:8086' 

const homeApi = {
    // 用户信息
    userInfo(data) {
        return axios({
            url: "/api/basics/search",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 用户信息详情
    userInfoDetail(id) {
        return axios({
            url: "/api/basics/detail",
            method: "post",
            data: qs.stringify({id})
        }).then();
    },

    // 添加资料
    createInfo(data) {
        return axios({
            url: "/api/basics/create",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 修改资料
    modifyInfo(data) {
        return axios({
            url: "/api/basics/modify",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 员工获取公司列表
    userCompany() {
        return axios({
            url: "/api/company",
            method: "get",
        }).then();
    },

    // 员工获取职场列表
    userWork(company_id) {
        return axios({
            url: "/api/platform",
            method: "get",
            params: {company_id}
        }).then();
    },

/**
 *  员工模块
 */

    // 在职员工列表
    staffList(data) {
        return axios({
            url: "/api/staff/search",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 申请公司员工列表
    applyList(data) {
        return axios({
            url: "/api/apply/search",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 申请员工详情
    applyDetail(id) {
        return axios({
            url: "/api/apply/detail",
            method: "post",
            data: qs.stringify({id})
        }).then();
    },

    // 审核申请员工
    applyExamine(id) {
        return axios({
            url: "/api/apply/modify",
            method: "post",
            data: qs.stringify({id})
        }).then();
    },

    // 申请注销员工列表
    logoutList(data) {
        return axios({
            url: "/api/cancellation/search",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 同意员工注销
    agreeDel(id) {
        return axios({
            url: "/api/cancellation/modify",
            method: "post",
            data: qs.stringify({id})
        }).then();
    },


    // 公司列表
    companyList(data) {
        return axios({
            url: "/api/company/search",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 公司详情
    companyDetail(id) {
        return axios({
            url: "/api/company/detail",
            method: "get",
            params: {id}
        }).then();
    },

    // 公司创建
    companyCreate(data) {
        return axios({
            url: "/api/company/create",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 公司修改
    companyModify(data) {
        return axios({
            url: "/api/company/modify",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 公司删除
    companyRemove(id) {
        return axios({
            url: "/api/company/remove",
            method: "get",
            params: {id}
        }).then();
    },

    // 职场列表
    workList(data) {
        return axios({
            url: "/api/platform/search",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 职场详情
    workDetail(id) {
        return axios({
            url: "/api/platform/detail",
            method: "get",
            params: {id}
        }).then();
    },

    // 职场创建
    workCreate(data) {
        return axios({
            url: "/api/platform/create",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 职场修改
    workModify(data) {
        return axios({
            url: "/api/platform/modify",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 职场删除
    workRemove(id) {
        return axios({
            url: "/api/platform/remove",
            method: "get",
            params: {id}
        }).then();
    },

/**
*   排班管理  
 */

    // 排班列表
    schList(data) {
        return axios({
            url: "/api/work/search",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 排班详情
    schDetail(curDate) {
        return axios({
            url: "/api/work/detail",
            method: "get",
            params: {curDate}
        }).then();
    },

    // 排班
    schSave(data) {
        return axios({
            url: "/api/work/save",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 排班员工列表
    schUser() {
        return axios({
            url: "/api/user/list",
            method: "get",
        }).then();
    },

/**
 *  上机账号管理
 */

    // 上机账号查询
    accountList(data) {
        return axios({
            url: "/api/account/search",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 上机账号详情
    accountDetail(id) {
        return axios({
            url: "/api/account/detail",
            method: "post",
            data: qs.stringify({id})
        }).then();
    },

    // 上机账号添加
    accountCreate(data) {
        return axios({
            url: "/api/account/create",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 上机账号修改
    accountModify(data) {
        return axios({
            url: "/api/account/modify",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 上机账号删除
    accountRemove(id) {
        return axios({
            url: "/api/account/remove",
            method: "post",
            data: qs.stringify({id})
        }).then();
    },

    // 上机账号分配
    accountFen(data) {
        return axios({
            url: "/api/train/distribution",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 外呼系统业务区
    accountArea(data) {
        return axios({
            url: "/api/train/business",
            method: "post",
            data: qs.stringify(data)
        }).then();
    },

    // 跳转话+
    toHua(type) {
        return axios({
            url: "/api/train/detail",
            method: "post",
            data: qs.stringify({type})
        }).then();
    },




    


    // 获取培训token
    trainToken() {
        return axios({
            url: "/api/train/search",
            method: "post",
        }).then();
    },

    // 获取跳转话+的payload 
    getPayload() {
        return axios({
            url: "/api/train/detail",
            method: "post",
        }).then();
    },

// ------------------------------------------------------------------------------废弃
    // // 跳转话+
    // toHua() {
    //     return axios({
    //         url: "/api/train/detail",
    //         method: "post",
    //     }).then();
    // },
    // // 跳转
    // toHua1(data) {
    //     return axios({
    //         url: "http://127.0.0.1:8899/receive",
    //         method: "post",
    //         data: data
    //     }).then();
    // },
// ------------------------------------------------------------------------------废弃


    // 上传录音
    uploadFile(data) {
        return axios({
            url: "/api/staff/audio",
            method: "post",
            data: data
        }).then();
    },
    
    // 获取录音识别率
    recordRate(id) {
        return axios({
            url: "/api/staff/accuracy",
            method: "post",
            data: qs.stringify({id})
        }).then();
    },

    // 上传打字测试
    textSub(data) {
        return axios({
            url: "/api/staff/remove",
            method: "post",
            data: qs.stringify(data)
        }).then();
    }
    

    

}

export default homeApi