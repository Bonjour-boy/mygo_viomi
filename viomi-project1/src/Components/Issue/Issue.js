/*
 * @Author: your name
 * @Date: 2019-10-18 09:24:48
 * @LastEditTime : 2019-12-26 14:48:18
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\Components\Issue\Issue.js
 */
/**
 * @description: 故障问题
 * @param  {array} issueTxt 故障内容
 * @param  {string} errorTitle 故障标题
 * @property  {json} topStyle 头部样式
 * @property  {json} mainStyle 故障样式
 * @func  {function} onClick 点击事件跳转返回
 */
import React,{Component} from 'react'
import {Icon} from 'antd-mobile';
import './Issue.css'

const error =['电机故障','电压故障','加热故障']
export default class Issue extends Component{
    //内容
    getMainView(){
        if(this.props.issueTxt){
            return  <div style={this.props.mainStyle}>
                        {this.props.issueTxt.map((item,index)=>{
                            return <p key={index} className={'issueMain'}>{item}</p>
                        })}
                    </div>
        }else{
            return  <div className='Issue_text'>
                        {error.map((item,index)=>{
                            return <p key={index} className={'issueMain'}>{item}</p>
                        })}
                    </div>
        }
    }
    //标题
    getTitleView(){
        if(this.props.errorTitle){
            return  <div className='Issue_top' style={this.props.topStyle}>
                        <span onClick={this.props.onClick} className={'leftFont'}><Icon type="left" size={'sm'} /></span>
                        <span className={'issueTitle'}>{this.props.errorTitle}</span>
                    </div>
        }else{
            return  <div className='Issue_top'>
                        <span onClick={this.props.onClick} className={'leftFont'}><Icon type="left" size={'sm'} /></span>
                        <span className={'issueTitle'}>设备故障</span>
                    </div>
        }
    }
    render(){
        return(
            <div style={{height:'100%'}}>
                {this.getTitleView()}
                {this.getMainView()}
            </div>
        )
    }
}

