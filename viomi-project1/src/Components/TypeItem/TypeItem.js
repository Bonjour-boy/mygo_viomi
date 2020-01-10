/*
 * @Author: your name
 * @Date: 2019-11-11 15:30:34
 * @LastEditTime : 2019-12-26 14:50:37
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\Components\TypeItem\TypeItem.js
 */
/**
 * @description 分类选项(可滑动)
 * @param  {array} data 分类选项数据,数据格式如下(type可选)
 * @property  {json} item_img_style 图片样式
 * @func  {function} ItemClick 点击每一项
 */
import React,{Component} from 'react'
import './TypeItem.css'
import Baozifan from '../../assets/img/baozifan@2x.png'
const data = [
    {
        type:'特色米饭',
        item:[
            {
                img:Baozifan,
                title:'煲仔饭'
            },
            {
                img:Baozifan,
                title:'煲仔饭'
            },
            {
                img:Baozifan,
                title:'煲仔饭'
            },
        ]
    },
    {
        type:'滋补汤粥',
        item:[
            {
                img:Baozifan,
                title:'煲仔饭'
            },
            {
                img:Baozifan,
                title:'煲仔饭'
            },
        ]
    },
    {
        type:'好味菜品',
        item:[
            {
                img:Baozifan,
                title:'煲仔饭'
            },
        ]
    },
    
]
export default class TypeItem extends Component{
    constructor(props) {
        super(props);
        this.state={}
    } 
    //点击每一项
    ItemClick(val,k){
        this.props.ItemClick(val,k)
    }
    getMainView(){
        if(this.props.data){
            return (this.props.data.map((item,index)=>{
                        return  <dl className={'main'} key={index}>
                                    {item.type ? <dt className={'font_16'}>{item.type}</dt>:null}
                                    <dd className = {'scroll'}>
                                        <ul className={'type'}>
                                            {item.item.map((k,key)=>{
                                                return  <li className={'item'} key={key} onClick={this.ItemClick.bind(this,key,k)}>
                                                            <img className={'item_img'} style={this.props.item_img_style} src={k.img} />
                                                            <p className={'item_txt'}>{k.title}</p>
                                                        </li>
                                            })}

                                        </ul>
                                    </dd>
                                </dl> 
                    }))
        }else{
            return (data.map((item,index)=>{
                        return  <dl className={'main'} key={index}>
                                    {item.type ? <dt className={'font_16'}>{item.type}</dt>:null}
                                    <dd className = {'scroll'}>
                                        <ul className={'type'}>
                                            {item.item.map((k,key)=>{
                                                return  <li className={'item'} key={key} onClick={this.ItemClick.bind(this,key,k)}>
                                                            <img className={'item_img'} style={{width:'100px',height:'100px'}} src={k.img} />
                                                            <p className={'item_txt'}>{k.title}</p>
                                                        </li>
                                            })}

                                        </ul>
                                    </dd>
                                </dl> 
                    }))
        }
    }


    render(){
        return(
            <div>
                {this.getMainView()}     
            </div>
        )
    }
}