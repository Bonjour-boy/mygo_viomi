import React,{Component} from 'react'
import {Toast,DatePickerView} from 'antd-mobile';
import './DetailPage.css'
import Title from '../../../Components/Title/Title'
import Slider from '../../../Components/Slider/Slider'
import Popup from '../../../Components/Popup/Popup'
import ModelAdapter from '../../config/Adapter/ModelAdapter'
import SettingManager from '../../SettingManager'
import GetDataManager from '../../GetDataManager'
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';
var moment = require('moment');

export default class DetailPage extends Component{
    constructor(props) {
        super(props);
        let arr = this.props.match.params[0].split('&')
        let arr1 = []
        let json = {}
        arr.map((item)=>{
            arr1.push(item.split('=')) 
        })
        arr1.map((k)=>{
            json[k[0]] = k[1]
        }) 
        this.key = Number(json.id)
        this.DataTimer = json.cook_time
        this.KeepTimer = Number(json.keepTemp_time)
        ModelAdapter.recipeData().map((item)=>{
            item.item.map((k)=>{
                if(k.key === this.key){
                  this.RecipeData = k
                  this.defaultValue = this.RecipeData.cookerTime/60
                  this.Steps = this.RecipeData.Steps.split('&')
                }
            })
        })
        this.setTime = GetDataManager.AddTimer_m(this.RecipeData.cookerTime)//计划烹饪时间
        this.state={
            CookingTimer:this.RecipeData.cookerTime,//预约设定时间
            isSetCookTimer:false,//是否设定烹饪时间
            KeepTimer:12,//默认保温时间
            visible:false,//预约弹窗
            value: new Date(),//当前选中时间（组件）
            titleTimer:null,//弹窗标题时间
            isShowCooking_before:false,//时间是否早于现在
            isShowCooking_after:false,//时间是否晚于现在
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
    componentWillReceiveProps (nextProps) {
        if(nextProps.status === 1 || nextProps.status === 2){
            this.props.history.push({
                pathname:'/cooking' + 'id=' + nextProps.modelNum + '&' + 'cook_time=' + nextProps.cookTimer1 
            }); 
        }
        else if(nextProps.status === 3){
            this.props.history.push({
                pathname:'/cooking' + 'id=' + nextProps.modelNum + '&' + 'cook_time=' + GetDataManager.setPlanCooker_time1 (nextProps.cook_start) 
            }); 
        } 
    };
    //返回
    BackClick(){
        history.back()
    }
    //点击全部食谱
    RightClick(){
        if(this.DataTimer === undefined){
            this.props.history.push({
                pathname:'/recipe' 
            });
        }else{
            this.props.history.push({
                pathname:'/recipe' + 'id=' + this.key + '&' + 'cook_time=' + this.DataTimer + '&' + 'keepTemp_time=' + this.KeepTimer 
            });
        }    
    }
    //有设定烹饪时间
    Cooking(val){
        this.setState({
            CookingTimer:val,
            isSetCookTimer:true
        })
    }
    //设定保温时间
    KeepTemp(val){
        this.setState({
            KeepTimer:val,
        })
    }
    //有预约按钮，点击触发
    SetTimerClick(){
        this.setState({
            visible: true,
        })
    }
    //点击弹窗预约或取消
    onPress(val){  
        let json = {} 
        let now_hour = moment().hour()//现在时间(小时)
        let now_minute = moment().minute()//现在时间(小时)
        json.visible = false

        if(val === '预约'){
            if(this.state.titleTimer){
                let set = this.state.titleTimer.split(':')
                let set_h = Number(set[0])//预约设置完成时间(小时)
                let set_m = Number(set[1])//预约设置完成时间(分钟)
                let plan = this.setTime.split(':')
                let plan_h = Number(plan[0])//计划完成时间(小时)
                let plan_m = Number(plan[1])//计划完成时间(分钟)
                if(set_h < now_hour){
                    let cook_startTime = GetDataManager.hm_BeforeTimer(set_h,set_m)
                    SettingManager.setRecipeSet_TimeCooker(this.key,this.state.CookingTimer*60,this.state.KeepTimer*3600,cook_startTime,this.RecipeData.parameter)
                }
                else if(set_h === now_hour){
                    if(set_m < now_minute){
                        let cook_startTime = GetDataManager.hm_BeforeTimer(set_h,set_m)
                        SettingManager.setRecipeSet_TimeCooker(this.key,this.state.CookingTimer*60,this.state.KeepTimer*3600,cook_startTime,this.RecipeData.parameter)
                    }else{
                        SettingManager.setStartRecipeCooker(this.key,this.state.CookingTimer*60,this.state.KeepTimer*3600,this.RecipeData.parameter)
                    }   
                }
                else if(set_h > now_hour){
                    if(set_h < plan_h){
                        SettingManager.setStartRecipeCooker(this.key,this.state.CookingTimer*60,this.state.KeepTimer*3600,this.RecipeData.parameter)
                    }
                    else if(set_h === plan_h){
                        if(set_m === plan_m || set_m < plan_m){
                            SettingManager.setStartRecipeCooker(this.key,this.state.CookingTimer*60,this.state.KeepTimer*3600,this.RecipeData.parameter)
                        }else{
                            let res = (set_m - plan_m)*60
                            SettingManager.setRecipeSet_TimeCooker(this.key,this.state.CookingTimer*60,this.state.KeepTimer*3600,res+this.state.CookingTimer*60,this.RecipeData.parameter)
                        }
                    }
                    else if (set_h > plan_h){
                        let cook_startTime = GetDataManager.hm_AfterTimer(set_h,set_m)
                        SettingManager.setRecipeSet_TimeCooker(this.key,this.state.CookingTimer*60,this.state.KeepTimer*3600,cook_startTime,this.RecipeData.parameter)
                    }
                }
            }else{
                SettingManager.setStartRecipeCooker(this.key,this.state.CookingTimer*60,this.state.KeepTimer*3600,this.RecipeData.parameter)          
            }
            Toast.success('预约成功', 2);
        }
        this.setState(json)
    }
    //预约改变时间
    onChange(value){
        this.setState({ value });
    };
    //预约弹窗选择的时间段
    onValueChange(...args){
        this.setState(GetDataManager.setPopup_time(this.setTime,args))
    };
    //点击开始菜单烹饪
    CookingClick(){
        let CookingTimer = this.state.CookingTimer*60
        if(this.state.isSetCookTimer){//设定烹饪时间
            SettingManager.setStartRecipeCooker(this.key,CookingTimer*60,this.state.KeepTimer*3600,this.RecipeData.parameter)
        }else{
            SettingManager.setStartRecipeCooker(this.key,this.state.CookingTimer*60,this.state.KeepTimer*3600,this.RecipeData.parameter)
        } 
    }
    render(){
        return(
            <div className='detail_app'>
                <Title 
                BackClick={this.BackClick.bind(this)}
                TitleTxt={this.RecipeData.title}
                rightTxt={'全部食谱'}
                rightStyle={{float:'right',fontSize: '.373333rem',color:'#28BECA'}}
                RightClick={this.RightClick.bind(this)}
                />
                <main className='detail_M'>
                    <div className='detail_mian'>
                        <img className='detail_img' src={this.RecipeData.img} />
                        {this.RecipeData.isSet ? 
                            <div>
                                <div className='detail_time'>烹饪时间（建议{this.RecipeData.cookerTime}分钟）</div>
                                <Slider 
                                tempMin={this.RecipeData.min}
                                tempMax={this.RecipeData.max}
                                defaultValue={this.defaultValue}
                                setData={this.Cooking.bind(this)}
                                step={0.5}
                                trackStyle={GetDataManager.trackStyle()}
                                handleStyle={GetDataManager.handleStyle()}
                                railStyle={GetDataManager.railStyle()}
                                />
                            </div>
                        :null}
                        <div>
                            <div className='detail_time'>保温时长（默认12小时）</div>
                            <Slider 
                            tempMin={0}
                            tempMax={12}
                            defaultValue={this.state.KeepTimer}
                            cookingTimer={this.state.isSetCookTimer ? this.state.CookingTimer : this.defaultValue}
                            KeepTimer={this.state.KeepTimer}
                            setData={this.KeepTemp.bind(this)}
                            step={0.5}
                            trackStyle={GetDataManager.trackStyle()}
                            handleStyle={GetDataManager.handleStyle()}
                            railStyle={GetDataManager.railStyle()}
                            />
                        </div>
                    </div>
                        <div className='blank'>{this.RecipeData.title}{this.RecipeData.isSet ? null : `（预计${this.RecipeData.cookerTime}分钟）`}</div>
                    <div className='method'>
                        <p className='method_title'>做法：</p>
                        {this.RecipeData.Steps ? 
                            <p className='method_text'>
                                {this.Steps.map((item,index)=>{
                                    return <span key={index}>{item}<br/></span>
                                })}
                            </p>
                        :null}
                    </div>
                </main>
                <footer className='detail_footer'>
                    {this.props.cookTimer1 ? 
                    <div className='working'>{this.RecipeData.isSet ? (this.props.cook_start ? '预约烹饪中':'电饭煲烹饪中'):'电饭煲烹饪中'}</div>
                    :
                    (this.RecipeData.isSet ? 
                        <div>
                            <div className='setTimer' onClick={this.SetTimerClick.bind(this)}>预约</div>
                            <div className='startcooker' onClick={this.CookingClick.bind(this)}>开始菜谱烹饪</div>
                        </div>
                    :
                        <div className='working' style={{background:'rgba(40,190,202,1)'}} onClick={this.CookingClick.bind(this)}>开始菜谱烹饪</div>
                    )
                    }   
                </footer>
                <Popup
                    visible={this.state.visible}
                    popup_style={{height:'9.253333rem'}}
                    title={`预约 ${this.RecipeData.title}`}
                    subTitle={this.state.isShowCooking_before ? `将于明天${this.state.titleTimer}完成烹饪`:`将于今天${this.state.isShowCooking_after ? this.state.titleTimer:this.setTime}完成烹饪`} 
                    childTitle={this.state.isShowCooking_after||this.state.isShowCooking_before===true ? null:'立即烹饪'}
                    main={
                        <DatePickerView
                        mode={'time'}
                        locale={enUs}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                        onValueChange={this.onValueChange.bind(this)}
                        />
                    }
                    buttonNum={2}
                    button_style={{lineHeight:'.88rem',background:'rgba(250,250,250,1)'}}
                    set_time={'预约'}
                    onPress={this.onPress.bind(this)}
                />  
            </div>
        )
    }
}
