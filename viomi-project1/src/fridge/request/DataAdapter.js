'use strict';

// import ProjectAdapter from './ProjectAdapter';
// let isYunmi = ProjectAdapter.isYunmi;

// import CommonAdapter from './CommonAdapter';
// import DateUtil from '../Common/DateUtil';
import DeviceInfo from '../config/Info/DeviceInfo';
import DataManager from './YMDataManager';

// import { localizedStrings } from '../CommonPages/LocalizableString';


// let DataManager = null;
// let RecordManager = null;
// // let FileManager = null;
// if (isYunmi) {
// 	DataManager = require('./YMDataManager');
// 	RecordManager = DataManager;
// 	// FileManager = DataManager;
// } else {
// 	let miot = require('miot');
// 	DataManager = miot.Device.getDeviceWifi();
// 	RecordManager = miot.Service.smarthome;
// 	// FileManager = miot.Host.file;
// }

let DataAdapter = {
	minstructionIndex: 0,//setProp指令标志
	timer: null,
	currentMethod: '',
	errorCount: 0,
	/*
	* 获取属性接口
	* params，属性数组，比如['status','mode','time',.....]
	* callback,回调函数，（status, datas），status=0表示成功，其余失败
	*/
	fetchProp(params, callback, error = null) {
		DataManager.callMethodFromCloud("get_prop", params).then(json => {
			// alert('success'+JSON.stringify(json));
			// console.log('success', json);
			let code = json.code;
			if (code == 0) {
				this.errorCount = 0;
				callback(0, json.result);
			} else {
				this.errorCount += 1;
				if (this.errorCount > 5) {
					callback(1, 'net error');
				}
			}
		}).catch(err => {
			// alert('error ' + JSON.stringify(err));
			//需要自定义处理错误时
			if (error !== null) {
				error(err)
			}
			else {
				console.log('error', err);
				//错误5次才返回报错
				this.errorCount += 1;
				if (this.errorCount > 5) {
					try {
						let message = err.message;
						if (message.indexOf("device offline") != -1) {
							//设备离线
							callback(2, 'device offline');
						} else {
							callback(1, 'net error');
						}

					} catch (error) {

					}
				}
			}
		});
	},
	/*
	* 设置接口,屏蔽连续操作，屏蔽的操作没有返回callback
	* method，设置方法名称，如'setMode'
	* params，参数数组，比如[1,2]
	* callback,回调函数，(isSuccess,result)isSuccess=true表示成功，其余失败
	*/
	callMethod(method, params, callback) {

		this.currentMethod = method;

		this.minstructionIndex += 1;
		if (this.minstructionIndex > 100) {
			this.minstructionIndex = 0;
		}
		var currentInstruction = this.minstructionIndex;
		this.timer = setTimeout(
			() => {
				// console.log('method:' + method
				// 	+ ' | params:' + params
				// 	+ ' | currentInstruction:' + currentInstruction
				// 	+ ' | minstructionIndex:' + this.minstructionIndex);
				let cancle = false;
				if (this.currentMethod === method) {
					if (currentInstruction != this.minstructionIndex) {
						cancle = true;
					}
				}

				if (cancle) {
					//callback(false, 'cancle');
				} else {
					DataManager.callMethodFromCloud(method, params).then(json => {
						// console.log('method:' + method + ' ' + params + ' json:' + JSON.stringify(json));
						let code = json.code;
						if (code == 0) {
							callback(true, json.result);
						} else {
							// let errormessage = this.getErrorMessage();
							// callback(false, errormessage);
							console.log('失败')
						}

					}).catch(err => {
						//alert(JSON.stringify(err));
						// let errormessage = this.getErrorMessage();
						// callback(false, errormessage);
						console.log(err)
					});
				}

			},
			500
		);
	},

	/*
	* 设置接口,屏蔽连续操作，屏蔽的操作返回callback(false, 'cancle');
	* method，设置方法名称，如'setMode'
	* params，参数数组，比如[1,2]
	* callback,回调函数，(isSuccess,result)isSuccess=true表示成功，其余失败
	*/
	callMethodWithCancle(method, params, callback) {

		this.currentMethod = method;

		this.minstructionIndex += 1;
		if (this.minstructionIndex > 100) {
			this.minstructionIndex = 0;
		}
		var currentInstruction = this.minstructionIndex;
		this.timer = setTimeout(
			() => {
				console.log('method:' + method + '   ' + params + '  currentInstruction:' + currentInstruction + '  ' + this.minstructionIndex);
				let cancle = false;
				if (this.currentMethod === method) {
					if (currentInstruction != this.minstructionIndex) {
						cancle = true;
					}
				}

				if (cancle) {
					callback(false, 'cancle');
				} else {
					DataManager.callMethodFromCloud(method, params).then(json => {
						console.log('method:' + method + ' ' + params + ' json:' + JSON.stringify(json));
						let code = json.code;
						if (code == 0) {
							callback(true, json.result);
						} else {
							let errormessage = this.getErrorMessage();
							callback(false, errormessage);
						}

					}).catch(err => {
						// alert(JSON.stringify(err));
						// let errormessage = this.getErrorMessage();
						// callback(false, errormessage);
						console.log(err)
					});
				}

			},
			500
		);
	},
	/*
* 设置接口,没有屏蔽连续操作
* method，设置方法名称，如'setMode'
* params，参数数组，比如[1,2]
* callback,回调函数，(isSuccess,result)isSuccess=true表示成功，其余失败
*/
	callMethodWithNolater(method, params, callback) {

		DataManager.callMethodFromCloud(method, params).then(json => {
			console.log('method:' + method + ' ' + JSON.stringify(params) + ' json:' + JSON.stringify(json));
			let code = json.code;
			if (code == 0) {
				callback(true, json.result);
			} else {
				// let errormessage = this.getErrorMessage();
				callback(false, errormessage);
			}

		}).catch(err => {
			//alert(JSON.stringify(err));
			// let errormessage = this.getErrorMessage();
			callback(false, errormessage);
		});
	},
	// getErrorMessage() {
	// 	var error = Math.random();
	// 	if (error > 0.66) {
	// 		return localizedStrings.set_error_tip1;
	// 	} else if (error > 0.33) {
	// 		return localizedStrings.set_error_tip2;
	// 	} else {
	// 		return localizedStrings.set_error_tip3;
	// 	}
	// },
	/*
		获取历史使用记录接口
		demo
		let start_time = parseInt(DateUtil.getDateEnd(new Date()).getTime() / 1000 - 100000000);
		let end_time = parseInt(DateUtil.getDateEnd(new Date()).getTime() / 1000);
	
		DataAdapter.getDeviceData('wash_record',start_time,end_time,100,(status,data)=>{
			alert(status + JSON.stringify(data));
		});
	
		key:事件名称
		time_start:开始时间 时间戳（秒）（可为空）
		time_end:结束时间 时间戳（秒）
		limit:限制条数
		callback,回调函数，（status, datas），status=0表示成功，其余失败
	*/
	getDeviceData(key, time_start, time_end, limit, callback) {

		let params = time_start ?
			{
				"did": DeviceInfo.deviceId,
				"type": "event",
				"key": key,
				"time_start": time_start,
				"time_end": time_end,
				"limit": limit,
			} : {
				"did": DeviceInfo.deviceId,
				"type": "event",
				"key": key,
				"time_end": time_end,
				"limit": limit,
			}


		RecordManager.getDeviceData(params).then(data => {

			callback(0, data);

		}).catch(err => {
			callback(1, err);
		});
	},
	/*
		数据统计接口
		demo
		let start_time = parseInt(DateUtil.getDateEnd(new Date()).getTime() / 1000 - 100000000);
		let end_time = parseInt(DateUtil.getDateEnd(new Date()).getTime() / 1000);
	
		DataAdapter.getStoreData('monthly_record',start_time,end_time,100,(isSuccess,data)=>{
			alert(isSuccess + JSON.stringify(data));
		});
	
		key:事件名称
		time_start:开始时间 时间戳（秒）（可为空）
		time_end:结束时间 时间戳（秒）
		limit:限制条数
		callback,回调函数，（status, datas），status=0表示成功，其余失败
	*/
	getStoreData(key, time_start, time_end, callback) {

		let params = time_start ?
			{
				"did": DeviceInfo.deviceId,
				"type": "store",
				"key": key,
				"time_start": time_start,
				"time_end": time_end,
			} : {
				"did": DeviceInfo.deviceId,
				"type": "store",
				"key": key,
				"time_end": time_end,
			};


		RecordManager.getDeviceData(params).then(data => {
			callback(0, data);

		}).catch(err => {
			callback(1, err);
		});
	},
	/**
	 * 新版数据统计接口
	 * @param {*} params 
	 * @var {string} key 获取的key
	 * @var {string} data_type 获取的数据类型:stat_hour_v3/stat_day_v3/stat_week_v3/stat_month_v3
	 * @var {int64} time_start 开始时间
	 * @var {int64} time_end 结束时间
	 * @var {string} start_date 获取数据的起始日期(和 time_start 同时存在时，以这个为准，格式为 年/月/日 例如2019/03/01，用于支持时区统计)
	 * @var {string} end_date 获取数据的结束日期(和 time_end同时存在时，以这个为准，格式为 年/月/日 例如2019/03/01，用于支持时区统计)
	 * @var {int64} limit 限制的条数，可为0使用默认条数
	 */
	// getStoreDatas(params) {
	// 	return new Promise(function (resolve, reject) {
	// 		let data = {
	// 			...params,
	// 			did: DeviceInfo.deviceId
	// 		}

	// 		let dict = {
	// 			clientId: CommonAdapter.clientId(),
	// 			accessToken: CommonAdapter.token(),
	// 			data: JSON.stringify(data)
	// 		};

	// 		let url = 'https://openapp.io.mi.com/openapp/v2/user/statistics';

	// 		let paramArr = [];
	// 		for (let i in dict) {
	// 			paramArr.push(i + "=" + dict[i]);
	// 		}
	// 		if (paramArr.length > 0) {
	// 			url = encodeURI(url + "?" + paramArr.join("&"));
	// 		}
	// 		console.log('统计url======', url)
	// 		if (isYunmi) {
	// 			fetch(url, {
	// 				method: "GET"
	// 			})
	// 				.then(response => { return response.json() })
	// 				.then(responseJson => {
	// 					const { code, result } = responseJson;
	// 					if (code === 0) {
	// 						resolve(result);
	// 					}
	// 					else {
	// 						reject(responseJson)
	// 					}
	// 				})
	// 				.catch(error => {
	// 					reject(error)
	// 				});
	// 		}
	// 		else {
	// 			RecordManager.getUserStatistics(params)
	// 				.then(data => {
	// 					resolve(data.result);
	// 				})
	// 				.catch(err => {
	// 					reject(err);
	// 				});
	// 		}
	// 	})
	// },
	// readFile(callback) {
	// 	FileManager.readFile(CommonAdapter.deviceId + 'data.json')
	// 		.then((data) => {
	// 			if (data == '') { //第一次完全没数据的时候把其赋值为空对象的字符串不然会报错
	// 				data = '{}'
	// 			}
	// 			callback(true, data);
	// 		})
	// },
	// writeFile(obj) {
	// 	let str = JSON.stringify(obj);
	// 	FileManager.writeFile(CommonAdapter.deviceId + 'data.json', str).
	// 		then((isSuccess) => {
	// 			//写入成功
	// 			console.log('write success')
	// 		});
	// },

	// fetchUserDeviceData(callback) {
	// 	获取设备上报数据
	// 	DataManager.callSmartHomeAPI('/user/get_user_device_data',{
	// 		"did":CommonAdapter.deviceId,
	// 		"uid":CommonAdapter.ownerId,
	// 		"key":"monthly_record",
	// 		"type":"store",
	// 		"time_end":parseInt(DateUtil.getDateEnd(new Date()).getTime() / 1000),
	// 	}, (response) => {
	// 	 	//alert(JSON.stringify(response));
	// 	 	if(response.code === 0){
	// 	        let result = response.result;
	// 	  //       let value = JSON.parse(result[0].value);
	// 			// alert(value[0]);

	// 	        callback(true,result);
	// 	    }else{
	// 	    	callback(false,'');
	// 	    }
	// 	});
	// },

}

export default DataAdapter;
module.exports = DataAdapter;