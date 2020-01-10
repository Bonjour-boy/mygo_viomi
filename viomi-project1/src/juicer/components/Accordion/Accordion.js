/*
 * @Author: your name
 * @Date: 2019-12-06 11:55:22
 * @LastEditTime: 2019-12-06 14:57:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\juicer\components\Accordion\Accordion.js
 */

/**
 * @description 
 * @var {string} Recipe_img 图片
 * @var {string} Recipe_Txt 左边文本
 * @var {string} type_icon 右边icon
 * @var {string} set_Txt 右边设定数值（可选）
 * @var {function} onClick 点击事件
 */ 
import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import './Accordion.css'
export default class Accordion extends Component{
    constructor(props) {
        super(props);
        this.state={     
        }
    } 
    render(){

        return(
            <div className='Accordion'>
                <div className='listitem' onClick={this.props.onClick}>
                    <img className='Recipe_img' src={this.props.Recipe_img} />
                    <span className='Recipe_Txt'>{this.props.Recipe_Txt}</span>
                    <Icon type={this.props.type_icon} className='Recipe_icon' />
                    {this.props.set_Txt ? 
                    <span className='set_txt'>{this.props.set_Txt}</span>
                    :null
                    }      
                </div>
                <div className='drop-down'></div>
            </div>
        )
    }
}
