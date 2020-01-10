import Config_c1 from './models/c1'
import DeviceInfo from '../Info/DeviceInfo'
let models = {
    c1:'viomi.hood.c1',
}

let ModelAdapter = null;
switch(DeviceInfo.deviceModel){
    case 'viomi.hood.c1':
        ModelAdapter = Config_c1;
        Object.assign(ModelAdapter, models); 
    break;
    
}
export default ModelAdapter