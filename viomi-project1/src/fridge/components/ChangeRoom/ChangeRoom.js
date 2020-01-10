import React,{Component} from 'react'
import {Grid} from 'antd-mobile';
import ModelAdapter from '../../config/Adapter/ModelAdapter'
// import './ChangeRoom.css'
import SwitchImg from '../..//assets/img/switch@2x.png'
import SetTempImg from '../../assets/img/temp@2x.png'
import ChangeTempImg from '../../assets/img/changetempmode@2x.png'
import ASpeedFrozen from '../../assets/img/speedleng@2x.png'
import ASpeedDong from '../../assets/img/speeddong@2x.png'
import Popup from '../../../Components/Popup/Popup'
import Temp from '../../../Components/Temp/Temp'
import Slider from '../../../Components/Slider/Slider'
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
export default class ChangeRoom extends Component{
    constructor(props) {
        super(props);
        this.state = {
            changeShowPopup:false,//变温室弹窗 
            initTemp:false,//温度设置时，初始温度
            setTemp: null,//最终设定温度
            Temp:null,//冷藏室输出温度
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

    //变温室开关模式
    changeSwitchClick(){  
        if(this.props.changSwitch === 'on'){
            SettingManager.setChangeOffSwitch()
        }else{
            SettingManager.setChangeOnSwitch()
        }   
    }
    //变温室温度设置弹窗
    setchangeTemp(){
        this.setState({
            changeShowPopup:true, 
        }) 
    }
    //弹窗点击确定或取消
    
     //变温室设置后的温度值
    changeClick(val){
        this.setState({
            changeShowPopup:false,
        })
        if(val === '确定'){
            if(this.state.setTemp === null){
                SettingManager.setChangeTemp(this.props.changeNum)
            }else{
                SettingManager.setChangeTemp(this.state.setTemp)
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
    render(){
        return(
            <div className={'outgrid'}>
                <div className={'grid3'} >
                    {ModelAdapter.isCCSwitchBtn() ? 
                    <div className={'switch'}>
                        <Grid onClick={this.changeSwitchClick.bind(this)} data={[data[0]]} columnNum={1} hasLine={false} activeStyle={false}/> 
                    </div>
                    : null}
                    {ModelAdapter.isCCSetTempBtn() ?
                    <div className={this.props.changSwitch === 'on' ? 'isActive':'unActive'}> 
                        <Grid onClick={this.props.changSwitch === 'on' ? this.setchangeTemp.bind(this):null}  data={[data[1]]} columnNum={1} hasLine={false} activeStyle={false}/>
                    </div>
                    :null}
                    {ModelAdapter.isCCChangeAreaBtn() ? 
                    <div className={this.props.changSwitch === 'on' ? 'isActive':'unActive'}> 
                        <Grid onClick={this.props.changSwitch === 'on' ? this.changeAreaClick.bind(this):null} data={[data[2]]} columnNum={1} hasLine={false} activeStyle={false}/>
                    </div>
                    :null}
                    {ModelAdapter.isCCSpeedCoolBtn() ? 
                    <div className={this.props.changSwitch === 'on' ? 'isActive':'unActive'}> 
                        <Grid onClick={this.props.changSwitch === 'on' ? this.speedCoolClick.bind(this):null} data={[data[3]]} columnNum={1} hasLine={false} activeStyle={false}/>
                    </div>
                    :null}
                     {ModelAdapter.isCCSpeedDongBtn() ? 
                    <div className={this.props.changSwitch === 'on' ? 'isActive':'unActive'}> 
                        <Grid onClick={this.props.changSwitch === 'on' ? this.speedDongClick.bind(this):null} data={[data[4]]} columnNum={1} hasLine={false} activeStyle={false}/>
                    </div>
                    :null}
                </div> 
                {/* 冷藏室变温区弹窗 */}
                {ModelAdapter.isShowChangeRoomPopup() ?
                    <Popup 
                    visible={this.state.changeShowPopup}
                    title={'温度设置'}
                    popup_style={{height:'6.933333rem',margin:'.4rem',width:'9.2rem'}}
                    main={
                        <div>
                            <Temp  defaultValue={this.state.initTemp ? this.state.setTemp : this.props.changeNum}/>
                            <Slider
                            tempMin={ModelAdapter.modelData().setChangeMin}
                            tempMax={ModelAdapter.modelData().setChangeMax}
                            defaultValue={this.state.initTemp ? this.state.setTemp : this.props.changeNum}
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
                    onPress={this.changeClick.bind(this)}
                    />
                :null
                }
            </div>
        )
    }
}