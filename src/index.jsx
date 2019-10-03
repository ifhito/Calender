import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import Nouislider from 'react-nouislider';
import "./nonslider.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Z_ASCII } from "zlib";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PlanSlider from "./PlanSlider.jsx";
import ChoiceWeek from "./ChoiceWeek.jsx";
class App extends React.Component{
    //初期化
    constructor(props){
        super(props);
        //今の年の取得
        const todayYear = new Date().getFullYear();
        //今の月の取得
        const todayMonth = new Date().getMonth() + 1;
        //今日の日付の取得
        const today = new Date().getDate()
        //表示するカレンダーの日にちを取得
        this.calendar = this.createCalender(todayYear,todayMonth);
        this.state = {
            year: todayYear,
            month: todayMonth,
            day: today,
            choiceWeek: this.calendar[Math.ceil(today/7) - 1],
            plans: [],
        };
        //bindしてthisを代入
        this.changeMonth = this.changeMonth.bind(this);
        this.changeWeekandDay = this.changeWeekandDay.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.deletePlan = this.deletePlan.bind(this);
        this.changeTimes = this.changeTimes.bind(this);
        //this.changeContent = this.changeContent.bind(this);
        this.addPlanContent = this.addPlanContent.bind(this);
    }
    //表示する月日を変更するメソッド
    changeMonth(changeNum){
        //前の月か次の月かchangeNumで調整
        const nextMonth = this.state.month + changeNum;
        const nextYear = this.state.year + changeNum;
        //年が変化する場合の処理
        if(12<nextMonth){
            this.setState({month:1});
            this.setState({year: nextYear});
        } else if(nextMonth < 1){
            this.setState({month: 12});
            this.setState({year: nextYear});
        } else {
            this.setState({month: nextMonth});
        }
    }
    //カレンダーをクリックすると週の変更が行われるメソッド
    changeWeekandDay(event){
        if(event.target.getAttribute("data-title") != "delete"){
            //クリックした週を格納
            const choiceDay = event.target.getAttribute("data-title");
            console.log(Math.ceil(choiceDay/5) - 1);
            //週のstateを変更
            if(choiceDay != null){
                this.setState({choiceWeek: this.calendar[Math.ceil(choiceDay/7) - 1]});
                this.setState({day: choiceDay});
            }
        }
    }
    //planをカレンダー上に入れるためのメソッド(onClick)
    addPlanContent(newPlan){
        //this.state.plansにpuchする(あまり好ましくはないかもしれない)
        this.state.plans.push(newPlan);
        //plansをthis.state.plansでsetState
        this.setState({
            plans: this.state.plans
        });
    }

    //カレンダーを作成するメソッド
    createCalender(year, month){
        console.log(month);
        //前の月の一番初めの曜日取得
        const firstDay = new Date(year, month - 1, 1).getDay();
        //今月の日数
        const lastDay = new Date(year, month, 0).getDate();
        //曜日がその月の曜日より小さい場合とその月の最後の曜日より大きい場合にカレンダーには日付を表示しない
        return [0,1,2,3,4].map(weekNum => {
            return [0,1,2,3,4,5,6].map(dayNum =>{
                const day = dayNum + 1 + weekNum * 7;
                if(day - 1 < firstDay || lastDay < day - firstDay){
                    return null;
                }else{
                    return day - firstDay;
                }
            });
        });
    }

    deletePlan(event){
        let copyPlans = this.state.plans;
        this.state.plans.map( (plan,id) =>{
            if(String(id) == event.target.id){
                console.log(event.target.id);
                copyPlans.splice(id,1);
            }
        });
        this.setState({plans: copyPlans});
    }
    onDragEnd(result){
        console.log(result);
        const {destination, source, draggableId} = result;
        console.log(source, draggableId);
        let copyPlans = this.state.plans;
        copyPlans.map((plan,id) => {
            if(id==draggableId){
                copyPlans[id].date = copyPlans[id].date.split("/")[0]+"/"+copyPlans[id].date.split("/")[1]+"/"+destination.droppableId;
            }
        });
        this.setState({plans: copyPlans});
    }

    changeTimes = Plan => (render, handle, value, un, percent)=>{
        let copyPlans = this.state.plans;
        copyPlans.map( (plan,id) =>{
            if(plan.date.split("/")[2] == this.state.day && Plan.id == plan.id){
                plan.startTime = value[0];
                plan.endTime = value[1];
            }
        });
        this.setState({plans: copyPlans});
        //console.log(event);
    };
    render(){
        //setStateした際にもう一度カレンダーを作り直す
        this.calendar = this.createCalender(this.state.year,this.state.month);
        console.log(this.state.year, this.state.month);
        console.log(this.state.choiceWeek);
        console.log(this.state.plans);
        return (
            <Fragment>
                <div>
                    <button onClick = {() => this.changeMonth(-1)}>＜＜</button>
                    <span>{this.state.year}年{this.state.month}月</span>
                    <button onClick = {() => this.changeMonth(1)}>＞＞</button>
                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                <table>
                <thead>
                    <tr>
                        <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
                    </tr>
                </thead>
                    <tbody>
                        {this.calendar.map((week, i) => {
                            //カレンダーの表の内部を作成
                            return <tr key={week.join("")}>
                                {week.map((day, j) => { 
                                    let width = "";
                                    let height = "";
                                    //予定の有る無しでwidth,heightの変更
                                    if(this.state.plans.length != 0){
                                        this.state.plans.map(content => {
                                            if(this.state.year+"/"+this.state.month+"/"+day == content.date){
                                                width = "200";
                                                height = "200";
                                            }else{
                                                width = "200";
                                                height = "200";
                                            }
                                        })
                                    }else{
                                        width = "200";
                                        height = "200";
                                    }
                                    //マスのReturn
                                    return<Droppable droppableId={`${day}`}>
                                                {(provided, snapshot) => {
                                                    return(<th key={`${i}${j}`} ref={provided.innerRef} data-title={day} width={width} height={height} onClick={event => this.changeWeekandDay(event)}>
                                                        {day}
                                                            {this.state.plans.map(
                                                                (content,id) => {
                                                                if(this.state.year+"/"+this.state.month+"/"+day == content.date){
                                                                            return (<Draggable draggableId={`${id}`} index={i+j}>
                                                                                        {(provided, snapshot) => {return (
                                                                                        <div ref={provided.innerRef} 
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        data-title={day}>
                                                                                            {content.plan}<button id={`${id}`} data-title={"delete"} onClick = {event => this.deletePlan(event)}>×</button>
                                                                                        </div>);}}
                                                                            </Draggable>
                                                                            )
                                                                    }
                                                            })
                                                            }
                                                            {provided.placeholder}
                                                        </th>);}}                                              
                                            </Droppable>

                                })}
                            </tr>
                        })}
                    </tbody>
                </table>
                </DragDropContext>
                <ChoiceWeek choiceWeek={this.state.choiceWeek} addPlanContent={this.addPlanContent} plans={this.state.plans} year={this.state.year} month={this.state.month}/>
                <PlanSlider plans={this.state.plans} year={this.state.year} month={this.state.month} day={this.state.day} changeTimes={this.changeTimes}/>
            </Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
