/*
 * @Descripttion: 
 * @version: 
 * @Author: luxianbo
 * @Date: 2019-12-12 17:30:42
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-01-06 17:04:31
 */
import React, { Component } from 'react';
import './SetTimePage.css'
import { DatePickerView } from 'antd-mobile';
import Title from '../../../Components/Title/Title';
import Popup from '../../../Components/Popup/Popup'
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';
import SettingManager from '../../SettingManager'
import numeral from '../../../utils/Number/main'
var moment = require('moment');

//显示立即开始料理
const ImmediatelyCompleteCook = ((state)=>{   
    return  <div>
                <p className='set_time'>{`今天${numeral(state.promptlyWorkTime).format('00:00')}完成的料理`}</p>
                <p className='set_time'>将立即开始料理</p>
            </div>
})
//显示明天完成的料理
const NextdayCompleteWorkCook = ((state)=>{
    return <p className='set_time'>{`明天${moment(state.value).format('HH:mm')}完成的料理`}</p>
})
//显示今天完成的料理
const TodayCompleteWorkCook = ((state)=>{
    return <p className='set_time'>{`今天${moment(state.value).format('HH:mm')}完成的料理`}</p>
})

function hocMiddleComponent(MiddleComponent){
    return class extends React.Component{
        render() {
            return <MiddleComponent {...this.props}/>          
          }
    }
}
let ShowSetCompleteTime = hocMiddleComponent(ImmediatelyCompleteCook)
export default class SetTimePage extends Component{
    constructor(props) {
        super(props);
        this.state={
            value: new Date(),//当前选中时间（组件）
            renderComponent:false,//重新render渲染
            showPopup:false,//开始预约提示弹窗
        }
    }  
    //避免组件无意义渲染
    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
            return true
         } else {
            return false
        }
    }
    //返回按钮
    BackClick(){
        this.props.open(false)
    }
    //预约改变时间
    onChange(value){
        this.setState({ value });
    };
    //预约弹窗选择的时间段
    onValueChange(...args){
        let now_hour = moment().hour()//现在时间(小时)
        let now_minute = moment().minute()//现在时间(分钟)
        let plan_time = numeral(this.props.promptlyWorkTime).format('00:00')//计划时间
        let plan_minute = plan_time.split(':')[1]//计划分钟数
        let plan_hour = plan_time.split(':')[0]//计划小时数
        if(+args[0][0] < +now_hour){
            ShowSetCompleteTime = hocMiddleComponent(NextdayCompleteWorkCook)
        }
        else if (+args[0][0] === +now_hour){
            if(+args[0][1] < +now_minute){
                ShowSetCompleteTime = hocMiddleComponent(NextdayCompleteWorkCook)  
            }
            else if(+args[0][1] > +now_minute && +args[0][1] < +plan_minute){//计划料理完成时间不超过一小时
                ShowSetCompleteTime = hocMiddleComponent(ImmediatelyCompleteCook)
            }
            else if(+args[0][1] > +now_minute && +args[0][1] > +plan_minute){//计划料理完成时间不超过一小时     
                ShowSetCompleteTime = hocMiddleComponent(TodayCompleteWorkCook)   
                if(+args[0][0] < +plan_hour) {
                    ShowSetCompleteTime = hocMiddleComponent(ImmediatelyCompleteCook)
                }
            }
            else if(+args[0][1] === +now_minute){
                ShowSetCompleteTime = hocMiddleComponent(ImmediatelyCompleteCook)
            }
            
        }else{   
            if(+args[0][0] < +plan_hour){
                ShowSetCompleteTime = hocMiddleComponent(ImmediatelyCompleteCook)
            }
            else if(+args[0][0] === +plan_hour){ 
                if(+args[0][1] < +plan_minute || +args[0][1] === +plan_minute){
                    ShowSetCompleteTime = hocMiddleComponent(ImmediatelyCompleteCook)
                }else{
                    ShowSetCompleteTime = hocMiddleComponent(TodayCompleteWorkCook)
                }
            }else if(+args[0][0] > +plan_hour){
                ShowSetCompleteTime = hocMiddleComponent(TodayCompleteWorkCook)
            }        
        }
        this.setState({renderComponent:true})//触发render渲染组件
    }; 
    //开始按钮
    startPredictClick(){
        this.setState({showPopup:true})
    }
    //开始预约弹窗提醒确定或取消
    onPress(val){
        this.setState({showPopup:false})
        if(val === '确定'){
            let now_unix = moment(new Date()).unix()
            let plan_unix = moment(this.state.value).unix()
            let _props = this.props
            if(plan_unix < now_unix){//表示明天
                SettingManager.setCook_time(_props.modelNum,_props.set_temp,_props.set_keeptime,plan_unix + 86400000/1000)
            }else{//表示今天
                SettingManager.setCook_time(_props.modelNum,_props.set_temp,_props.set_keeptime,plan_unix)
            }   
        }
    }
    render(){
        return(
            <div className='SetTimePage'>
                <Title 
                TitleTxt={'预约'}
                Main_style={{background: '#EBEBEC',borderBottom: '1px solid #BEBEBE'}}
                BackClick={this.BackClick.bind(this)}
                />
                <main>
                    <div className='show_area'>
                        <p className='show_txt'>你要预约</p>
                        <ShowSetCompleteTime {...this.state} {...this.props} />
                    </div>
                    <div className='set_num'>
                        <DatePickerView
                        mode={'time'}
                        locale={enUs}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                        onValueChange={this.onValueChange.bind(this)}
                        />
                    </div>
                </main>
                <footer onClick={this.startPredictClick.bind(this)} className='SetTimePage_footer'>开始</footer>
                <Popup 
                visible={this.state.showPopup}
                title={'确定开始预约？'}
                popup_style={{height:'3.2rem',margin:'.4rem',width:'92%'}}
                title_style={{padding: '.16rem 0',}}
                buttonNum={2}
                onPress={this.onPress.bind(this)}
                />
            </div>
           

        )
    }
}
