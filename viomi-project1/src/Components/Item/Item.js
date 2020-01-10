/*
 * @Author: your name
 * @Date: 2019-10-18 18:02:00
 * @LastEditTime : 2019-12-26 14:48:34
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\Components\Item\Item.js
 */
/**
 * @description: listItem选项
 * @param  {array} ItemData 选项数据
 * @property  {json} item_style 样式
 * @property {string} activeColor 选项选中时的文字样式
 * @property {string} unActiveColor 未选中是文字的 样式
 * @func {function} itemClick 点击选项回调--------第一个回调参数：选项的索引值index；第二个回调参数：选项内容
 * @func  {function} Items 选项el元素，可对选项进行处理
 */
import React,{Component} from 'react'
import {List } from 'antd-mobile'
import './Item.css'
const Item = List.Item;
const ItemData = ['水果','蔬菜','葡萄']
export default class Items extends Component{
    constructor(props) {
        super(props);
        this.state = {     
        }
    }
    componentDidMount(){//初始选项
        if(this.props.Items){
            let item = document.getElementsByClassName('am-list-content') 
            this.props.Items(item)//获取元素选项
        }   
    }
    itemClick(index,e){
        let item = document.getElementsByClassName('am-list-content')
        for(var i = 0;i<item.length;i++){
            item[i].style.color = this.props.unActiveColor
        }
        e.target.style.color = this.props.activeColor
        this.props.itemClick(index,e.target.innerHTML)
    }
    getMainView(){
        if(this.props.ItemData){
            return <div className={'changeArea'} style={this.props.item_style}>
                        {this.props.ItemData.map((item,index)=>{
                            return <Item key={index} onClick={this.itemClick.bind(this,index)}>{item}</Item>
                        })}
                    </div>
        }else{
            return  <div className={'changeArea'} style={this.props.item_style}>
                        {ItemData.map((item,index)=>{
                            return <Item key={index} onClick={this.itemClick.bind(this,index)}>{item}</Item>
                        })}
                    </div>
        }
    }
    render(){
        return(
            this.getMainView()
        )
    }
}

