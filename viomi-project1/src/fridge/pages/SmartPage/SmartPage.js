import React,{Component} from 'react'
import './SmartPage.css'
import ModelAdapter from '../../config/Adapter/ModelAdapter'
import Controlmodel from '../../../Components/Controlmodel/Controlmodel'
import SmartImg from '../../assets/img/smart@2x.png'
import activeSmartImg from '../../assets/img/activesmart@2x.png'
import HolidayImg from '../../assets/img/holiday@2x.png'
import activeHolidayImg from '../../assets/img/activeholiday@2x.png'
import SettingManager from '../../SettingManager'
export default class SmartPage extends Component{
    constructor(props) {
        super(props)
        this.state = {   
            activeSmart:false,//是否智能模式
            activeHoliday:false,//是否假日模式 
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
        if(props.nowModel === 'smart'){
            json.activeSmart = true
            json.activeHoliday = false
        }else if(props.nowModel === 'holiday'){
            json.activeHoliday = true
            json.activeSmart = false
        }else if(props.nowModel === 'none'){
            json.activeHoliday = false
            json.activeSmart = false
        }
        this.setState(json)
    }
    //智能模式
    smarClick(){
        this.setState({
            activeHoliday:false,
            activeSmart:true,
        })
        SettingManager.setOnSmartModel()
    }
    //假日模式
    holidayClick(){
        this.setState({
            activeHoliday:true,
            activeSmart:false,
        })
        SettingManager.setOnHolidayModel()
    }
    render(){
        return(
            <div>
                {/* 智能假日模式切换 */}
                <div className={'footer'}>
                    <div className={'modes'}>
                        {ModelAdapter.isSmartModel() ? 
                        <Controlmodel onClick={this.smarClick.bind(this)} 
                        image={this.state.activeSmart ? activeSmartImg:SmartImg}
                        Txt={'智能模式'}
                        />
                        :null}
                        {ModelAdapter.isHolidayModel() ?
                        <Controlmodel onClick={this.holidayClick.bind(this)} 
                        image={this.state.activeHoliday ? activeHolidayImg:HolidayImg}
                        Txt={'假日模式'}
                        />
                        :null}
                    </div>
                </div>
            </div>
        )
    }
}