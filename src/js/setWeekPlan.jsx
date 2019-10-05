import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import { Z_ASCII } from "zlib";

//Weekに予定を追加するためのコンポーネント
export default class SetWeekPlan extends React.Component{
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

    //planを追加するためのメソッド
    addPlanContent(event){
        const id = event.target.id;
        //空白の場合のエラー処理
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

            <div　className={"plusPlan"}>

                <div className={"title"}>Schedule A Week</div>

                {this.props.choiceweek.map((day, j) => {

                    const week = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
                    let color;
                    //予定を入れるところの描画
                    if(day != null){
                        //選択されている日の場合は背景色を変更する
                        if(day == parseInt(this.props.day)){
                            color = "#fffacd";
                        }else{
                            color = "#ecf0f1";
                        }
                    return(

                        <div className={"ScheduledPlan"} style={{backgroundColor: color}} key={`${j}`}>
                            {day}({week[j]})
                            plan: 
                            <input type="text" id={j} name={"planContent"} value={this.state.planContent[j]} onChange={event => this.changeContent(event)} />
                            Time:
                            <select type="text" id={j} name={"planStartTime"} value={this.state.planStartTime[j]} onChange={event => this.changeContent(event)}>
                                {[...Array(25).keys()].map((time,i) => {
                                    return <option key={"option1"+i}value={time}>{time}</option>
                                })}
                            </select>
                            to
                            <select type="text" id={j} name = "planEndTime" value={this.state.planEndTime[j]} onChange={event => this.changeContent(event)}>
                                {[...Array(25).keys()].map((time,i) => {
                                    return <option key={"option2"+i}value={time}>{time}</option>
                                })}
                            </select>
                            <input type="button" name={day} value="+" id={j} onClick={(event) => this.addPlanContent(event)}/>
                            <div>{this.state.error[j]}</div>
                        </div>
                    );
                    }
                })
                }
            </div>
        );
    }
}