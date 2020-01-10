/*
 * @Author: your name
 * @Date: 2019-11-11 16:09:37
 * @LastEditTime : 2019-12-26 14:51:12
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\Components\Title\Title.js
 */
/**
 * @description 头部标题
 * @param  {string} TitleTxt 标题名
 * @param  {string} Right_content 右侧内容(可选)
 * @param  {*} Left_content 左侧内容（可选，默认为返回按钮）
 * @property  {json} Main_style 整体样式(可选)
 * @property  {json} style 标题样式(可选)
 * @func  {function} BackClick 左侧点击返回
 */
import React,{Component} from 'react'
import './Title.css'
import Back from '../../assets/img/back@2x.png'
export default class Title extends Component{
    BackClick(){
        this.props.BackClick()
    }
    render(){
        return (
            <div className={'title'} style={this.props.Main_style}>
                {this.props.Left_content ? this.props.Left_content:<img className={'back'} src = {Back} onClick = {this.BackClick.bind(this)}/>}
                <span className={'font_17'} style={this.props.style}>{this.props.TitleTxt ? this.props.TitleTxt: '标题'}</span>
                {this.props.Right_content ? this.props.Right_content:null}
            </div>
        )
    }
}

