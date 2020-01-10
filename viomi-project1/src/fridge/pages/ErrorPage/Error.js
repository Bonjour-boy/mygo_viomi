import React,{Component} from 'react'
import Issue from '../../../Components/Issue/Issue'
import './Error.css'
class Error extends Component{
    constructor(props) {
        super(props);
    }
    //避免组件无意义渲染
    shouldComponentUpdate(nextProps, nextState) {
        if (!_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState)) {
            return true
         } else {
            return false
        }
    }

    //故障返回按钮
    backClick(){
        this.props.isShowError()
    }
    render(){
        return(
            <Issue 
            errorTitle={'故障问题'}
            onClick={this.backClick.bind(this)}
            issueTxt={this.transforError(this.props.error)}
            mainStyle={{height:'100%',background:'#fff'}}
            topStyle={{borderBottom:'1px solid #BEBEBE'}}
            />
        )
    }
    //故障信息
    transforError(error){
        let errors = [];
        for (var i = 0; i <= 24; i++) {
            let item = error&Math.pow(2,i);
            if (item > 0) {
                let itemtext = this.errorText(i);
                errors.push(itemtext);
            }
        }
        return errors;
    }
    errorText(index){
        let text = '';
        switch(index)
        {
            case 0:
                text = '通信故障'; //'通信故障';
                break;
            case 1:
                text = '冷藏室传感器故障'; //'冷藏室传感器故障';
                break;
            case 2:
                text = '变温室传感器故障'; //'变温室传感器故障';
                break;
            case 3:
                text = '冷冻室传感器故障'; //'冷冻室传感器故障';
                break;
            case 4:
                text = '冷藏化霜传感器故障'; //'冷藏化霜传感器故障';
                break;
            case 5:
                text = '冷冻化霜传感器故障'; //'冷冻化霜传感器故障';
                break;
            case 6:
                text = '环境温度传感器故障'; //'环境温度传感器故障';
                break;
            case 7:
                text = '风门故障'; //'风门故障';
                break;
            case 8:
                text = '冷藏风扇故障'; //'冷藏风扇故障';
                break;
            case 9:
                text = '冷凝风扇故障'; //'冷凝风扇故障';
                break;
            case 10:
                text = '冷冻风扇故障'; //'冷冻风扇故障';
                break;
            case 11:
                text = '冷藏门开报警'; //'冷藏门开报警';
                break;
            case 12:
                text = '变温门开报警'; //'变温门开报警';
                break;
            case 13:
                text = '冷冻门开报警'; //'冷冻门开报警';
                break;
            case 14:
                text = '化霜不良报警'; //'化霜不良报警';
                break;
            case 15:
                text = '冷藏高温报警'; //'冷藏高温报警';
                break;
            case 16:
                text = '冷藏低温报警'; //'冷藏低温报警';
                break;
            case 17:
                text = '变温高温报警'; //'变温高温报警';
                break;
            case 18:
                text = '变温低温报警'; //'变温低温报警';
                break;
            case 19:
                text = '冷冻高温报警'; //'冷冻高温报警';
                break;
            case 20:
                text = '冷冻低温报警'; //'冷冻低温报警';
                break;
            case 21:
                text = '变温化霜传感器故障'; //'变温化霜传感器故障';
                break;
            case 22:
                text = '湿度传感器湿度故障'; //'湿度传感器湿度故障';
                break;
            case 23:
                text = '湿度传感器温度故障'; //'湿度传感器温度故障';
                break;
            case 24:
                text = '冷藏变温传感器故障'; //'冷藏变温传感器故障';
                break;
            default:
                text = '未知故障'; //'未知故障';
        }
        return text;
    }
}

export default Error