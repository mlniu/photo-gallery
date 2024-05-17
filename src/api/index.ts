import request from './request'

/**
 * 获取所有数据
 * 
 */
export function getAllData(){
    return request({
        url: "/api/v1/getAllData",
        method: "get"
    });
}

/**
 * 登录
 */
export function loginTabs(userData: any){
    return request({
        url: "/api/v1/loginTabs",
        method: "post",
        data: userData
    });
}