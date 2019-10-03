//reactDnD カレンダー内のコンテンツの要素を別ファイルで管理し、入れかえ可能にする(dropSourceにする)。また、表の要素を、dropTarget要素にする。onDropの関数において、
import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import Nouislider from 'react-nouislider';
import "./nonslider.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Z_ASCII } from "zlib";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
            planContent:["","","","","","",""],
            planStartTime: ["","","","","","",""],
            planEndTime: ["","","","","","",""],
        };
        //bindしてthisを代入
        this.changeMonth = this.changeMonth.bind(this);
        this.changeWeekandDay = this.changeWeekandDay.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.deletePlan = this.deletePlan.bind(this);
        this.changeTimes = this.changeTimes.bind(this);
        //this.changeContent = this.changeContent.bind(this);
        //this.addPlanContent = this.addPlanContent.bind(this);
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
    addPlanContent(event){
        //this.state.plansにpuchする(あまり好ましくはないかもしれない)
        this.state.plans.push({
            id: this.state.plans.length,
            date: this.state.year+"/"+this.state.month+"/"+event.target.name,
            startTime: this.state.planStartTime[event.target.id],
            endTime: this.state.planEndTime[event.target.id],
            plan: this.state.planContent[event.target.id]
        });
        //plansをthis.state.plansでsetState
        this.setState({
            plans: this.state.plans
        });
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
                <span>
                {this.state.choiceWeek.map((day, j) => {
                    //予定を入れるところの描画
                    if(day != null){
                    return <div key={`${j}`}>
                        {day}
                        <input type="text" id={j} name = "planContent" value={this.state.planContent[j]} onChange={event => this.changeContent(event)} />
                        Time
                        <input type="text" id={j} name = "planStartTime" value={this.state.planStartTime[j]} onChange={event => this.changeContent(event)}/>
                        ~
                        <input type="text" id={j} name = "planEndTime" value={this.state.planEndTime[j]} onChange={event => this.changeContent(event)}/>
                        <input type="button" name={day} value="追加" id={j} onClick={(event) => this.addPlanContent(event)}/>
                        </div>
                    }
                })}
                {this.state.plans.map(content => {
                    //予定の時間をバーで調節できる(実装中)
                    if(this.state.year+"/"+this.state.month+"/"+this.state.day == content.date){
                        console.log(this.state.day);
                        return <div className = "examples">{content.plan}
                        <Nouislider
                            start={[content.startTime, content.endTime]}
                            range={{
                            min: [0],
                            max: [24],
                            }}
                            step = {1}
                            pips={{ mode: 'count', values: 25 }}
                            onChange ={this.changeTimes(content)}
                            clickablePips
                        />
                        </div>
                    }
                })
                
                }
                </span>
            </Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
