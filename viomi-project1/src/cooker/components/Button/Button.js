import React,{Component} from 'react'
import './Button.css'
export default class Button extends Component{
    constructor(props) {
        super(props);
        this.state = {  
        }
    }
    RecipeClick(){
        this.props.firstClick()
    }
    StopClick(){
        this.props.secondClick()
    }
    render(){
        return(
            <div>
                <p className={'order'} onClick={this.RecipeClick.bind(this)} style={{background:this.props.first_background}}>
                    <img className={'timerimg'} src={this.props.first_icon} />
                    <span className={'timeTxt'}>{this.props.first_Txt}</span>
                </p>
                <p className={'start'} onClick={this.StopClick.bind(this)} style={{background:this.props.second_background}}>
                    <img className={'timerimg'} src={this.props.second_icon} />
                    <span className={'timeTxt'}>{this.props.second_Txt}</span>
                </p>
            </div>
        )
    }
}