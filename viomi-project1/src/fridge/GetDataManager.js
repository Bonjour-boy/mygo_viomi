/*
 * @Author: your name
 * @Date: 2019-10-30 17:41:07
 * @LastEditTime : 2019-12-25 17:49:14
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\fridge\GetDataManager.js
 */
export default {
    NowModelData(result){
        let json = {}
        let errors = []
        json.coldDefaultTemp = result.datas.RCSetTemp
        json.changeDefaultTemp = result.datas.CCSetTemp
        json.afrozenDefaultTemp = result.datas.FCSetTemp
        json.errorText = result.datas.Error
        json.nowModel = result.datas.Mode
        json.coldSwitch = result.datas.RCSet
        json.speedCoolModel = result.datas.SmartCool
        json.speedFreezeModel = result.datas.SmartFreeze
        json.changSwitch = result.datas.CCSet

        if(result.datas.Mode === 'smart'){
            json.modelState = '智能模式'
        }else if(result.datas.Mode === 'holiday'){
            json.modelState = '假日模式'
        }
        
        if(result.datas.RCCMode === 1){
            json.changeAreaDefaultTemp=5
        }else if(result.datas.RCCMode === 2){
            json.changeAreaDefaultTemp=0
        }else if(result.datas.RCCMode === 3){
            json.changeAreaDefaultTemp=-1
        }else if(result.datas.RCCMode === 0){
            json.changeAreaDefaultTemp='关闭'
        }

        //故障数量
        if(result.datas.Error){
            for(var i = 0; i<=24; i++){
                let item = result.datas.Error&Math.pow(2,i);
                if(item > 0){
                    errors.push(item) 
                }
            }
            json.errorNum = errors.length
            json.isIssue = true 
        }else{
            json.isIssue = false  
        }
        return json
    }
}