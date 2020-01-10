import ModelAdapter from './config/Adapter/ModelAdapter'
var moment = require('moment');
import numeral from '../utils/Number/main'
export default {
    //时间段相加----加上现在时间(输入分钟数)
    AddTimer_m(num){
        let minute = num%60//计算分钟数
        let hour = Math.floor(num/60)//计算小时数
        let t = moment().add(hour, 'h').add(minute, 'm'); //时间相加
        let res = moment(t._d).format('HH:mm'); //格式化时间
        return res
    },

    //时间段相加(输入小时数)
    AddTimer_h(num){
        let t = moment().add(num, 'h')
        let res = moment(t._d).format('HH:mm')
        return res
    },

    //显示标准时间（输入秒数）------该模式下剩余时间，单位s
    show_LeftTime(time) {
        let second = Math.floor(time%60)
        let minute = Math.floor(time/60%60)
        let hour =  Math.floor(time/3600)
        let hfm = moment({hour, minute,second});
        return hfm._d
    },

    //Mainpage计划完成时间(首次进入跳转传参)
    setPlanCooker_time(cook_start){
        let now_hour = moment().hour()
        let now_minute = moment().minute()
        let work_hour = Number(numeral(cook_start).format('00:00 ceil').split(':')[0])
        let work_minute = Number(numeral(cook_start).format('00:00 ceil').split(':')[1])
        let plan_hour = now_hour + work_hour
        let plan_minute = now_minute + work_minute
        if(plan_minute >= 60){
            plan_minute = plan_minute % 60
            plan_hour = plan_hour + 1 
        }
        let plan_time = plan_hour + ':' + plan_minute
        return plan_time
    },


    setPlanCooker_time1(cook_start){
        let now_hour = moment().hour()
        let now_minute = moment().minute()
        let nowAll_second = now_hour*3600 + now_minute*60
        let plan_time_second = nowAll_second + cook_start
        if(plan_time_second >= 86400){
            plan_time_second = plan_time_second - 86400
        }
        let plan_time = numeral(plan_time_second).format('00:00 ceil')
        return plan_time
    },



    /**
     * @description: 
     * @var {number} allTime 总时间
     * @var {number} leftTime 剩余时间
     */
    //保温中保温时显示已保温时长
    showKeepTemp_time(allTime,leftTime){
        let time = allTime - leftTime
        let second = Math.floor(time%60)
        let minute = Math.floor(time/60%60)
        let hour =  Math.floor(time/3600)
        let hfm = moment({hour, minute,second});
        let showKeepTemp_time = moment(hfm._i).format('HH:mm');
        return showKeepTemp_time
    },
    /**
     * @description: 
     * @var {number} hour 小时数
     * @var {number} minute 分钟数
     */
    //时间段======>之前(需要输入 小时数 和 分钟数)
    hm_BeforeTimer(hour,minute){
        let res_h = 0;
        let res_m  = 0;
        let res = 0;
        let now_hour = moment().hour()//现在时间(小时)
        let now_minute = moment().minute()//现在时间(分钟)
        if(minute === now_minute){
            res =(24 - (now_hour - hour))*3600
        }
        else if(minute < now_minute){
            res_h = (24 - (now_hour - hour) - 1)*3600
            res_m =(60 - (now_minute - minute))*60
            res = res_h + res_m
        }
        else if(minute > now_minute){
            res_h = (24 - (now_hour - hour))*3600
            res_m =(minute - now_minute)*60
            res = res_h + res_m
        }
        return res
    },
    /**
     * @description: 
     * @var {number} hour 小时数
     * @var {number} minute 分钟数
     */
    //时间段======>之后(需要输入 小时数 和 分钟数)
    hm_AfterTimer(hour,minute){
        let res_h = 0;
        let res_m  = 0;
        let res = 0;
        let now_hour = moment().hour()//现在时间(小时)
        let now_minute = moment().minute()//现在时间(分钟)
        if(minute === now_minute){
            res = (hour - now_hour)*3600
        }
        else if(minute < now_minute){
            res_h = (hour - now_hour - 1)*3600
            res_m =(60 - (now_minute - minute))*60
            res = res_h + res_m
        }
        else if(minute > now_minute){
            res_h = (hour - now_hour)*3600
            res_m = (minute - now_minute)*60
            res = res_h + res_m
        }
        return res
    },
    /**
     * @description: 
     * @var {string} setTime 预计完成时间
     * @var {array} args 预约设置参数
     */
    //预约弹窗选择的时间段
    setPopup_time(setTime,args){
        let json = {}
        let expect = setTime.split(":")//预计完成时间(数组)
        let now_hour = moment().hour()//现在时间(小时)
        let now_minute = moment().minute()//现在时间(分钟)
        let specTime = moment({hour: args[0][0], minute:args[0][1]});
        let sureTimer = moment(specTime._d).format('HH:mm'); 
        json.titleTimer = sureTimer

        if(Number(args[0][0]) < now_hour){
            json.isShowCooking_before = true
        }
        else if(Number(args[0][0]) === now_hour && Number(args[0][1]) < now_minute){
            json.isShowCooking_before = true
        }
        else {
            json.isShowCooking_before = false
            if(Number(args[0][0]) > Number(expect[0])){
                json.isShowCooking_after = true
            }else if(Number(args[0][0]) === Number(expect[0]) && Number(args[0][1]) > Number(expect[1])){
                json.isShowCooking_after = true
            }else{
                json.isShowCooking_after = false
            }
        }
        return json
    },
    /**
     * @description: 
     * @var {string} DataTimer 预约设置完成时间
     * @var {string} setTime 计划完成时间
     */
    //预约烹饪页面显示剩余时间(参数1：设定完成时间；参数2：计划完成时间)
    setTimePageShowLeft_time(DataTimer,setTime){
        let json = {}
        let set_time = DataTimer.split(':')//预约设置完成时间
        let set_h = Number(set_time[0])//设定完成时间(小时)
        let set_m = Number(set_time[1])//设定完成时间(分钟)
        let now_hour = moment().hour()//现在时间(小时)
        let now_minute = moment().minute()//现在时间(分钟)
        let plan_time = setTime.split(':')//计划完成时间
        let plan_h = Number(plan_time[0])//计划完成时间(小时)
        let plan_m = Number(plan_time[1])//计划完成时间(分钟)
        if(set_h < now_hour){
            json.isShowCooking_before = true
        }
        else if(set_h === now_hour){
            if(set_m < now_minute){
                json.isShowCooking_before = true
            }else{
                json.isShowCooking_before = false
            }
        }else{
            json.isShowCooking_before = false
            // if(set_h < plan_h){
            //     json.isNowCoooker = true  
            // }
            // else if(set_h === plan_h){
            //     if(set_m < plan_m ||set_m === plan_m){
            //         json.isNowCoooker = true 
            //     }else{
            //         json.isNowCoooker = false   
            //     }
            // }
        }
        return json
    },

    //米种选择
    Mi_ActiveButton(e,ref){
        let rectangle = document.getElementsByClassName('rectangle')
        for(var i = 0;i<2;i++){
            rectangle[i].style.background = ''
            rectangle[i].style.color = '#999'
        }
        ref.style.background = '#F0F2F5'
        ref.style.color = '#000'
    },

    //口感选择
    Taste_ActiveButton(e,ref){
        let rectangle = document.getElementsByClassName('rectangle')
        for(var i = 2;i<5;i++){
            rectangle[i].style.background = ''
            rectangle[i].style.color = '#999'
        }
        ref.style.background = '#F0F2F5'
        ref.style.color = '#000'
    },

    //Slider组件样式
    trackStyle(){//选中部分滑动条的样式
        return {
            height:'1.28rem',
            borderRadius:'.373333rem',
            backgroundColor:'#1D80FF',
            paddingLeft:'.8rem',
        }
    },
    handleStyle(){//滑块的样式
        return {
            width:'1.28rem',
            height: '1.28rem',
            marginTop: 0,
            marginLeft: 0,
            borderRadius: '.373333rem',
            textAlign: 'center',
            fontSize: '.586667rem',
            color: 'rgb(16, 142, 233)',
            lineHeight: '1.226667rem'
        }
    },
    railStyle(){//未选中部分
        return {
            height: '1.28rem',
            borderRadius: '.373333rem',
            width: '8.933333rem',
        }
    },
    
    /**
     * @description: 
     * @param {*} result 返回的参数
     */
    //获取数据解析
    MainPage_getData(result){
        let json = {}
        let errors = []
        json.status = result.datas.work_status
        json.left_time = result.datas.left_time
        json.modelNum = result.datas.mode
        json.cookTimer1 = result.datas.cook_time
        json.cook_start = result.datas.cook_start
        ModelAdapter.recipeData().map((item)=>{
             item.item.map((k)=>{
                 if(k.key === result.datas.mode){
                     json.cookTimer = k.cookerTime
                     json.model = k.title
                 }
             })
         }) 

        //首页故障数量
        if(result.datas.run_status){
            for (var i = 0; i <= 14; i++) {  
                let item = result.datas.run_status&Math.pow(2,i);  
                if(item > 0){
                    let itemtext = this.errorText(i);
                    errors.push(itemtext)
                }
            }
            json.errorTxt = errors
            json.errorNum = errors.length
            json.isShowError = true
        }else{
            json.isShowError = false
        }      
        return json
    },
    //故障内容
    errorText(index){
        let text = '';
        switch(index)
        {
            case 0:
                text = 'E0-硬件故障'; //'硬件故障';
                break;
            case 1:
                text = 'E1-IGBT超温'; //'IGBT超温';
                break;
            case 2:
                text = 'E2-电源过压'; //'电源过压';
                break;
            case 3:0
                text = 'E3-电源欠压'; //'电源欠压';
                break;
            case 4:
                text = 'E4-顶部传感器开路'; //'顶部传感器开路';
                break;
            case 5:
                text = 'E5-顶部传感器短路'; //'顶部传感器短路';
                break;
            case 6:
                text = 'E6-底部传感器开路'; //'底部传感器开路';
                break;
            case 7:
                text = 'E7-底部传感器短路'; //'底部传感器短路';
                break;
            case 8:
                text = 'E8-IGBT传感器开路'; //'IGBT传感器开路';
                break;
            case 9:
                text = 'E9-IGBT传感器短路'; //'IGBT传感器短路';
                break;
            case 10:
                text = 'E10-无锅'; //'无锅';
                break;
            case 11:
                text = 'E11-底部传感器过热'; //'底部传感器过热';
                break;
            case 12:
                text = 'E12-通讯故障'; //'通讯故障';
                break;
            case 13:
                text = 'E13-无水干烧'; //'无水干烧';
                break;
            case 14:
                text = 'E14-中途开盖检测'; //'中途开盖检测';
                break;
            default:
                text = '未知故障'; //'未知故障';
        }
        return text;
    }
}