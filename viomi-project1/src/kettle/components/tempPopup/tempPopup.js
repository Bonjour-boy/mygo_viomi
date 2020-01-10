import React,{Component} from 'react'
import { Modal } from 'antd-mobile';
import './tempPopup.css'
export default class tempPopup extends Component{
    constructor(props) {
        super(props);
        this.state = {
           
        }
    }
    //取消按钮
    onClose (){
        this.props.onPress('取消')//点击取消的回调 
    }
    //确认按钮
    onConfirm (){
        this.props.onPress('确定')//点击确定的回调 
    }
    render(){
        return(
            <Modal
            popup
            visible={this.props.visible}
            animationType="slide-up"
            className='warnPopup'
            style={{height:this.props.height}}
        >
            <div className='nomaltemp'>{this.props.title}</div>
            {/* 默认温度 */}
            {/* <div className='warnNumtemp'>
                {this.props.defaultValue}
                <span className='font30'>℃</span>
            </div> */}
            {/* 中间内容 */}
            <div style={this.props.mainStyle}>{this.props.main}</div>
            {/* 按钮数量 */}
            <div className='button'>
                {this.props.buttonNum === 2 ? 
                <div>
                    <div type="primary" className='cancel' onClick={this.onClose.bind(this)}>取消</div>
                    <div type="primary" className='confirm' onClick={this.onConfirm.bind(this)}>确认</div>
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