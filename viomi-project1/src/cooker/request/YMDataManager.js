'use strict';

import DeviceInfo from '../config/Info/DeviceInfo';
import User from '../config/Info/User';

let YMDataManager = {
	fetchGet(url,params,callback){
    	let isTimeout = false;
	    var setting = {
			  method: 'GET',
	    };
	   
		let paramArr = [];
		for(let i in params){
			paramArr.push(i + "=" + params[i]);
		}
		if(paramArr.length > 0){
			url = encodeURI(url + "?" + paramArr.join("&"));
		}

		// console.log('url:'+url);
	    fetch(url, setting).then((response) => response.text()).then((responseText) => {
			if(isTimeout) return;
			clearTimeout(inter);
			// console.log('responseText:'+responseText);
			let data;
			try{
				data = JSON.parse(responseText);
			}catch(ex){
				data = {
					code : -1,
					message : ex
				};
			}
			callback(data);
	    }).catch((...args) => {
	    	console.log('xxxxxxxxx');
	      	if(isTimeout) return;
	      	clearTimeout(inter);

	      	let data = {
	      		code : -1,
	      		message : 'error'
	      	}
	      	callback(data);
	    });
	    var inter = setTimeout(() => {
	      	//超时
	      	isTimeout = true;

	      	let data = {
	      		code : -2,
	      		message : 'timeout'
	      	}
	      	callback(data);
	    },10000);
  	},
	callMethodFromCloud(method, params){

		let promise = new Promise(function(resolve,reject){
		    // 异步处理
		    // 成功调用resolve 往下传递参数 且只接受一个参数
		    // 失败调用reject  往下传递参数 且只接受一个参数
			let url = 'https://openapp.io.mi.com/openapp/device/rpc';
			YMDataManager.fetchGet(url + "/" + DeviceInfo.deviceId,{
				data : JSON.stringify({
					method : method,
					did : DeviceInfo.deviceId,
					id : "1",
					params : params
				}),
				clientId : User.clientId,
				accessToken : User.token
			},(data) => { 
				if(data.code === 0){
					// console.log('成功')
					//callback(true,data);
					resolve(data)
				}else{
					// console.log('失败')
					reject(data);
					//callback(false,data);
				}
			});
		});
		return promise;
	},
	//获取设备上报的event等数据
	getDeviceData(params){
		let promise = new Promise(function(resolve,reject){
		    // 异步处理
		    // 成功调用resolve 往下传递参数 且只接受一个参数
		    // 失败调用reject  往下传递参数 且只接受一个参数
		    let url = 'https://openapp.io.mi.com/openapp/user/get_user_device_data';
		    YMDataManager.fetchGet(url,{
				data:JSON.stringify(params),
				clientId:User.clientId,
				accessToken:User.token
			},(data) => { 
				if(data.code === 0){
					resolve(data.result)
				}else{
					reject(data);
				}
			});
		});
		return promise;
	}
}

module.exports = YMDataManager;


