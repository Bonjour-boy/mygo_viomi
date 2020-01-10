/*
 * @Author: your name
 * @Date: 2019-10-18 09:25:15
 * @LastEditTime : 2019-12-26 14:48:04
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\Components\Controlmodel\Controlmodel.js
 */
/**
 * @description: 智能模式或假日模式
 * @param {string} image 图片或icon（默认值为img）
 * @param {string} Txt 文字
 * @func {function}  onClick 点击事件
 */
import React,{Component} from 'react'
import './Controlmodel.css'
import img from '../../assets/img/activesmart@2x.png'
export default class Controlmodel extends Component{
    render(){
        return(
            <div onClick = {this.props.onClick} className={'Controlmodel'}>
                <img className={'Controlmodel_img'} 
                src={this.props.image ? this.props.image : img} alt=""/>
                <div className={'Controlmodel_img_txt'}>{this.props.Txt ? this.props.Txt:'智能模式'}</div>
            </div>
        )
    }
}
