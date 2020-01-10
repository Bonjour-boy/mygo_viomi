/*
 * @Descripttion: 
 * @version: 
 * @Author: luxianbo
 * @Date: 2019-12-12 16:42:01
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-27 11:28:12
 */
import React, { Component } from 'react';
import './WorkPage.css'
import Popup from '../../../Components/Popup/Popup'
import Complete_img from '../../assets/img/draw@2x.png'
import numeral from '../../../utils/Number/main'
import SettingManager from '../../SettingManager'
import GetDataManager from '../../GetDataManager'
var moment = require('moment');

export default class WorkPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            showPopup:false,//预约开始终止弹窗
            left_time:0,//预约剩余时间（倒计时）
            cook_time:0,//保温时长（计时）
            cancelText:'终止料理',//取消时的文本
            statusTitle_text:'',//料理状态文本（保温中或加热中）
            statusTime_text:'',//保温时长或加热时长
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
    componentDidMount(){
        let json ={}
        if(this.props.work_status === 1){
            let time = this.props.left_time
            if(time){
                this.interval = setInterval(() => {
                    this.setState({left_time : time--})
                    if(time <= 0){
                        time = 0 
                    }
                }, 1000);
            }
            json.cancelText = '取消预约'
        }
        else if(this.props.work_status === 4){
            json.cancelText = '终止保温'
            json.statusTitle_text = '保温中'
            json.statusTime_text = '保温时间'
            let time_add = this.props.cook_time
            this.interval_add = setInterval(() => {
                this.setState({cook_time : time_add++})
            }, 1000);   
        }
        else if((this.props.work_status === 2||this.props.work_status === 3) && this.props.modelNum === 7){
            json.cancelText = '终止加热'
            json.statusTitle_text = '加热中'
            json.statusTime_text = '加热时长'
            let time_add = this.props.cook_time
            this.interval_add = setInterval(() => {
                this.setState({cook_time : time_add++})
            }, 1000); 
        }
        else if(this.props.work_status === 2 && this.props.modelNum === 8){
            let time_add = this.props.cook_time
            this.interval_add = setInterval(() => {
                this.setState({cook_time : time_add++})
            }, 1000); 
        }
        this.setState(json)
    }
   
    componentWillUnmount() {
        this.interval && clearInterval(this.interval);
        this.interval_add && clearInterval(this.interval_add);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.work_status === 0||nextProps.work_status === 5){
            this.props.history.push({
                pathname:'/'
            });
        }
    }
    //获取视图
    getMainView(props) {
        if(props.work_status === 1){//预约中
            return this.Set_timing({...props})
        }
        //热模式料理中
        else if(props.work_status === 2 && (props.modelNum === 1||props.modelNum === 2||props.modelNum === 3||
            props.modelNum === 6||props.modelNum === 9||props.modelNum === 10||props.modelNum === 11)){
            return this.Hot_working({...props})
        }
        //冷模式料理中
        else if(props.work_status === 3 &&(props.modelNum === 4||props.modelNum === 5)){
            return this.Cold_working({...props})
        }
        //保温、加热
        else if((props.work_status === 4||props.work_status === 2||props.work_status===3)&&(props.modelNum === 12||props.modelNum===7)){
            return this.Heating({...props})
        }
        //手动
        else if(props.work_status === 2 && props.modelNum === 8){
            return this.Manual_Working({...props})
        }
        //料理完成
        else if(props.work_status === 7){
            return this.Cold_complete({...props})
        }
    }
    //预约中
    Set_timing(props){
        let now_hour = moment().hour()//现在时间(小时)
        let now_minute = moment().minute()//现在时间(分钟)
        var date = new Date(props.cooked_time * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let plan_hour = date.getHours() ;
        let plan_minute = date.getMinutes(); 
        let time = (plan_hour < 10 ? '0' + plan_hour:plan_hour) + ':'+ (plan_minute < 10 ? '0' + plan_minute:plan_minute)
        let day = ''
        if(plan_hour < now_hour){//明天
            day = GetDataManager.showQuantum_Tomorrow(plan_hour)
        }
        else if(plan_hour === now_hour){
            if(plan_minute < now_minute){
                day = GetDataManager.showQuantum_Tomorrow(plan_hour)
            }else{
                day = GetDataManager.showQuantum_Today(plan_hour)
            }
        }
        else{//今天
            day = GetDataManager.showQuantum_Today(plan_hour)
        }
        return <div className='set_timePage'>
                    <header className='header'>预约中</header>
                    <main className='workPage_main'>
                        <div className='show_max'>
                            <div className='show_img'></div>
                        </div>
                        <div className='text_time'>
                            <p className='max_time'>{numeral(this.state.left_time).format('00:00:00')}</p>
                            <p className='min_time'>{`预计${day + time}完成`}</p>
                        </div>
                    </main>
                    <footer className='workPage_cancel' onClick={this.cancelClick.bind(this)}>取消</footer>
                </div> 
    }
    //热模式料理中
    Hot_working (props){
        return  <div className='workPage'>
                    <header className='header'>料理中</header>
                    <main className='workPage_main'>
                        <div className='show_max'>
                            <div className='show_big'>
                                <dl className='show_background'>
                                    <dt>{GetDataManager.nowModel(props.modelNum)}</dt>
                                    <dd className='time'>{numeral(props.left_time).format('00:00')}</dd>
                                    <dd className='text'>剩余时间</dd>
                                </dl>
                            </div>
                        </div>
                    </main>
                    <footer className='workPage_cancel' onClick={this.cancelClick.bind(this)}>终止</footer>
                </div> 
    }
    //加热中、保温中
    Heating (props){
        return  <div className='workPage'>
                    <header className='header'>{this.state.statusTitle_text}</header>
                    <main className='workPage_main'>
                        <div className='hot_show'>
                            <p className='max_temp'>{this.state.statusTitle_text==='加热中' ? props.curr_tempe:props.temp_data}<span className='min_temp'>℃</span></p>
                        </div>
                        <div className='text_time'>
                            <p className='max_time'>{numeral(this.state.cook_time).format('00:00:00')}</p>
                            <p className='min_time'>{this.state.statusTime_text}</p>
                        </div>
                    </main>
                    <footer className='workPage_cancel' onClick={this.cancelClick.bind(this)}>终止</footer>
                </div> 
    }
    //冷模式料理中
    Cold_working (props){
        return <div className='workPage_cold'>
                    <header className='header'>料理中</header>
                    <main className='workPage_main'>
                        <div className='show_max_cold'>
                            <dl className='show_background'>
                                <dt>{GetDataManager.nowModel(props.modelNum)}</dt>
                                <dd className='time'>{props.left_time}</dd>
                                <dd className='text'>剩余时间(秒)</dd>
                            </dl>
                        </div>
                    </main>
                    <footer className='workPage_cancel' onClick={this.cancelClick.bind(this)}>终止</footer>
                </div> 
    }
    //料理完成时
    Cold_complete (props){
        return <div className={props.modelNum === 4 ||props.modelNum === 5 ? 'workPage_cold':'workPage_hot'}>
                    <header className='header'>已完成料理</header>
                    <main className='workPage_main'>
                        <div className='show_max_complete'>
                            <div className='show_background_complete'>
                                <img className='complete_img' src={Complete_img} />
                            </div>
                        </div>
                    </main>
                    <footer className='workPage_cancel' onClick={this.CompleteClick.bind(this)}>完成</footer>
                </div> 
    }
    //手动料理中
    Manual_Working(props){
        return  <div className='workPage_cold'>
                    <header className='header'>料理中</header>
                    <main className='workPage_main'>
                        <div className='hot_show'>
                            <p className='max_temp'>{props.rev}<span className='min_rev'>转速</span></p>
                        </div>
                        <div className='text_time'>
                            <p className='max_time'>{numeral(this.state.cook_time).format('00:00:00')}</p>
                            <p className='min_time'>工作时间</p>
                        </div>
                    </main>
                    <footer className='workPage_cancel' onClick={this.cancelClick.bind(this)}>终止</footer>
                </div>
    }
    //料理完成后，点击完成按钮
    CompleteClick(){
        SettingManager.CancelCook_time(this.props.modelNum)
        this.props.history.push({
            pathname:'/'
        });
    }
    //取消或终止料理
    cancelClick(){
        this.setState({showPopup:true})
    }
    //弹窗确定和取消按钮
    onPress(val){
        this.setState({showPopup:false}) 
        if(val==='确定'){
            SettingManager.CancelCook_time(this.props.modelNum)
        }
    } 
    render(){
        return(
            <div style={{height:'100%'}}>
                {this.getMainView({...this.props})}
                <Popup 
                visible={this.state.showPopup}
                title={`确定${this.state.cancelText}？`}
                popup_style={{height:'3.2rem',margin:'.4rem',width:'92%'}}
                title_style={{padding: '.16rem 0',}}
                buttonNum={2}
                onPress={this.onPress.bind(this)}
                />
            </div>
        )
    }
}
