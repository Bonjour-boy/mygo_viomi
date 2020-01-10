import React,{Component} from 'react'
// import './Single.css'
export default class Single extends Component{
    
    //避免组件无意义渲染
    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
            return true
         } else {
            return false
        }
    }
    render(){
        return(
            <div className='afreezer' style={{float:this.props.float,opacity:this.props.op,
                width:this.props.width,
                marginTop:this.props.marginTop,
                marginBottom:this.props.marginBottom
            }}>
                <div className='freezernum'>{this.props.atemp} 
                    <span className='freezerfu'>℃</span>
                </div>
                <div className='freezerfu'>{this.props.txt}</div>
                <div className='addtxt'>{this.props.addtxt}</div>
            </div>
        )
    }
}