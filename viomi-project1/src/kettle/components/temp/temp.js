import React,{Component} from 'react'
import './temp.css'
export default class Temp extends Component{

    render(){
        return(
            <div className='warnNumtemp'>
                {this.props.defaultValue}
                <span className='font30'>℃</span>
            </div>
        )
    }
}