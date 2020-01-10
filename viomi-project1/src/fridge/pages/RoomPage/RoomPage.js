import React,{Component} from 'react'
import {Tabs} from 'antd-mobile'
import ModelAdapter from '../../config/Adapter/ModelAdapter'
import './RoomPage.css'
import ColdRoom from '../../components/ColdRoom/ColdRoom'
import ChangeRoom from '../../components/ChangeRoom/ChangeRoom'
import FrozenRoom from '../../components/FrozenRoom/FrozenRoom'
import Freezer from '../../components/Freezer/Freezer'
import Single from '../../components/Single/Single'
import SettingManager from '../../SettingManager'

const tabs3 = [
    { title: '冷藏室' },
    { title: '变温室' },
    { title: '冷冻室' },
  ];
const tabs2 = [
    { title: '冷藏室' },
    { title: '冷冻室' },
  ];
export default class RoomPage extends Component{
    constructor(props) {
        super(props)
        this.state = {   
            freezerTxt:'冷藏室',
            changeAreaTxt:'变温区',
            changeTxt:'变温室',
            frozenTxt:'冷冻室',
            opacity1:1,
            opacity2:.4,
            opacity3:.4,
            coldRoom:true,//是否切换到冷藏室
            frozenRoom:false,//是否切换到冷冻室
            changeRoom:false,//是否切换到变温室
            isSpeedCoolModel:false,//冷藏室速冷模式设置
            setFrozenRoom:false,//冷冻室速冻模式设置
            roomImage:ModelAdapter.modelData().ColdRoomImage,//各个室初始图片
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
    //组件接收新的props执行
    componentWillReceiveProps(props){
        let json = {}
        if(props.speedCoolModel === 'off'){
            json.isSpeedCoolModel = false
        }else{
            json.isSpeedCoolModel = true
        }
        if(props.speedFreezeModel === 'off'){
            json.setFrozenRoom = false 
        }else{
            json.setFrozenRoom = true
        }
        this.setState(json)
    }
    //切换导航
    navClick(tab){
        let json = {}
        if(tab.title === '冷藏室'){
                json.opacity1 = 1
                json.opacity2 = .4
                json.opacity3 = .4
                json.coldRoom = true
                json.frozenRoom = false
                json.changeRoom =false
                json.roomImage = ModelAdapter.modelData().ColdRoomImage

        }else if(tab.title === '变温室'){ 
                json.opacity1 = .4
                json.opacity2 = 1
                json.opacity3 = .4
                json.coldRoom = false
                json.frozenRoom = false
                json.changeRoom = true
                json.roomImage = ModelAdapter.modelData().ChangeRoomImage

        }else if(tab.title === '冷冻室'){
                json.opacity1 = .4
                json.opacity2 = .4
                json.opacity3 = 1
                json.coldRoom = false
                json.changeRoom = false
                json.frozenRoom = true
                json.roomImage = ModelAdapter.modelData().FrozenRoomImage
        }
        this.setState(json)
    }
    //冷冻室速冻模式设置
    setFrozenRoomModel(){
        let json = {}
        if(this.state.setFrozenRoom){
            json.setFrozenRoom = false
            SettingManager.setFrozenOffSpeedCool() 
        }else{
            json.setFrozenRoom = true
            SettingManager.setFrozenOnSpeedCool() 
        } 
        this.setState(json)
    }
    //冷藏室速冷模式设置
    setSpeedCoolClick(){
        let json = {}
        if(this.state.isSpeedCoolModel === false){
            json.isSpeedCoolModel = true
            SettingManager.setColdOnSpeedCool()
        }else{
            json.isSpeedCoolModel = false
            SettingManager.setColdOffSpeedCool()
        }
        this.setState(json)
    }
    render(){
        return(
            <div className = {'main'}>
                <Tabs tabs={ModelAdapter.twoNav() ? tabs2:tabs3} initialPage={0} animated={true} useOnPan={false} 
                    tabBarBackgroundColor={'none'} 
                    tabBarActiveTextColor={'#fff'} 
                    tabBarInactiveTextColor={'#fff'}
                    tabBarUnderlineStyle={{height:4,backgroundColor:'#fff',marginLeft:ModelAdapter.twoNav() ? '15%':'6%'}}
                    tabBarTextStyle={{lineHeight:'0.24rem'}}
                    onTabClick={this.navClick.bind(this)}
                    />
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column'}}>
                            {ModelAdapter.twoNav() ? 
                                null
                            :
                                <div className={'doors'} style={{backgroundImage:`url(${this.state.roomImage})`}}>
                                    {ModelAdapter.topTwoRooms() ? 
                                    <Freezer 
                                    ftemp={this.props.coldSwitch === 'off' ? '--' : this.props.coldDefaultTemp} 
                                    txt ={this.state.freezerTxt} 
                                    ctemp={this.props.changeAreaDefaultTemp === '关闭' ? '--' : this.props.changeAreaDefaultTemp} 
                                    areatxt ={this.state.changeAreaTxt} op={this.state.opacity1}/>
                                    :null} 
                                    {ModelAdapter.isChangeRoom() ?
                                    <Single 
                                    atemp={this.props.changSwitch === 'off' ? '--' : this.props.changeDefaultTemp} 
                                    txt ={this.state.changeTxt} 
                                    op={this.state.opacity2}
                                    width={ModelAdapter.textWidth()} 
                                    marginTop={ModelAdapter.textMarginTop()}
                                    marginBottom={ModelAdapter.textMarginBottom()} 
                                    />
                                    :null}
                                    {ModelAdapter.isFrozenRoom() ? 
                                    <Single 
                                    atemp={this.props.afrozenDefaultTemp} 
                                    txt ={this.state.frozenTxt} 
                                    op={this.state.opacity3}
                                    width={ModelAdapter.textWidth()}
                                    marginTop={ModelAdapter.textMarginTop()}
                                    marginBottom={ModelAdapter.textMarginBottom()}  
                                    addtxt={this.state.setFrozenRoom ? '速冻中':null}/>
                                    :null}
                                </div>
                            }
                            {ModelAdapter.twoNav() ? 
                                <div className={'doors'} style={{backgroundImage:`url(${this.state.roomImage})`}}>
                                    {ModelAdapter.isColdRoom() ? 
                                    <Single 
                                    atemp={this.props.coldSwitch === 'off' ? '--' :this.props.coldDefaultTemp} 
                                    txt ={this.state.freezerTxt}
                                    width={ModelAdapter.textWidth()} 
                                    marginTop={ModelAdapter.textMarginTop()} 
                                    marginBottom={ModelAdapter.textMarginBottom()} 
                                    op={this.state.opacity1} 
                                    addtxt={this.state.isSpeedCoolModel ? '速冷中':null}/>
                                    :null}
                                    {ModelAdapter.isFrozenRoom() ? 
                                    <Single 
                                    atemp={this.props.afrozenDefaultTemp} 
                                    txt ={this.state.frozenTxt} 
                                    op={this.state.opacity3}
                                    width={ModelAdapter.textWidth()} 
                                    marginTop={ModelAdapter.textMarginTop()} 
                                    marginBottom={ModelAdapter.textMarginBottom()} 
                                    addtxt={this.state.setFrozenRoom ? '速冻中':null}/>
                                    :null}
                                </div>
                            :
                                null
                            }
                            {this.state.coldRoom ?
                            //冷藏室按钮
                            <ColdRoom 
                            freezerNum={this.props.coldDefaultTemp} 
                            changeAreaNum={this.props.changeAreaDefaultTemp}
                            setSpeedCool={this.setSpeedCoolClick.bind(this)}
                            coldSwitch={this.props.coldSwitch}
                            />
                            :null
                            }
                            {this.state.changeRoom ?
                            //变温室按钮
                            <ChangeRoom 
                            changeNum={this.props.changeDefaultTemp}
                            changSwitch={this.props.changSwitch}
                            />
                            :null
                            }
                            {this.state.frozenRoom ?
                            //冷冻室按钮
                            <FrozenRoom 
                            frozenNum={this.props.afrozenDefaultTemp} 
                            seedDongBtn={this.setFrozenRoomModel.bind(this)}
                            />
                            :null
                            }
                            
                        </div>
                    </div>
            </div>
        )
    }
}