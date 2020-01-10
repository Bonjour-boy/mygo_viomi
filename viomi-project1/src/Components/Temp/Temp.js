/*
 * @Author: your name
 * @Date: 2019-10-18 09:24:48
 * @LastEditTime : 2019-12-26 14:46:57
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\Components\Temp\Temp.js
 */
/**
 * @description 温度数 
 * @param  {number} defaultValue 
 */
import React,{Component} from 'react'
import './Temp.css'
export default class Temp extends Component{

    render(){
        return(
            <div className='warnNumtemp'>
                {this.props.defaultValue ? this.props.defaultValue:100}
                <span className='font30'>℃</span>
            </div>
        )
    }
}
//温度数
//defaultValue(默认温度数)