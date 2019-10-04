import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import Nouislider from 'react-nouislider';
import "./nonslider.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Z_ASCII } from "zlib";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
//Weekに予定を追加するためのコンポーネント
export default class ChoiceWeek extends React.Component{
    constructor(props){
        super(props);
        this.state={
            planContent:["","","","","","",""],
            planStartTime: ["","","","","","",""],
            planEndTime: ["","","","","","",""],
            error: ["","","","","","",""]
        }
    }
    //input内の文字が変化した際発火するメソッド(Reactのform処理)
    changeContent(event){
        //3種類のinputを管理するためifで分ける
        //planContentが予定の内容
        //planStartTimeが予定の開始時刻
        //planEndTimeが予定の終了時刻
        if(event.target.name == "planContent"){
            const copyPlanContent = this.state.planContent.slice();
            copyPlanContent[parseInt(event.target.id)] = event.target.value;
            this.setState({[event.target.name]:copyPlanContent});
        }else if(event.target.name == "planStartTime"){
            const copyPlanStartTime = this.state.planStartTime.slice();
            copyPlanStartTime[parseInt(event.target.id)] = event.target.value;
            this.setState({[event.target.name]:copyPlanStartTime});
        }else if(event.target.name == "planEndTime"){
            const copyPlanEndTime = this.state.planEndTime.slice();
            copyPlanEndTime[parseInt(event.target.id)] = event.target.value;
            this.setState({[event.target.name]:copyPlanEndTime});
        }
    }

    addPlanContent(event){
        const id = event.target.id;
        if(this.state.planContent[id] == ""){
            let copyError = this.state.error;
            copyError[event.target.id] = "全ての値を入力してください";
            this.setState({error: copyError});
        }else{
            //plansをコピー
            const copyPlans = this.props.plans;
            //新しい予定
            const newPlan={
                id: this.props.plans.length,
                date: this.props.year+"/"+this.props.month+"/"+event.target.name,
                startTime: this.state.planStartTime[id],
                endTime: this.state.planEndTime[id],
                plan: this.state.planContent[id]
            };
            //copyPlansにpushする
            copyPlans.push(newPlan);
            //addPlanContentでplanを更新する
            this.props.addPlanContent(copyPlans);
            this.setState({error:["","","","","","",""]});
        }
    }
    render(){
        return (
            <div>
                {this.props.choiceWeek.map((day, j) => {
                    //予定を入れるところの描画
                    if(day != null){
                    return <div key={`${j}`}>
                        {day}日
                        予定
                        <input type="text" id={j} name = "planContent" value={this.state.planContent[j]} onChange={event => this.changeContent(event)} />
                        Time
                        <select type="text" id={j} name = "planStartTime" value={this.state.planStartTime[j]} onChange={event => this.changeContent(event)}>
                            {[...Array(25).keys()].map(time => {
                                return <option value={time}>{time}時</option>
                            })}
                        </select>
                        ~
                        <select type="text" id={j} name = "planEndTime" value={this.state.planEndTime[j]} onChange={event => this.changeContent(event)}>
                            {[...Array(25).keys()].map(time => {
                                return <option value={time}>{time}時</option>
                            })}
                        </select>
                        <input type="button" name={day} value="追加" id={j} onClick={(event) => this.addPlanContent(event)}/>
                        {this.state.error[j]}
                        </div>
                    }
                })
                }
            </div>
        );
    }
}