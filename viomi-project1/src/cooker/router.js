/*
 * @Descripttion: 
 * @version: 
 * @Author: luxianbo
 * @Date: 2019-11-14 10:11:42
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-01-06 15:38:48
 */
import React,{Component} from 'react'
import { Route,Switch } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage'
import RecipePage from './pages/RecipePage/RecipePage'
import CookingPage from './pages/CookingPage/CookingPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import DetailPage from './pages/DetailPage/DetailPage'
import DataManager from './request/CommonPropsManager'
import GetDataManager from './GetDataManager'

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state={
            status:null,//开始状态
            model:null,//模式
            cookTimer:null,//食谱烹饪时间
            cookTimer1:null,//实际烹饪时间
            modelNum:null,//导航模式编号
            left_time:null,//烹饪剩余时间(烹饪中)
            cook_start:null,//预约烹饪(预约烹饪中)
            errorNum:null,//故障数量
            errorTxt:null,//故障内容
        }
    }
    //开始轮询
    startPropsLoop() {
        DataManager.startPropsLoop({
            props: ['work_status','mode','run_status','cook_time','left_time','cook_start'],
            interval: 4,
            toObject: true,
            log:true,
            callback: (result) => {
                console.log("Result:"+JSON.stringify(result));       
                this.setState(GetDataManager.MainPage_getData(result))     
            }
        })
    } 
    async componentDidMount(){
        await this.startPropsLoop()
    }
    render(){
        return(
            <Switch>
                <Route path="/" exact render={(props)=><MainPage {...props} 
                status={this.state.status} 
                model={this.state.model}
                cookTimer={this.state.cookTimer}
                modelNum={this.state.modelNum}
                cookTimer1={this.state.cookTimer1}
                cook_start={this.state.cook_start} 
                errorNum={this.state.errorNum}
                errorTxt={this.state.errorTxt}
                />} />
                <Route path="/recipe*" render={(props)=><RecipePage {...props}/>} />
                <Route path="/cooking*" render={(props)=><CookingPage {...props} 
                status={this.state.status}
                left_time={this.state.left_time} 
                modelNum= {this.state.modelNum}
                cook_start={this.state.cook_start} 
                cookTimer1={this.state.cookTimer1}
                />} />
                <Route path="/error" render={(props)=><ErrorPage {...props}
                errorTxt={this.state.errorTxt}
                />} />
                />
                <Route path="/detail*" render={(props)=><DetailPage {...props} 
                status={this.state.status} 
                modelNum= {this.state.modelNum}
                cook_start={this.state.cook_start} 
                cookTimer1={this.state.cookTimer1}
                />} />
            </Switch>
        )
    }
}