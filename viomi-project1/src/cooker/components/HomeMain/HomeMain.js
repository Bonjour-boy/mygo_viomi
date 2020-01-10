/*
 * @Author: your name
 * @Date: 2019-11-13 11:14:58
 * @LastEditTime: 2019-12-04 17:56:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\cooker\components\HomeMain\HomeMain.js
 */
import React,{Component} from 'react'
import './HomeMain.css'
import TimerImg from '../../assets/img/plantimer@2x.png'

export default class HomeMain extends Component{
    constructor(props) {
        super(props);
        this.state = {  
        }
    }
    render(){
        return(
            <main className='HomeMain'>
                <div className={'lefttxt'}>
                        <p className={'nowmodel'}>{this.props.nowModel}</p>
                        <p>
                            <img className={'timerimg'} src={TimerImg} />
                            <span className={'timer'}>{this.props.planTimer}</span>
                        </p>
                </div>
                {/* <div><img className ={'rightimg'} src={CookerImg}/></div> */}
            </main>
        )
    }
}