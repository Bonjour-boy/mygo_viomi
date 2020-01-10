/*
 * @Descripttion: 
 * @version: 
 * @Author: luxianbo
 * @Date: 2019-12-05 18:18:38
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-27 11:22:05
 */
import DataAdapter from './request/DataAdapter'
import DataManager from './request/CommonPropsManager'

export default{
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
    //设置排序
    setModeSort(value){
        this.setData('set_mode_sort', [value], ((val,result)=>{
            if(result[0] === 'ok'){
                console.log('排序成功')
            }
        }))  
    },
    //设置模式管理上半部分（同步到小屏）模式数量
    setTopModelNum(value){
        this.setData('set_top', [value], ((val,result)=>{
            if(result[0] === 'ok'){
                console.log('模式数量设置成功')
            }
        }))
    },
    //设置模式
    setMode(value){
        this.setData('set_mode', [value], ((val,result)=>{
            if(result[0] === 'ok'){
                console.log('模式设置成功')
            }
        }))  
    },
    //预约料理时间
    setCook_time(mode,warmTemp,warmTime,setTime){
        this.setData('set_work', [1,mode,warmTemp,warmTime,setTime], ((val,result)=>{
            if(result[0] === 'ok'){
                console.log('预约成功')
            }
        })) 
    },
    //取消、终止、停止
    CancelCook_time(mode){
        this.setData('set_work', [0,mode,0,0,0], ((val,result)=>{
            if(result[0] === 'ok'){
                console.log('取消、终止、停止')
            }
        })) 
    },
    //点击开始，等待启动中
    setStart_working(work_status,mode,warmTemp,warmTime,callback){
        this.setData('set_work', [work_status,mode,warmTemp,warmTime,0], ((val,result)=>{
            if(result[0] === 'ok'){
                console.log('等待启动中')
                callback(result[0])
            }
        })) 
    },
    //设置手动挡数
    setRotate_num(num,callback){
        this.setData('set_rev', [num], ((val,result)=>{
            if(result[0] === 'ok'){
                console.log('设置挡数成功')
                callback(result[0])
            }
        })) 
    }
}
