import { CapacitorHttp, HttpResponse } from '@capacitor/core'

//GET请求
export async function getAllData(){
    const options = {
        url: 'https://4d054j3683.imdo.co/api/v1/getAllData',
        headers: { "Content-Type": "application/json;charset=utf-8" },
        params: { 
            
        },

      };
    const response: HttpResponse = await CapacitorHttp.get(options);
    return response;
}

//Post请求
export async function loginTabs(userData: any){
    const options = {
        url: 'https://4d054j3683.imdo.co/api/v1/loginTabs',
        headers: { "Content-Type": "application/json;charset=utf-8" },
        data: userData

      };
    const response: HttpResponse = await CapacitorHttp.post(options);
    return response;
}