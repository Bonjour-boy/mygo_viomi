/*
 * @Author: your name
 * @Date: 2019-10-18 09:24:48
 * @LastEditTime : 2019-12-26 14:49:11
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\Components\Popup\Popup.js
 */
/**
 * @description 基础弹窗
 * @param  {bool} visible 是否弹窗
 * @param  {string} title 弹窗标题
 * @param  {*} main 中间部分内容
 * @property  {number} buttonNum 按钮数量1或2，默认为确定或取消按钮
 * @property  {json} button_style button按钮样式
 * @property  {string} set_time 其他自定义按钮（可选）
 * @property  {json } popup_style 弹窗整体样式
 * @property  {json} title_style 标题样式
 * @func  {function} onPress 点击确定或取消按钮的回调
 */
import React,{Component} from 'react'
import { Modal } from 'antd-mobile';
import './Popup.css'
export default class tempPopup extends Component{
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    //取消按钮
    onClose(){
        this.props.onPress('取消')//点击取消的回调 
    }
    //确认按钮
    onConfirm(){
        this.props.onPress(this.props.set_time ? this.props.set_time : '确定')//点击确定的回调 
    }
    render(){
        return(
            <Modal
            popup
            visible={this.props.visible}
            animationType="slide-up"
            className='warnPopup'
            style={this.props.popup_style}
        >
            {/* 标题内容 */}
            <div className='nomaltemp' style={this.props.title_style}>{this.props.title ? this.props.title:'标题'}</div>
            {this.props.subTitle ? <div style={{marginBottom:this.props.childTitle ? null:'.586667rem'}}>{this.props.subTitle}</div>:null}
            {this.props.childTitle ? <div>{this.props.childTitle}</div>:null}
            {/* 中间部分内容 */}
            {this.props.main ? <div>{this.props.main}</div>:null}
            {/* 按钮数量 */}
            <div className='button' style={this.props.button_style}>
                {this.props.buttonNum === 2 ? 
                <div>
                    <div type="primary" className='cancel' onClick={this.onClose.bind(this)}>取消</div>
                    <div type="primary" className='confirm' onClick={this.onConfirm.bind(this)}>{this.props.set_time ? this.props.set_time : '确定'}</div>
                </div>:
                <div>
                    <div type="primary" onClick={this.onConfirm.bind(this)}>确认</div>
                </div>
            }       
            </div>
        </Modal>
        )
    }
}

