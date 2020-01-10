import React,{Component} from 'react'
import './MainPage.css'
import DataManager from '../../request/CommonPropsManager'
import Error from '../ErrorPage/Error'
import RoomPage from '../RoomPage/RoomPage'
import SmartPage from '../SmartPage/SmartPage'
import ErrorTitle from '../../components/ErrorTitle/ErrorTitle'
import GetDataManager from '../../GetDataManager'

export default class Fridge extends Component{
    constructor(props) {
        super(props);
        this.state={
            changeDefaultTemp:null,//变温室默认温度
            changeAreaDefaultTemp:null,//冷藏室变温区默认设置
            coldDefaultTemp:null,//冷藏室默认温度
            afrozenDefaultTemp:null,//冷冻室默认温度
            isIssue:false,//有无故障
            showIssue:false,//是否显示故障
            errorNum:null,//故障数量
            errorText:null,//故障内容
            modelState:null,//标题状态
            nowModel:'none',//现在模式
            coldSwitch:'on',//冷藏室开关
            changSwitch:'on',//变温室开关
            speedCoolModel:null,//速冷模式
            speedFreezeModel:null,//速冻模式 
        }
    }
    //开始轮询
    startPropsLoop() {
        DataManager.startPropsLoop({
            props: ["RCSetTemp","CCSetTemp","FCSetTemp","RCCMode","RCSet","CCSet","SmartCool","SmartFreeze","Mode","Error"],
            interval: 4,
            toObject: true,
            log:true,
            callback: (result) => {
                // console.log("Result:"+JSON.stringify(result));       
                this.setState(GetDataManager.NowModelData(result))
            }
        })
    } 
    componentDidMount(){
        this.startPropsLoop()
    }
    //避免组件无意义渲染
    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
            return true
         } else {
            return false
        }
    }
    //出现故障
    issueClick(){
        this.setState({
            showIssue:true
        })
    }
    //故障返回按钮
    backClick(){
        this.setState({
            showIssue:false
        })
    }
    render(){
        return(
            <div style={{height:'100%'}}>
                {this.state.showIssue ? 
                    <Error 
                    isShowError={this.backClick.bind(this)} 
                    error={this.state.errorText}
                    />
                :  
                    <div className={'app'}>
                        <div className={'top'}>{this.state.nowModel=== 'none' ? '制冷中' : this.state.modelState}</div>
                        {this.state.isIssue ? 
                            <ErrorTitle 
                            issueClick={this.issueClick.bind(this)} 
                            errorNum={this.state.errorNum}
                            />
                        :null
                        }
                        <RoomPage 
                        coldDefaultTemp={this.state.coldDefaultTemp}
                        changeDefaultTemp={this.state.changeDefaultTemp}
                        afrozenDefaultTemp={this.state.afrozenDefaultTemp}
                        changeAreaDefaultTemp={this.state.changeAreaDefaultTemp}
                        coldSwitch={this.state.coldSwitch}
                        speedCoolModel={this.state.speedCoolModel}
                        speedFreezeModel={this.state.speedFreezeModel}
                        changSwitch={this.state.changSwitch}
                        />
                        <SmartPage 
                        nowModel={this.state.nowModel}
                        />              
                    </div>
                }
            </div>
        )
    }
}