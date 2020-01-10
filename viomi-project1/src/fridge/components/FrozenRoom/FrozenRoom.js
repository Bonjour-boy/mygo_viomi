import React,{Component} from 'react'
import {Grid} from 'antd-mobile'
import Popup from '../../../Components/Popup/Popup'
import Temp from '../../../Components/Temp/Temp'
import Slider from '../../../Components/Slider/Slider'
import ModelAdapter from '../../config/Adapter/ModelAdapter'
// import './FrozenRoom.css'
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
export default class FrozenRoom extends Component{
    constructor(props) {
        super(props)
        this.state = {   
            frozenShowPopup:false,//冷冻室弹窗 
            initTemp:false,//温度设置时，初始温度
            setTemp: null,//最终设定温度
            isfrozenSwitch:true,//冷冻室开关模式
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
    //冷冻室弹窗
    setfrozenrTemp(){
        this.setState({
            frozenShowPopup:true, 
        }) 
    }
    //弹窗点击确定或取消
    
     //冷冻室设置后的温度值
    frozenClick(val){
        this.setState({
            frozenShowPopup:false,
        })
        if(val === '确定'){
            if(!this.state.setTemp){
                SettingManager.setFrozenTemp(this.props.frozenNum)
            }else{
                SettingManager.setFrozenTemp(this.state.setTemp)
            }
        }
    }
    //设置温度值
    setTemp(data){
        this.setState({
            initTemp: true,
            setTemp : data
        })
    }
    //速冻按钮
    speedDongClick(){
        this.props.seedDongBtn()
    }
    render(){
        return(
            <div className={'outgrid'}>
                <div className={'grid3'} >
                    {ModelAdapter.isFSwitchBtn() ? 
                    <div className={'switch'}>
                        <Grid onClick={this.frozenSwitchClick.bind(this)} data={[data[0]]} columnNum={1} hasLine={false} activeStyle={false}/>
                    </div> 
                    : null}
                    {ModelAdapter.isFSetTempBtn() ?
                    <div className={this.state.isfrozenSwitch ? 'isActive':'unActive'}> 
                        <Grid onClick={this.state.isfrozenSwitch ? this.setfrozenrTemp.bind(this):null} data={[data[1]]} columnNum={1} hasLine={false} activeStyle={false}/>
                    </div>
                    :null}
                    {ModelAdapter.isFChangeAreaBtn() ? 
                    <div className={this.state.isfrozenSwitch ? 'isActive':'unActive'}> 
                        <Grid onClick={this.state.isfrozenSwitch ? this.changeAreaClick.bind(this):null} data={[data[2]]} columnNum={1} hasLine={false} activeStyle={false}/>
                    </div>
                    :null}
                    {ModelAdapter.isFSpeedCoolBtn() ? 
                    <div className={this.state.isfrozenSwitch ? 'isActive':'unActive'}> 
                        <Grid onClick={this.state.isfrozenSwitch ? this.speedCoolClick.bind(this):null} data={[data[3]]} columnNum={1} hasLine={false} activeStyle={false}/>
                    </div>
                    :null}
                     {ModelAdapter.isFSpeedDongBtn() ? 
                    <div className={this.state.isfrozenSwitch ? 'isActive':'unActive'}> 
                        <Grid onClick={this.state.isfrozenSwitch ? this.speedDongClick.bind(this):null} data={[data[4]]} columnNum={1} hasLine={false} activeStyle={false}/>
                    </div>
                    :null}
                </div> 
                {/* 冷冻室温度设置弹窗  */}
                {ModelAdapter.isFrozenSetPopup() ?
                    <Popup 
                    visible={this.state.frozenShowPopup}
                    title={'温度设置'}
                    popup_style={{height:'6.933333rem',margin:'.4rem',width:'9.2rem'}}
                    main={
                        <div>
                            <Temp  defaultValue={this.state.initTemp ? this.state.setTemp : this.props.frozenNum}/>
                            <Slider
                            tempMin={ModelAdapter.modelData().setFrozenMin}
                            tempMax={ModelAdapter.modelData().setFrozenMax}
                            defaultValue={this.state.initTemp ? this.state.setTemp : this.props.frozenNum}
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
                    onPress={this.frozenClick.bind(this)}
                    />
                    :null}
            </div>
        )
    }
}