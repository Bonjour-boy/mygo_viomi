import ModelAdapter from './config/Adapter/ModelAdapter'
var moment = require('moment');

export default {
    //Slider组件样式
    trackStyle(){//选中部分滑动条的样式
        return {
            height: '1.066667rem',
            borderRadius: '1.066667rem',
            backgroundColor: '#29c7ca',
            paddingLeft: '.8rem',
        }
    },
    handleStyle(){//滑块的样式
        return {
            width: '1.066667rem',
            height: '1.066667rem',
            marginTop: 0,
            marginLeft: 0,
            zIndex: 1
        }
    },
    railStyle(){//未选中部分
        return {
            height: '1.066667rem',
            borderRadius: '1.066667rem',
            width: '8.533333rem',
        }
    },
    //现在模式
    nowModel(num){
        switch(num){
            case 1:
                return '浓豆浆';
            case 2:
                return '婴儿糊';    
            case 3:
                return '浓汤';    
            case 4:
                return '果蔬汁';     
            case 5:
                return '冰沙';   
            case 6:
                return '玉米汁';  
            case 7:
                return '加热'; 
            case 8:
                return '手动';
            case 9:
                return '罗宋汤';
            case 10:
                return '绵粥';
            case 11:
                return '芝麻糊';
            case 12:
                return '保温';                     
        }
    },
    //显示时间段凌晨、早上、中午、下午、晚上（明天）
    showQuantum_Tomorrow(plan_hour){
        let day = ''
        if(plan_hour >= 0 && plan_hour < 5){
            day = '明天凌晨'
        }
        if(plan_hour >= 5 && plan_hour < 11){
            day = '明天早上'
        }
        if(plan_hour >= 11 && plan_hour < 13){
            day = '明天中午'
        }
        if(plan_hour >= 13 && plan_hour < 17){
            day = '明天下午'
        }
        if(plan_hour >= 17 && plan_hour < 19){
            day = '明天傍晚'
        }
        if(plan_hour >= 19 && plan_hour < 24){
            day = '明天晚上'
        }
        return day
    },
    //显示时间段凌晨、早上、中午、下午、晚上（今天）
    showQuantum_Today(plan_hour){
        let day = ''
        if(plan_hour >= 0 && plan_hour < 5){
            day = '今天凌晨'
        }
        if(plan_hour >= 5 && plan_hour < 11){
            day = '今天早上'
        }
        if(plan_hour >= 11 && plan_hour < 13){
            day = '今天中午'
        }
        if(plan_hour >= 13 && plan_hour < 17){
            day = '今天下午'
        }
        if(plan_hour >= 17 && plan_hour < 19){
            day = '今天傍晚'
        }
        if(plan_hour >= 19 && plan_hour < 24){
            day = '今天晚上'
        }
        return day
    },

    //立即料理时的时间(输入秒数)
    PromptlyWorkTime(secondNum){
        let now_second = moment().second()
        let now_minute = moment().minute()
        let now_hour = moment().hour()
        let all_m = now_second + now_minute*60 + now_hour*3600
        let promptlyWork_time = all_m + secondNum
        return promptlyWork_time
    },
    //时间格式化（输入时间戳）
    timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes();
        let s = date.getSeconds();
        return Y+M+D+h+m+s;  
    },
    /**
     * @description: 
     * @param {*} result 返回的参数
     */
    //获取数据解析
    MainPage_getData(result){
        let json = {}
        let errors = []
        json.modelNum = result.datas.mode
        json.mode_sort = result.datas.mode_sort.split('-')
        json.left_time = result.datas.left_time

        let warm_dataArr = result.datas.warm_data.split('-')
        let temp_dataArr = []
        let time_dataArr = []
        warm_dataArr.map((item,index)=>{
            if(index % 2 === 0){
                time_dataArr.push(item / 2)
            }else{
                temp_dataArr.push(item)
            }
        })

        json.temp_data = temp_dataArr[result.datas.mode - 1]
        json.time_data = time_dataArr[result.datas.mode - 1]
        json.rev = result.datas.rev
        //立即料理时的时间
        ModelAdapter.model_data().map((item)=>{
            if(result.datas.mode === item.sortNum){
                json.promptlyWorkTime = this.PromptlyWorkTime(item.baseTime*60)
            }
        })
        json.work_status = result.datas.work_status
        json.cooked_time = result.datas.cooked_time
        json.cook_time = result.datas.cook_time
        json.curr_tempe = result.datas.curr_tempe
        json.stand_top_num = result.datas.stand_top_num

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
                text = 'E0-电机故障'; //'电机故障';
                break;
            case 1:
                text = 'E1-传感器故障'; //'传感器故障';
                break;
            case 2:
                text = 'E2-加热故障'; //'加热故障';
                break;
            case 3:
                text = 'E3-过零故障'; //'过零故障';
                break;
            case 4:
                text = 'E4-继电器故障'; //'继电器故障';
                break;
            case 5:
                text = 'E5-电能检测故障'; //'电能检测故障';
                break;
            case 6:
                text = 'E6-电压异常'; //'电压异常';
                break;
            case 7:
                text = 'E7-干烧保护'; //'干烧保护';
                break;
            case 8:
                text = 'E8-高原保护'; //'高原保护';
                break;
            case 9:
                text = 'E9-未放置杯体'; //'未放置杯体';
                break;
            case 10:
                text = 'E10-未放置杯盖'; //'未放置杯盖';
                break;
            default:
                text = '未知故障'; //'未知故障';
        }
        return text;
    }
}