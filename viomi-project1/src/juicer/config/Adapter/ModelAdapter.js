/*
 * @Author: your name
 * @Date: 2019-11-08 09:29:34
 * @LastEditTime: 2019-12-09 10:29:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\cooker\config\Adapter\ModelAdapter.js
 */
import Config_v2 from './models/v2'
import DeviceInfo from '../Info/DeviceInfo'
let models = {
    v2:'viomi.cooker.v2',
}

let ModelAdapter = null;
switch(DeviceInfo.deviceModel){
    case 'viomi.cooker.v2':
        ModelAdapter = Config_v2;
        Object.assign(ModelAdapter, models); 
    break;
   
    
}
export default ModelAdapter