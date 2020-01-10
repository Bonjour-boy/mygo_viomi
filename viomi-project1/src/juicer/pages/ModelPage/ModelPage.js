/*
 * @Descripttion: 
 * @version: 
 * @Author: luxianbo
 * @Date: 2019-12-06 17:55:52
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-26 11:18:23
 */
import React, {Component} from 'react';
import Title from '../../../Components/Title/Title';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import './ModelPage.css'
import SettingManager from '../../SettingManager'
import ModelAdapter from '../../config/Adapter/ModelAdapter'
import Model_list_img from '../../assets/img/ic_move@2x.png'

const DragHandle = sortableHandle(() => <img src={Model_list_img} className='model_list_img' />);

const SortableItem = sortableElement(({value,onClick}) => (
  <li onClick={onClick} className='model_items'>
    <img src={value.img} className='model_img'/>
    <span className='model_Txt'>{value.text}</span>   
    <DragHandle  />
  </li>
));
const SortableContainer = sortableContainer(({children}) => {
  return <ul className='model_list'>{children}</ul>;
});

export default class ModelPage extends Component {
  constructor(props) {
      super(props);
      this.state = {
        items: ModelAdapter.model_data(),
        Left_content:false,
        Right_content:false,
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
  //进入页面时，处理mode排序
  componentDidMount(){
    let _props = this.props.mode_sort
    let newarr = []
    let arr = ModelAdapter.model_data()//[1,2,3,4,5,6,7,8,9,10,11,12]
    for(var i = 0;i < _props.length; i++){
      for(var j = 0;j < arr.length; j++){
        if(arr[j].sortNum === Number(_props[i])){
          newarr.push(arr[j])
          if(newarr.length === this.props.stand_top_num){
            newarr.push({text:'上方模式会出现在破壁机'})
          }
        }
      }
    }
    this.setState({items:newarr})
  }
  //返回按钮
  BackClick(){
    history.back()
  }
  //显示或隐藏拖拽按钮
  show_hide(value){
    let model_list_img = document.getElementsByClassName('model_list_img')
    for(var i = 0;i<model_list_img.length;i++){
      model_list_img[i].style.display = value
    }
  }

  //管理按钮
  RightClick(){
    this.show_hide('block')
    this.setState({
      Left_content:true,
      Right_content:true
    })
  }
  //排序后点击保存
  ComfirmClick(){
    let arr = []
    let orderIndex = 0
    let hotIndex = 0
    let ManualIndex = 0
    this.show_hide('none')
    this.setState({
      Left_content:false,
      Right_content:false
    })
    this.state.items.map((item,index)=>{
      if(item.sortNum){
        arr.push(item.sortNum)
      } 
      if(item.text === '上方模式会出现在破壁机') {
        orderIndex = index   
      }
      if(item.text === '加热'){
        hotIndex = index
      }
      if(item.text === '手动'){
        ManualIndex = index
      }
    })
    if(hotIndex <= 7 && ManualIndex <= 7){
      SettingManager.setTopModelNum(orderIndex)
      SettingManager.setModeSort(arr)
    }  
  }
  //排序后取消
  cancelClick(){
    this.show_hide('none')
    this.setState({
      Left_content:false,
      Right_content:false
    })
  }
  //拖拽完成后触发
  onSortEnd ({oldIndex, newIndex},e) {
      e.path[1].style.boxShadow = 'none'
      this.setState(({items}) => ({
          items: arrayMove(items, oldIndex, newIndex),
      }))
      this.show_hide('block')
  };
  //拖拽阴影
  shouldCancelStart(event){
      let items = document.getElementsByClassName('model_items')
      for(var i = 0;i<items.length;i++){
        items[i].style.boxShadow = 'none'
      }
      event.path[1].style.boxShadow = '0px 0px 10px #888888'
  }
  //点击每一项
  items_Click(index){
    SettingManager.setMode(index)
      this.props.history.push({
        pathname:'/'
    }); 
  }

  render() {
      return (
          <div>
              <Title 
              Left_content={this.state.Left_content ? <div onClick={this.cancelClick.bind(this)} className='left_content'>取消</div>:null}
              Right_content = {this.state.Right_content ? <div onClick={this.ComfirmClick.bind(this)} className='right_content'>保存</div>:<span onClick={this.RightClick.bind(this)} className='right_default'>管理</span>}
              Main_style={{background:'#ebebec',borderBottom: '1px solid #BEBEBE'}}
              TitleTxt={'选择模式'}
              BackClick={this.BackClick.bind(this)}
              />
                  <SortableContainer shouldCancelStart={this.shouldCancelStart.bind(this)} onSortEnd={this.onSortEnd.bind(this)} useDragHandle>
                    {this.state.items.map((value, index) => {
                      if(value.text === '上方模式会出现在破壁机'){
                        return <li key={index} className='middel'>上方模式会出现在破壁机</li>
                      }
                       return <SortableItem onClick={this.items_Click.bind(this,value.sortNum)} key={index} index={index} value={value} />
                      
                    })}
                  </SortableContainer>
          </div>
      );
  }
}