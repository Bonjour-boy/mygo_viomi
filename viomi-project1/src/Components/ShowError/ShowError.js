/*
 * @Author: your name
 * @Date: 2019-12-04 15:40:22
 * @LastEditTime : 2019-12-26 14:49:31
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\Components\ShowError\ShowError.js
 */
/**
 * @description 主页显示故障错误
 * @param  {string} errorTxt 文本
 * @func  {function} ErrorClick 点击事件
 */
import React,{Component} from 'react';
import {Icon} from 'antd-mobile';
import ErrorImg from '../../assets/img/guzhang@2x.png'
import './ShowError.css'

export default class ShowError extends Component{
    
    //点击事件
    ErrorClick(){
        this.props.ErrorClick()
    }

    render(){
        return(
            <div className='show_error'>
                <div className='error' onClick={this.ErrorClick.bind(this)}>
                    <img className='error_img' src={ErrorImg} />
                    <span className='error_txt'>{this.props.errorTxt ? this.props.errorTxt:'故障代码'}</span>
                    <Icon type="right" size={"xs"} color={'#fff'}/>
                </div>
            </div>
        )
    }
}
