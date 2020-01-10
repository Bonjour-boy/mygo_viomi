import React,{Component} from 'react'
// import './ErrorTitle.css'
export default class ErrorTitle extends Component{
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
    issueClick(){
        this.props.issueClick()
    }
    render(){
        return(
            <div onClick={this.issueClick.bind(this)} className = {'issue'}>
                <span className={'issuetxt'}>出现{this.props.errorNum}个故障问题</span>   
                <span className={'addissue'}>&gt;</span>
            </div>
        )
    }
}