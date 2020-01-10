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
        this.props.onPress('确定')//点击确定的回调 
    }
    render(){
        return(
            <Modal
            popup
            visible={this.popup.visible}
            animationType="slide-up"
            className='warnPopup'
            style={{height:this.props.height}}
        >
            {/* 标题内容 */}
            <div className='nomaltemp'>{this.props.title}</div>
            {/* 中间部分内容 */}
            <div>{this.props.main}</div>
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
// 基础弹窗
//传值：
//visible:（是否弹窗）
//height:（弹窗高度）
//title:（弹窗标题）
//main:（中间部分内容）
//buttonNum:（按钮数量1或2，有确定或取消按钮）
//onPress:(点击确定或取消按钮的回调)
