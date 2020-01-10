/*
 * @Descripttion: 
 * @version: 
 * @Author: luxianbo
 * @Date: 2019-12-05 18:18:38
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-01-03 19:22:14
 */
import React,{Component} from 'react'
import { Route,Switch } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage'
import RecipeDetailPage from './pages/RecipeDetailPage/RecipeDetailPage'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import ModelPage from './pages/ModelPage/ModelPage'
import WorkPage from './pages/WorkPage/WorkPage'
import DataManager from './request/CommonPropsManager'
import GetDataManager from './GetDataManager'

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state={
            modelNum:1,//现在模式
            mode_sort:null,//模式排序
            left_time:0,//料理剩余时间
            temp_data:55,//默认保温温度
            time_data:3,//默认保温时长
            rev:3,//默认手动转速
            promptlyWorkTime:null,//立即料理时间
            work_status:null,//工作状态
            cooked_time:0,//料理完成时间
            cook_time:0,//已料理时长
            curr_tempe:0,//加热时的温度
            errorTxt:[],//故障内容
            errorNum:null,//故障数量
            isShowError:false,//是否显示故障
            stand_top_num:null,//模式管理上半部分数量
        }
    }
    //开始轮询
    startPropsLoop() {
        DataManager.startPropsLoop({
            props: ['run_status','work_status','mode','cook_status','warm_time','cook_time','left_time','cooked_time','curr_tempe','mode_sort','rev','stand_top_num','warm_data'],
            interval: 4,
            toObject: true,
            log:true,
            callback: (result) => {
                console.log("Result:"+JSON.stringify(result));     
                this.setState(GetDataManager.MainPage_getData(result))         
            }
        })
    } 
    componentDidMount(){
        this.startPropsLoop()
    }
    render(){
        let _state = this.state
        return(
            <Switch>
                <Route path="/" exact render={(props)=><MainPage {...props} 
                modelNum={_state.modelNum}
                left_time={_state.left_time}
                temp_data={_state.temp_data}
                time_data={_state.time_data}
                rev={_state.rev}
                promptlyWorkTime={_state.promptlyWorkTime}
                work_status={_state.work_status}
                errorNum={_state.errorNum}
                isShowError={_state.isShowError}
                />} />
                <Route path="/recipe" exact render={(props)=><RecipeDetailPage {...props} 
                modelNum={_state.modelNum}
                />} />
                <Route path="/error" exact render={(props)=><ErrorPage {...props}
                errorTxt={_state.errorTxt}
                />} />
                <Route path="/model" exact render={(props)=><ModelPage {...props}
                mode_sort={_state.mode_sort}
                stand_top_num={_state.stand_top_num}
                />} />
                <Route path="/working" exact render={(props)=><WorkPage {...props}
                work_status={_state.work_status}
                left_time={_state.left_time}
                cooked_time={_state.cooked_time}
                modelNum={_state.modelNum}
                temp_data={_state.temp_data}
                cook_time={_state.cook_time}
                curr_tempe={_state.curr_tempe}
                rev={_state.rev}
                />} />
            </Switch>
        )
    }
}