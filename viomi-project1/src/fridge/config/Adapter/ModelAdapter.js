import Config_x5 from './models/x5'
import Config_x3 from './models/x3'
import Config_x4 from './models/x4'
import Config_u16 from './models/u16'

import DeviceInfo from '../Info/DeviceInfo'
let models = {
    x5:'viomi.fridge.x5',
    x3:'viomi.fridge.x3',
    x4:'viomi.fridge.x4',
    u16:'viomi.fridge.u16',
}

let ModelAdapter = null;
switch(DeviceInfo.deviceModel){
    case 'viomi.fridge.x5':
        ModelAdapter = Config_x5;
        Object.assign(ModelAdapter, models); 
    break;
    case 'viomi.fridge.x3':
        ModelAdapter = Config_x3;
        Object.assign(ModelAdapter, models);
    break;
    case 'viomi.fridge.x4':
        ModelAdapter = Config_x4;
        Object.assign(ModelAdapter, models);
    break;
    case 'viomi.fridge.u16':
        ModelAdapter = Config_u16;
        Object.assign(ModelAdapter, models);
    break;
}
export default ModelAdapter