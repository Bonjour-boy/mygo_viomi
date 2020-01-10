import React,{Component} from 'react'
import './Main.css'
import TimerImg from '../../assets/img/plantimer@2x.png'
export default class Main extends Component{
    constructor(props) {
        super(props);
        this.state = {  
        }
    }
    render(){
        return(
            <main className='SetTimgPage_main'>
                <p className='nowmodel'>{this.props.modelName}</p>
                <p>
                    <img className='timerimg' src={TimerImg} />
                    <span className='timer'>{this.props.setTime}</span>
                    {this.props.keepTimer ? 
                        <span className='SetTimgPage_keep'>{this.props.keepTimer ? `保温${this.props.keepTimer}小时` : '保温12小时'}</span>
                    :null}
                </p>
                <img className='SetTimer_img' src={this.props.main_img} />
            </main>
        )
    }
}