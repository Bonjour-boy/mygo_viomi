/*
 * @Author: your name
 * @Date: 2019-11-08 09:29:34
 * @LastEditTime: 2019-12-04 11:59:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\cooker\config\Adapter\ModelAdapter.js
 */
import Config_v1 from './models/v1'
import Config_v4 from './models/v4'
import DeviceInfo from '../Info/DeviceInfo'
let models = {
    v1:'viomi.cooker.v1',
    v4:'viomi.cooker.v4',
}

let ModelAdapter = null;
switch(DeviceInfo.deviceModel){
    case 'viomi.cooker.v1':
        ModelAdapter = Config_v1;
        Object.assign(ModelAdapter, models); 
    break;
    case 'viomi.cooker.v4':
        ModelAdapter = Config_v4;
        Object.assign(ModelAdapter, models); 
    break;
    
}
export default ModelAdapter