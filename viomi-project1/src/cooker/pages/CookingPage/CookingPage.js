import React, { Component } from 'react'
import './CookingPage.css'
import Button from '../../components/Button/Button'
import Popup from '../../../Components/Popup/Popup'
import Main from '../../components/Main/Main'
import SettingManager from '../../SettingManager'
import CookingImg from '../../assets/img/cooktype/icon_cooker_cooking@2x.png'
import Power from '../../assets/img/power@2x.png'
import Caipu from '../../assets/img/caipu@2x.png'
import GetDataManager from '../../GetDataManager'
import numeral from '../../../utils/Number/main'
import ModelAdapter from '../../config/Adapter/ModelAdapter'

export default class CookingPage extends Component {
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
                }
            })
        })
        this.setTime = GetDataManager.AddTimer_m(this.RecipeData.cookerTime)
        this.state = {
            visible: false,//弹窗
            isShowCooking_before:false,//是否预约明天烹饪
        }
    } 
    async componentDidMount(){
        if(await this.props.status === 3){
            this.setState(GetDataManager.setTimePageShowLeft_time(this.DataTimer,this.setTime)) 
        }
        else if(await this.props.status === 0){
            this.props.history.push({
                pathname:'/' 
            });
        }
    }
    //停止工作时返回首页
    componentWillReceiveProps(nextProps){
        if(nextProps.status === 0){
            this.props.history.push({
                pathname:'/' 
            });
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
    //点击菜谱
    RecipeClick() {
        this.props.history.push({
            pathname:'/detail' + 'id=' + this.key + '&' + 'cook_time=' + this.DataTimer + '&' + 'keepTemp_time=' + this.KeepTimer 
        });
    }
    //点击停止烹饪
    StopClick() {
        this.setState({
            visible: true,
        })
    }
    //弹窗确定或取消
    onPress(val) {
        this.setState({
            visible: false,
        })
        if (val === '确定') {
            SettingManager.setStopCooker(this.props.modelNum)
            this.props.history.push({
                pathname:'/'
            });
        }
    }
    render() {
        return (
            <div className='SetTimgPage_app'>
                {this.props.status === 1 ?
                <header className='SetTimgPage_title'>烹饪中</header>
                :null}
                {this.props.status === 3 ?
                <header className='SetTimgPage_title'>预约中</header>
                :null}
                {this.props.status === 2 ?
                 <header className='SetTimgPage_title'>保温中</header>
                :null}
                {this.props.status === 1 ?
                <Main
                    modelName={this.RecipeData.title}
                    setTime={`剩余${numeral(this.props.left_time ? this.props.left_time:this.DataTimer*60).format('00:00 ceil')}`}
                    main_img={CookingImg}
                    // keepTimer={this.KeepTimer}
                />:null}
                {this.props.status === 3 ?
                <Main 
                    modelName={this.RecipeData.title}
                    setTime={this.state.isShowCooking_before ? 
                    (this.props.cook_start ? `预计明天${this.DataTimer}煮好`:`剩余${numeral(this.props.left_time).format('00:00 ceil')}`):(this.props.cook_start ? `预计今天${this.DataTimer}煮好`:`剩余${numeral(this.props.left_time ? this.props.left_time:this.props.cook_start).format('00:00 ceil')}`)}
                    main_img={CookingImg}
                    // keepTimer={this.KeepTimer}
                />:null}
                {this.props.status === 2 ? 
                <Main 
                    modelName={'保温'}
                    setTime={`已保温${GetDataManager.showKeepTemp_time(this.props.cookTimer1,this.props.left_time)}`}
                    main_img={CookingImg}
                    // keepTimer={this.KeepTimer}
                />:null
                }
                <footer className='SetTimer_footer'>
                    <Button
                        firstClick={this.RecipeClick.bind(this)}
                        secondClick={this.StopClick.bind(this)}
                        first_icon={Caipu}
                        second_icon={Power}
                        first_Txt={'菜谱'}
                        second_Txt={this.props.status === 1 ? '停止烹饪':(this.props.status === 3 ? '停止预约' : (this.props.status === 2 ? '停止保温' : null))}
                        first_background={'#28BECA'}
                        second_background={'#3C3C3C'}
                    />
                </footer>
                <Popup
                    visible={this.state.visible}
                    popup_style={{height:'3.68rem'}}
                    title={'确定停止烹饪'}
                    buttonNum={2}
                    button_style={{lineHeight:'.88rem',background:'rgba(250,250,250,1)'}}
                    onPress={this.onPress.bind(this)}
                />
            </div>
        )
    }
}

