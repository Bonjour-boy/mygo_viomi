/*
 * @Author: your name
 * @Date: 2019-10-18 09:24:48
 * @LastEditTime : 2019-12-26 14:49:59
 * @LastEditors  : sueRimn
 * @Description: In User Settings Edit
 * @FilePath: \项目\viomi-project\src\Components\Slider\Slider.js
 */
/**
 * @description: 滑动模块
 * @param  {number} tempMin slider最小值
 * @param  {number} tempMax slider最大值
 * @param  {bool} range 是否有温度范围值（可选）
 * @param  {bool} range_time 是否有时间范围值（可选）
 * @param  {number} KeepTimer 设定滑块内的值（可选）
 * @property  {number} defaultValue 滑块初始位置
 * @property  {number} step 步长（可选，默认为1）
 * @property  {bool} disabled 禁止使用（可选）
 * @property  {json} trackStyle 选中部分滑动条的样式
 * @property  {json} handleStyle 滑块的样式样式
 * @property  {json} railStyle 未选中部分样式
 * @property  {bool} range_count 范围值无单位（可选）
 * @func  {function} setData 滑块最终设定值回调
 */
import React,{Component} from 'react'
import {Slider} from 'antd-mobile';
import './Slider.css'
let slider_handle = document.getElementsByClassName('am-slider-handle')  
export default class slider extends Component{
    constructor(props) {
        super(props);
        this.state = {     
        }
    }
    //初始数据
    componentDidMount(){
        if(this.props.KeepTimer){
            if(slider_handle.length > 1){
                slider_handle[0].innerHTML = this.props.cookingTimer
                slider_handle[1].innerHTML = this.props.KeepTimer
            }else{
                slider_handle[0].innerHTML = this.props.KeepTimer
            }
        } 
    }
    //接收传过来的值
    componentWillReceiveProps(nextProps){
        if(nextProps.KeepTimer){
            if(slider_handle.length > 1){
                slider_handle[0].innerHTML = nextProps.cookingTimer
                slider_handle[1].innerHTML = nextProps.KeepTimer
            }else{
                slider_handle[0].innerHTML = nextProps.KeepTimer
            }
        }  
    }

    log(name) {
        return (value) => {
            this.props.setData(value)
        };
    }
    render(){
        return(
            <div className='slider_main'>
                <Slider
                style={{touchAction: 'none'}}
                defaultValue={this.props.defaultValue ? this.props.defaultValue:3}
                min={this.props.tempMin ? this.props.tempMin:0}
                max={this.props.tempMax ? this.props.tempMax:10}
                onChange={this.log('change')}
                onAfterChange={this.log('afterChange')}
                disabled={this.props.disabled}
                trackStyle={this.props.trackStyle ? 
                this.props.trackStyle:
                {   height: '1.066667rem',
                    borderRadius: '1.066667rem',
                    backgroundColor: '#29c7ca',
                    paddingLeft: '.8rem',
                }
                }
                handleStyle={this.props.handleStyle ? 
                this.props.handleStyle:
                {
                    width: '1.066667rem',
                    height: '1.066667rem',
                    marginTop: 0,
                    marginLeft: 0,
                    zIndex: 1
                }
                }
                railStyle={this.props.railStyle ? 
                this.props.railStyle:
                {
                    height: '1.066667rem',
                    borderRadius: '1.066667rem',
                    width: '7.466667rem',
                }
                }
                step={this.props.step}
                />
                {this.props.range ? 
                <div>
                <span className='init'>{this.props.tempMin}℃</span>
                <span className='end'>{this.props.tempMax}℃</span>
                </div>
                :null}
                {this.props.range_time ? 
                <div>
                <span className='init'>{this.props.tempMin} h</span>
                <span className='end'>{this.props.tempMax} h</span>
                </div>
                :null}
                {this.props.range_count ? 
                <div>
                <span className='init'>{this.props.tempMin}</span>
                <span className='end'>{this.props.tempMax}</span>
                </div>
                :null}
            </div>
        )
    }
}
