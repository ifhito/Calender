import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import { Z_ASCII } from "zlib";
import { DragDropContext } from "react-beautiful-dnd";
import Tr from "./Tr.jsx";
import PlanSlider from "./PlanSlider.jsx"
import SetWeekPlan from "./setWeekPlan.jsx"

//Tableの親コンポーネント
export default class DragDropTable extends React.Component{
    constructor(props){
        super(props);
        //今日の日付の取得
        const today = new Date().getDate()
        this.state ={
            day: today,
            choiceweek: this.props.calendar[Math.ceil(today/7) - 1],
            plans: [],
            scheduleStyle: {
                height: 0,
                padding: 0,
                overflow: "hidden",
                opacity: 0,
            }
        }
        //thisでbindしておく
        this.onDragEnd = this.onDragEnd.bind(this);
        this.changeWeekandDay = this.changeWeekandDay.bind(this);
        this.addPlanContent = this.addPlanContent.bind(this);
        this.close = this.close.bind(this);
    }
    //ドラッグ&ドロップが終わった際に発火
    onDragEnd(result){
        //ドロップ先のIDとドラックしたコンテンツのIDを取得
        const {destination, draggableId} = result;
        //planのコピーを作成
        let copyPlans = this.state.plans;
        //planのコピーのdateを書き換える
        copyPlans.map((plan,id) => {
            if(id==draggableId){
                copyPlans[id].date = copyPlans[id].date.split("/")[0]+"/"+copyPlans[id].date.split("/")[1]+"/"+destination.droppableId;
            }
        });
        //addPlanContentで親要素のstate.planの書き換え
        this.addPlanContent(copyPlans);
    }
    //予定の設定を行う部分を見えなくする
    close(){
        const style={
            height: 0,
            padding: 0,
            overflow: "hidden",
            opacity: 0
        }
        this.setState({scheduleStyle: style});
    }

    //カレンダーをクリックすると週の変更が行われるメソッド
    changeWeekandDay(choiceDay){
        console.log(choiceDay);
        if(choiceDay != "delete"){
            //週のstateを変更
            if(choiceDay != null){
                //予定を設定する部分が表示されるようにstyleを用意
                const style={
                    padding: 10+"px"+" 0",
                    height: "auto",
                    opacity: 1,
                    margin: 5+"px"
                }
                //選択していた日が含まれていればその週を選択した週とする
                this.props.calendar.map(week =>{
                    // console.log(choiceDay); 
                    if(week.includes(parseInt(choiceDay))){
                        this.setState({choiceweek: week});
                    }
                });
                this.setState({
                    day: choiceDay,
                    scheduleStyle: style
                });
            }
        }
    }
    //planをカレンダー上に入れるためのメソッド(onClick)
    addPlanContent(newPlans){
        //plansをthis.state.plansでsetState
        this.setState({
            plans: newPlans
        });
    }
    render(){
        console.log(this.state.plans);
        return (
            // ドラッグ&ドロップを可能にするためコンポーネントで囲う
            <DragDropContext onDragEnd={this.onDragEnd}>
                    {/* ヘッダー要素の用意 */}
                    <div className={"tr"}>
                        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day,i)=>{
                            return <div key={i}className={"th-head"}>{day}</div>;
                        })}
                    </div>
                    {this.props.calendar.map((week, i) => {
                        //カレンダーの表の内部を作成
                        //console.log(week, this.state.choiceWeek, this.state.day,this.state.choiceWeek == week)
                        return(
                            <div key={week.join("")+i}>
                                {/* 行要素を作るコンポーネント */}
                                <Tr
                                    week={week}
                                    i={i}
                                    plans={this.state.plans}
                                    year={this.props.year}
                                    month={this.props.month}
                                    day={this.state.day}
                                    changeWeekandDay={this.changeWeekandDay}
                                    addPlanContent={this.addPlanContent}
                                />
                                {/* 現在、選択されている日が含まれた週の場合は予定の設定を行う部分を表示する */}
                                {week.includes(parseInt(this.state.day)) && (
                                    <div key={"weeks"+i} className={"container2"} style={this.state.scheduleStyle}>
                                        <button　className={"closedButton"} onClick={this.close}>×</button>
                                        {/* 週の予定を設定するためのコンポーネント */}
                                        <div className={"setting"}>
                                            <SetWeekPlan
                                                plans={this.state.plans}
                                                year={this.props.year}
                                                month={this.props.month}
                                                day={this.state.day}
                                                choiceweek={this.state.choiceweek}
                                                addPlanContent={this.addPlanContent}
                                                changeWeekandDay={this.changeWeekandDay}
                                            />
                                            {/* 選択している日の予定を調整するスライダーのコンポーネント */}
                                            <PlanSlider
                                                plans={this.state.plans}
                                                year={this.props.year}
                                                month={this.props.month}
                                                day={this.state.day}
                                                addPlanContent={this.addPlanContent}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                            
                    })}
            </DragDropContext>
        );
    }
}