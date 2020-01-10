import DataAdapter from './request/DataAdapter'
import DataManager from './request/CommonPropsManager'

export default{

//基础网络访问
getData(method, params, callback) {
    DataManager.stopPropsLoop();
    DataAdapter.callMethodWithNolater(method, params, (isSuccess, result) => {
        DataManager.resumePropsLoop();
        if (callback) {
            callback(isSuccess, result)
        }
    });
},

//冷藏室开关设置关闭
setColdOffSwitch(){
    this.getData('setRCSet', ['off'], ((val)=>{
        if(val === true){
            console.log('冷藏室开关关闭')
        }
    }))
},

//冷藏室开关设置关闭
setColdOnSwitch(){
    this.getData('setRCSet', ['on'], ((val)=>{
        if(val === true){
            console.log('冷藏室开关打开')
        }
    }))
},
//冷藏室温度设定
setColdTemp(value){
    this.getData('setRCSetTemp', [value], ((val)=>{
        if(val === true){
            console.log('冷藏室温度设置为：'+value)
        }
    }))
},
//冷藏室变温区设定
setColdChangeAreaTemp(value){
    this.getData('setRCCMode', [value], ((val)=>{
        if(val === true){
            console.log('冷藏室变温区温度设置为：'+value)
        }
    }))
},
//冷藏室速冷模式打开
setColdOnSpeedCool(){
    this.getData('setSmartCool', ['on'], ((val)=>{
        if(val === true){
            console.log('速冷模式打开')
        }
    }))
},
//冷藏室速冷模式关闭
setColdOffSpeedCool(){
    this.getData('setSmartCool', ['off'], ((val)=>{
        if(val === true){
            console.log('速冷模式关闭')
        }
    }))
},
//变温室开关设置关闭
setChangeOffSwitch(){
    this.getData('setCCSet', ['off'], ((val)=>{
        if(val === true){
            console.log('变温室开关关闭')
        }
    }))
},

//变温室开关设置关闭
setChangeOnSwitch(){
    this.getData('setCCSet', ['on'], ((val)=>{
        if(val === true){
            console.log('变温室开关打开')
        }
    }))
},
//变温室温度设定
setChangeTemp(value){
    this.getData('setCCSetTemp', [value], ((val)=>{
        if(val === true){
            console.log('变温室温度设置为：'+value)
        }
    }))
},
//冷冻室温度设定
setFrozenTemp(value){
    this.getData('setFCSetTemp', [value], ((val)=>{
        if(val === true){
            console.log('冷冻室温度设置为：'+value)
        }
    }))
},
//冷冻室速冻模式打开
setFrozenOnSpeedCool(){
    this.getData('setSmartFreeze', ['on'], ((val)=>{
        if(val === true){
            console.log('速冻模式打开')
        }
    }))
},
//冷冻室速冻模式关闭
setFrozenOffSpeedCool(){
    this.getData('setSmartFreeze', ['off'], ((val)=>{
        if(val === true){
            console.log('速冻模式关闭')
        }
    }))
},
//智能模式打开
setOnSmartModel(){
    this.getData('setMode', ['smart'], ((val)=>{
        if(val === true){
            console.log('智能模式打开')
        }
    }))
},
//假日模式打开
setOnHolidayModel(){
    this.getData('setMode', ['holiday'], ((val)=>{
        if(val === true){
            console.log('假日模式打开')
        }
    }))
},
}
