/*
 * @Author: your name
 * @Date: 2019-11-13 15:45:55
 * @LastEditTime : 2019-12-25 17:53:52
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\cooker\pages\ErrorPage\ErrorPage.js
 */
import React,{Component} from 'react'
import './ErrorPage.css'
import Error from '../../../Components/Issue/Issue'

export default class ErrorPage extends Component{
    constructor(props) {
        super(props);
        this.state = { 
        }
    }
    //避免组件无意义渲染
    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
            return true
         } else {
            return false
        }
    }
    //返回按钮
    BackClick(){
        history.back()
    }
    render(){
        return(
           <div className='ErrorPage_app'>
              <Error 
              onClick={this.BackClick.bind(this)}
              issueTxt={this.props.errorTxt}
              errorTitle={'设备故障'}
              topStyle={{background:'#fff',margin:0}}
              mainStyle={{background:'#fff',marginTop:'.186667rem'}}
              />
           </div>
        )
    }
}

