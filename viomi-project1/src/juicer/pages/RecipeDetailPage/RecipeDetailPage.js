/*
 * @Descripttion: 
 * @version: 
 * @Author: luxianbo
 * @Date: 2019-12-12 14:10:26
 * @LastEditors  : sueRimn
 * @LastEditTime : 2020-01-06 17:05:08
 */
import React, { Component } from 'react';
import './RecipeDetailPage.css'
import ModelAdapter from '../../config/Adapter/ModelAdapter'
import GetDataManager from '../../GetDataManager'
import Title from '../../../Components/Title/Title';
import TitBack_img from '../../assets/img/titBackicon.png' 

import MainPage from '../MainPage/MainPage'
export default class RecipeDetailPage extends Component{
    constructor(props) {
        super(props);
        ModelAdapter.model_data().map((item)=>{
            if(item.sortNum === this.props.modelNum){
                this.type = item.type
            }
        })
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
    //返回按钮
    BackClick(){
        history.back()
    }
    render(){
        let recipe = ModelAdapter.Recipe_data()[this.type]
        let recipeurl = 'https://cnbj2.fds.api.xiaomi.com/viomi-app-plugin/broken_viomicookbook/' + this.type + '.jpg';
        return(
            <div>
                <Title 
                Main_style={{background:'#f2f2f2',overflow:'hidden',borderBottom:'1px solid #d0cccb'}}
                Left_content={<img onClick={this.BackClick.bind(this)} className='TitBack_img' src={TitBack_img} />}
                TitleTxt={GetDataManager.nowModel(this.props.modelNum)}
                />
                <div className='show_main'>
                    <img className='type_img' src={recipeurl} />
                    <div className='introduce'>{recipe.des}</div>
                </div>
                <div className='food'>
                    <p className='food_title'>准备食材</p>
                    <p className='food_text'>可根据个人口味自主选择食材用量</p>
                    <ul className='food_list'>
                        {recipe.food.map((item,index)=>{
                            return <li key = {index}>
                                        <span className='food_left'>{item.name}</span>
                                        <span className='food_right'>{item.num}</span>
                                    </li>
                        })}
                    </ul>
                </div>
                <ul className='step'>
                    {recipe.steps.map((item,index)=>{
                        return  <li key={index}>
                                    <p className='food_title'>步骤{index+1}</p>
                                    <p className='food_text'>{item.text}</p>
                                    <img src={`https://cnbj2.fds.api.xiaomi.com/viomi-app-plugin/broken_viomicookbook/${this.type + `${index+1}`}.jpg`} className='step1_img' />
                                </li>
                    })}
                </ul>
            </div>
        )
    }
}