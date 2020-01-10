import React,{Component} from 'react'
import {Grid} from 'antd-mobile'
import Popup from '../../../Components/Popup/Popup'
import Item from '../../../Components/Item/Item'
import Temp from '../../../Components/Temp/Temp'
import Slider from '../../../Components/Slider/Slider'
import ModelAdapter from '../../config/Adapter/ModelAdapter'
// import './ColdRoom.css'
import SwitchImg from '../..//assets/img/switch@2x.png'
import SetTempImg from '../../assets/img/temp@2x.png'
import ChangeTempImg from '../../assets/img/changetempmode@2x.png'
import ASpeedFrozen from '../../assets/img/speedleng@2x.png'
import ASpeedDong from '../../assets/img/speeddong@2x.png'
import SettingManager from '../../SettingManager'
const data =[
    {
        text:'关闭',
        icon:SwitchImg
    },
    {
        text:'温度设置',
        icon:SetTempImg
    },
    {
        text:'变温区模式',
        icon:ChangeTempImg
    },
    {
        text:'速冷模式',
        icon:ASpeedFrozen
    },
    {
        text:'速冻模式',
        icon:ASpeedDong
    }
]
export default class ColdRoom extends Component{
    constructor(props) {
        super(props)
        this.state = {   
            ItemData:['鲜果5℃','保鲜0℃','冰镇-1℃'],
            changePopup:false,//变温区模式弹窗
            coldShowPopup:false,//冷藏室温度设置弹窗
            initTemp:false,//温度设置时，初始温度
            setTemp: null,//最终设定温度
            Temp:null,//冷藏室变温区输出温度
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
    //冷藏室开关模式
    freezerSwitchClick(){  
        if(this.props.coldSwitch === 'on'){
            SettingManager.setColdOffSwitch()//关闭冷藏室时变温区也会自动关闭
        }else{
            SettingManager.setColdOnSwitch()
            if(ModelAdapter.topTwoRooms()){
                SettingManager.setColdChangeAreaTemp(2)//打开冷藏室变温区
            } 
        }  
    }
    //冷藏室温度设置弹窗 
    setFreezerTemp(){
        this.setState({
            coldShowPopup:true,
        })           
    }
    //冷藏室变温区初始选项
    Items(items){
        if(this.props.changeAreaNum === 5){
            items[0].style.color = '#28BECA'
        }else if(this.props.changeAreaNum === 0){
            items[1].style.color = '#28BECA'
        }else if(this.props.changeAreaNum === -1){
            items[2].style.color = '#28BECA'
        }
    }
    //冷藏室变温区模式弹窗 
    changeAreaClick(){
        this.setState({
            changePopup:true,
        })  
    }
    //弹窗点击确定或取消
    
    //冷藏室变温区模式点击
    changeOnPress(val){
        this.setState({
            changePopup:false,
        })
        if(val === '确定'){
            SettingManager.setColdChangeAreaTemp(this.state.Temp)
        }
    }
    //冷藏室设置后的温度值
    coldClck(val){
        this.setState({
            coldShowPopup:false,
        })
        if(val === '确定'){
            if(!this.state.setTemp){
                SettingManager.setColdTemp(this.props.freezerNum)
            }else{
                SettingManager.setColdTemp(this.state.setTemp)
            } 
        }
    }
    //变温区模式选择
    itemClick(val){
        let json ={}
        if(val === 0) {
            json.Temp = 1  
        }else if(val === 1){   
            json.Temp = 2
        }else if(val === 2){
            json.Temp = 3
        }
        this.setState(json)
    }
    //设置温度值
    setTemp(data){
        this.setState({
            initTemp: true,
            setTemp : data
        })
    }
    //速冷按钮
    speedCoolClick(){
        this.props.setSpeedCool()
    }
    render(){
        return(
            <div className={'outgrid'}>
                <div className={'grid3'} >
                    {ModelAdapter.isCSwitchBtn() ? 
                    <div className={'switch'}>
                        <Grid onClick={this.freezerSwitchClick.bind(this)} data={[data[0]]} columnNum={1} hasLine={false} activeStyle={false}/> 
                    </div>
                    : null}
                    {ModelAdapter.isCSetTempBtn() ?
                    <div className={this.props.coldSwitch === 'on' ? 'isActive':'unActive'}> 
                        <Grid onClick={this.props.coldSwitch === 'on' ? this.setFreezerTemp.bind(this):null}  data={[data[1]]} columnNum={1} hasLine={false} activeStyle={false}/>
                    </div>
                    :null}
                    {ModelAdapter.isCChangeAreaBtn() ? 
                    <div className={this.props.coldSwitch === 'on' ? 'isActive':'unActive'}> 
                        <Grid onClick={this.props.coldSwitch === 'on' ? this.changeAreaClick.bind(this):null} data={[data[2]]} columnNum={1} hasLine={false} activeStyle={false}/>
                    </div>
                    :null}
                    {ModelAdapter.isCSpeedCoolBtn() ? 
                    <div className={this.props.coldSwitch === 'on' ? 'isActive':'unActive'}> 
                        <Grid onClick={this.props.coldSwitch === 'on' ? this.speedCoolClick.bind(this):null} data={[data[3]]} columnNum={1} hasLine={false} activeStyle={false}/>
                    </div>
                    :null}
                     {ModelAdapter.isCSpeedDongBtn() ? 
                    <div className={this.props.coldSwitch === 'on' ? 'isActive':'unActive'}> 
                        <Grid onClick={this.props.coldSwitch === 'on' ? this.speedDongClick.bind(this):null} data={[data[4]]} columnNum={1} hasLine={false} activeStyle={false}/>
                    </div>
                    :null}
                </div> 
                {/* 冷藏室变温区模式弹窗  */}
                {ModelAdapter.isShowChangeAreaPopup() ? 
                    <Popup 
                    visible={this.state.changePopup}
                    title={'变温区模式'}
                    popup_style={{height:'7.36rem',margin:'.4rem',width:'9.2rem'}}
                    main={
                        <Item 
                        Items={this.Items.bind(this)} 
                        ItemData={this.state.ItemData} 
                        itemClick = {this.itemClick.bind(this)} 
                        item_style={{marginTop:'.6rem'}}
                        unActiveColor={'#666'}
                        activeColor={'#28BECA'}
                        />
                    }
                    buttonNum={2}
                    onPress={this.changeOnPress.bind(this)}
                    />
                :null}
                {/* 冷藏室温度设置弹窗  */}
                {ModelAdapter.isShowColdSetPopup() ? 
                    <Popup 
                    visible={this.state.coldShowPopup}
                    title={'温度设置'}
                    popup_style={{height:'6.933333rem',margin:'.4rem',width:'9.2rem'}}
                    main={
                        <div>
                            <Temp  defaultValue={this.state.initTemp ? this.state.setTemp : this.props.freezerNum}/>
                            <Slider
                            tempMin={ModelAdapter.modelData().setFreezerMin}
                            tempMax={ModelAdapter.modelData().setFreezerMax}
                            defaultValue={this.state.initTemp ? this.state.setTemp : 5}
                            setData={this.setTemp.bind(this)}
                            range={true}
                            trackStyle={{
                                height: '1.066667rem',
                                borderRadius: '1.066667rem',
                                backgroundColor: '#29c7ca',
                                paddingLeft: '.8rem',
                            }}
                            handleStyle={{
                                width: '1.066667rem',
                                height: '1.066667rem',
                                marginTop: 0,
                                marginLeft: 0,
                                zIndex: 1
                            }}
                            railStyle={{
                                height: '1.066667rem',
                                borderRadius: '1.066667rem',
                                width: '7.466667rem',
                              }}
                            />
                        </div>
                    }
                    buttonNum={2}
                    onPress={this.coldClck.bind(this)}
                    /> 
                    :null}
            </div>
        )
    }
}