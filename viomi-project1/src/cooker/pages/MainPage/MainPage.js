import React,{Component} from 'react'
import {Tabs,DatePickerView,Icon} from 'antd-mobile';
import './MainPage.css'
import ModelAdapter from '../../config/Adapter/ModelAdapter'
import Button from '../../components/Button/Button'
import Slider from '../../../Components/Slider/Slider'
import Popup from '../../../Components/Popup/Popup'
import ShowError from '../../../Components/ShowError/ShowError'
import Rectangle from '../../../Components/Rectangle/Rectangle'
import HomeMain from '../../components/HomeMain/HomeMain'
import TimerImg from '../../assets/img/cooktype/icon_cooker_primary@2x.png'
import Power from '../../assets/img/power@2x.png'
import rectangle_img from '../../assets/img/rectangle_img@2x.png'
import a_rectangle_img from '../../assets/img/a_rectangle_img@2x.png'
import SettingManager from '../../SettingManager'
import GetDataManager from '../../GetDataManager'
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';

const tabs = [
    { title: '精煮饭'},
    { title: '超快煮'},
    { title: '保温'},
];
export default class MainPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            navModel:['精煮饭','超快煮','保温'],
            setModel:null,//点击导航设置模式时
            defaultTimer:45,//精煮、快煮时间
            keepTempTimer:12,//默认保温时间
            isKeepTemp:false,//是否是保温
            isShowError:false,//是否显示故障
            index:null,//导航index
            isok:false,//是否点击导航

            titleTimer:null,//弹窗标题时间
            visible: false,//是否显示弹窗
            value: new Date(),//当前选中时间（组件）
            isShowCooking_before:false,//时间是否早于现在
            isShowCooking_after:false,//时间是否晚于现在
            Mi_img:false,
        }
    }  
    //如果在烹饪中，首次进入跳转传参 
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
        //获取食谱数据
        ModelAdapter.recipeData().map((item)=>{
            item.item.map((k)=>{
                if(nextProps.modelNum === k.key){
                    this.modelkey = k.key
                    this.cookerTimer = k.cookerTime
                    this.RecipeData = k
                }   
            })
        }) 
    };
    //避免组件无意义渲染
    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
            return true
         } else {
            return false
        }
    }
    //设定Slider的滑块里的时间
    setData(val){
        let slider = document.getElementsByClassName('am-slider-handle') 
        slider[0].innerHTML = val  
        this.setState({
            keepTempTimer:val
        })
    }
    //点击导航
    onTabClick(data,index){
        let json = {}
        json.setModel=data.title 
        json.index = index
        json.isok = true
        if(data.title === this.state.navModel[2]){
            json.isKeepTemp = true
        }else{
            json.isKeepTemp = false
            if(data.title === this.state.navModel[0]){
                json.defaultTimer = 45
            }else if(data.title === this.state.navModel[1]){
                json.defaultTimer = 40
            }
        }
        this.setState(json)
    }
    //进入食谱总页面
    RecipeClick(){
        this.props.history.push("/recipe");
    } 
    //点击开始按钮
    StartClick(){
        if(this.state.isok){
            if(this.state.setModel === this.state.navModel[2]){
                SettingManager.setKeepTemp_time(6,this.state.keepTempTimer*3600)
            }else{
                if(this.state.setModel === this.state.navModel[1]){
                    SettingManager.setStartCooker(1,0,this.state.keepTempTimer*3600)
                }
                else if(this.state.setModel === this.state.navModel[0]){
                    SettingManager.setStartCooker(0,0,this.state.keepTempTimer*3600)
                }
            }
        }else{
            if(this.props.model === this.state.navModel[2]){
                SettingManager.setKeepTemp_time(6,this.state.keepTempTimer*3600)     
            }else{
                SettingManager.setStartCooker(this.modelkey,this.cookerTimer*60,this.state.keepTempTimer*3600)
            }
        }    
    }
    //设备故障
    ErrorClick(){
        this.props.history.push({
            pathname:'/error'
        });
    }
    //预约改变时间
    onChange(value){
        this.setState({ value });
    };
    //预约弹窗选择的时间段
    onValueChange(...args){ 
        this.setState(GetDataManager.setPopup_time(this.setTime,args))
    };
    //点击预约按钮
    SetTimerClick(){
        this.setTime = GetDataManager.AddTimer_m(this.RecipeData.cookerTime)//计划烹饪时间
        this.setState({
            visible:true
        })
    }
    //弹窗取消或预约按钮
    onPress(val){
        this.setState({
            visible:false
        }) 
    }
    //米种选择
    Mi_Click(index,e,ref){
        GetDataManager.Mi_ActiveButton(e,ref)
        this.setState({
            Mi_img:!this.state.Mi_img
        })
        if(index === 0){
            console.log('丝苗米');
        }else{
            console.log('五常大米');
        }
    }
    //口感选择
    Taste_Click(index,e,ref){
        GetDataManager.Taste_ActiveButton(e,ref)
        if(index === 0){
            console.log('软糯香口');
        }
        else if(index === 1){
            console.log('软硬适中');
        }
        else if(index === 2){
            console.log('劲道Q弹');
        }
    }
    
    render(){
        return(
            <div className='HomePage'>
                <header className='indextitle'>{this.props.status === null ? '加载中...' : SettingManager.setStatus()[this.props.status]}</header>
                {this.props.errorTxt ? 
                    <ShowError ErrorClick={this.ErrorClick.bind(this)} errorTxt={this.props.errorNum === 1 ? `故障代码${this.props.errorTxt}`:`${this.props.errorNum}个故障`} />
                :
                    null
                }
                <HomeMain 
                nowModel={this.props.status === null ? this.state.navModel[0] : (this.state.setModel ? this.state.setModel:this.props.model)}
                planTimer={this.state.isKeepTemp ? `保温${this.state.keepTempTimer}小时`:`预计${this.props.status === null ? 45 :(this.state.setModel ? this.state.defaultTimer:this.props.cookTimer)}分钟`}
                />
                <footer className={'footer'}>
                    <div className={'recipe'} onClick={this.props.status === null ? null : this.RecipeClick.bind(this)}>
                        <span className={'retxt'}>食谱</span>
                        <Icon type="right" size={"xs"} color={'#999'}/>
                    </div>
                    {this.props.status === null ? 
                        <Tabs tabs={tabs} 
                        tabBarActiveTextColor={'#000'}
                        tabBarInactiveTextColor={'#999'}
                        page={0}
                        />
                    :
                        <Tabs tabs={tabs} 
                            tabBarActiveTextColor={(this.state.setModel === null)&&((this.props.model !=this.state.navModel[0])&&(this.props.model !=this.state.navModel[1])&&(this.props.model !=this.state.navModel[2])) ?'#999':'#000'}
                            tabBarInactiveTextColor={'#999'}
                            tabBarUnderlineStyle={{display:(this.state.setModel === null)&&((this.props.model !=this.state.navModel[0])&&(this.props.model !=this.state.navModel[1])&&(this.props.model !=this.state.navModel[2])) ? 'none':null}}
                            onTabClick={this.onTabClick.bind(this)}
                            renderTabBar={(props) =>
                                {
                                 if(this.props.modelNum === 6){
                                    return  <Tabs.DefaultTabBar 
                                        {...props}
                                        activeTab = {this.state.setModel ? this.state.index:2} 
                                        >
                                        </Tabs.DefaultTabBar> 
                                    }else{
                                    return  <Tabs.DefaultTabBar 
                                        {...props}
                                        activeTab = {this.state.setModel ? this.state.index:this.props.modelNum} 
                                        >
                                    </Tabs.DefaultTabBar>
                                    }
                                }
                            }
                        /> 
                    }
                    <div className={'baowen'}>保温时长（默认12小时）</div>
                    <Slider 
                    tempMin={0}
                    tempMax={12}
                    defaultValue={this.state.keepTempTimer}
                    setData={this.setData.bind(this)}
                    KeepTimer={this.state.keepTempTimer}
                    step={0.5}
                    trackStyle={GetDataManager.trackStyle()}
                    handleStyle={GetDataManager.handleStyle()}
                    railStyle={GetDataManager.railStyle()}
                    disabled={this.props.status === null ? true : false}
                    />
                    {ModelAdapter.showMi_choice() ?
                        <div className='mi_choice'>
                            <div className='mi_txt'>米种选择</div>
                            <Rectangle onClick={this.Mi_Click.bind(this,0)} img={this.state.Mi_img ? a_rectangle_img:rectangle_img} text={'丝苗米'} style={{float: 'left',marginRight:'.213333rem',background:'#F0F2F5',width:'4.346667rem'}}/>
                            <Rectangle onClick={this.Mi_Click.bind(this,1)} img={this.state.Mi_img ? rectangle_img:a_rectangle_img} text={'五常大米'} style={{float: 'left',color:'#999',width:'4.346667rem'}}/>
                        </div>
                    :null
                    }
                    {ModelAdapter.showPalate_choice() ?
                        <div className='mi_choice'>
                            <div className='mi_txt'>口感选择</div>
                            <Rectangle onClick={this.Taste_Click.bind(this,0)} text={'软糯香口'} style={{float: 'left',marginRight:'.266667rem',background:'#F0F2F5',width:'2.8rem'}}/>
                            <Rectangle onClick={this.Taste_Click.bind(this,1)} text={'软硬适中'} style={{float: 'left',color:'#999', marginRight:'.266667rem',width:'2.8rem'}}/>
                            <Rectangle onClick={this.Taste_Click.bind(this,2)} text={'劲道Q弹'} style={{float: 'left',color:'#999',width:'2.8rem'}}/>
                        </div>
                    :null
                    }
                    {ModelAdapter.isOnlyOneBtn() ? 
                        <p className={'start'} onClick={this.props.status === null ? null : this.StartClick.bind(this)} style={{background:this.props.status === null ? '#c7c7c7':'#FF8C27',width:'8.933333rem',margin:'.72rem .533333rem .373333rem'}}>
                            <img className={'timerimg'} src={Power} />
                            <span className={'timeTxt'}>开始</span>
                        </p>
                    :null
                    }
                    {ModelAdapter.isSetTimerBtn() ? 
                        <div className={'button_end'}>
                        <Button 
                        firstClick={this.SetTimerClick.bind(this)}
                        secondClick={this.StartClick.bind(this)}
                        first_icon={TimerImg}
                        second_icon={Power}
                        first_Txt={'预约'}
                        second_Txt={'开始'}
                        first_background={'#3C3C3C'}
                        second_background={'#FF8C27'}
                        />
                        </div>
                    :null}
                </footer>
                {ModelAdapter.isSetTimerPopup() ? 
                <Popup
                    visible={this.state.visible}
                    popup_style={{height:'9.253333rem'}}
                    title={`预约 ${this.state.setModel ? this.state.setModel:this.props.model}`}
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
                :null}
            </div>
        )
    }
}