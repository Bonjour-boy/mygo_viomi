import React,{Component} from 'react'
// import './Freezer.css'
export default class Freezer extends Component{
    constructor(props) {
        super(props);
        this.state={

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
    render(){
        return(
            <div>
                 <div className='freezer' style={{opacity:this.props.op}}>
                    <div className='freezernum'>{this.props.ftemp} 
                        <span className='freezerfu'>℃</span>
                    </div>
                    <div className='freezerfu'>{this.props.txt}</div>
                </div>
                <div className='freezer' style={{opacity:this.props.op}}>
                    <div className='freezernum'>{this.props.ctemp} 
                        <span className='freezerfu'>℃</span>
                    </div>
                    <div className='freezerfu'>{this.props.areatxt}</div>
                </div>
            </div>
        )
    }
}