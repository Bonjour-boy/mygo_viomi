/*
 * @Author: your name
 * @Date: 2019-11-29 18:08:33
 * @LastEditTime : 2019-12-26 14:49:22
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\Components\Rectangle\Rectangle.js
 */
/**
 * @description: 矩形边框
 * @param  {string} img 图片(可选)
 * @param  {string} text 文字
 * @property  {json} style 样式
 * @func  {function} onClick 点击事件
 */
import React,{Component} from 'react'
import './Rectangle.css'
import img from '../../assets/img/rectangle_img@2x.png'

export default class Rectangle extends Component{
    constructor(props) {
        super(props);
        this.state = {     
        }
    }
    //点击事件
    onClick(e){     
        this.props.onClick(e,this.refs.test)
    }
    getImgView(){
        if(this.props.img){
            return  <img className='rectangle_img' src={this.props.img} />
        }else{
            return  <img className='rectangle_img' src={img} />
        }
    }
    render(){
        return(
            <div className='rectangle' ref='test' onClick={this.onClick.bind(this)} style={this.props.style ? this.props.style:null}>
                {this.getImgView()}
                <span className='rectangle_txt'>{this.props.text ? this.props.text : '五常大米'}</span>
            </div>
        )
    }
}


