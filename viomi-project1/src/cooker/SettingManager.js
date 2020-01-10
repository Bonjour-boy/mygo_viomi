import DataAdapter from './request/DataAdapter'
import DataManager from './request/CommonPropsManager'

export default{
    //开始状态
    setStatus(){
        return ['空闲中','烹饪中','保温中','预约中']
    },

    //基础网络访问
    setData(method, params, callback) {
        DataManager.stopPropsLoop();
        DataAdapter.callMethodWithNolater(method, params, (isSuccess, result) => {
            DataManager.resumePropsLoop({
                updateProps:true,
                // delay:500
            });
            if (callback) {
                callback(isSuccess, result)
            }
        });
    },
    
    //首页点击开始按钮
    setStartCooker(model,cooker_time,keep_time){
        this.setData('set_work', [2,model,cooker_time,0,keep_time], ((val)=>{
            if(val === true){
                console.log('开始烹饪')
            }
        }))  
    },
    //点击停止烹饪
    setStopCooker(value){
        this.setData('set_work', [0,value], ((val)=>{
            if(val === true){
                console.log('停止烹饪')
            }
        })) 
    },
    //预约保温时长(保温模式)
    setKeepTemp_time(model,keep_time){
        this.setData('set_work', [2,model,0,0,keep_time], ((val)=>{
            if(val === true){
                console.log('预约保温')
            }
        }))
    },
    //停止保温(保温模式)
    setStopKeepTemp(model){
        this.setData('set_work', [0,model], ((val)=>{
            if(val === true){
                console.log('预约保温')
            }
        }))
    },
    //开始食谱烹饪
    setStartRecipeCooker(model,cooker_time,keep_time,parameter){
        this.setData('set_work', [2,model,cooker_time,0,keep_time,0,parameter], ((val)=>{
            if(val === true){
                console.log('开始食谱烹饪')
            }
        })) 
    },
    //预约食谱烹饪
    setRecipeSet_TimeCooker(model,cook_time,keep_time,set_time,parameter){
        this.setData('set_work', [1,model,cook_time,0,keep_time,set_time,parameter], ((val)=>{
            if(val === true){
                console.log('食谱预约烹饪')
            }
        }))   
    },
    //停止预约烹饪
    setStopSet_TimeCooker(model){
        this.setData('set_work', [3,model], ((val)=>{
            if(val === true){
                console.log('停止预约烹饪')
            }
        })) 
    }
}
