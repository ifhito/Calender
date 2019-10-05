import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import { Z_ASCII } from "zlib";
import { Droppable } from "react-beautiful-dnd";
import DnDContent from "./DnDContent.jsx";

//テーブルマスのコンポーネント
export default class DropTh extends React.Component{
    constructor(props){
        super(props);
    }
    //現在のweekとdayの変更(クリックした週とその日の予定設定画面の表示)
    changeWeekandDay(event){
        if(event.target.getAttribute("data-title") != "delete"){
            //クリックした週を格納
            const choiceDay = event.target.getAttribute("data-title");
            //週のstateを変更
            if(choiceDay != null){
                this.props.changeWeekandDay(choiceDay);
            }
        }
    }
    render(){
        return (
            //DropできるthにするためにライブラリのコンポーネントDroppableで囲んでいる
            <Droppable droppableId={`${this.props.day}`}>
                {(provided, snapshot) => {
                    {/* 今日であった場合はマスの色を変化させる */}
                    let color = "#ffffff";
                    if(this.props.day == new Date().getDate() && this.props.year == new Date().getFullYear() && this.props.month == new Date().getMonth() + 1){
                        color = "#00bfff";
                    }else if(this.props.choiceDay == this.props.day){
                        color = "#fffacd";
                    }
                    return(
                        <div
                            className={"th"}
                            valign="top"
                            key={`${this.props.i}${this.props.j}`}
                            ref={provided.innerRef}
                            data-title={this.props.day}
                            onClick={event => this.changeWeekandDay(event)}
                            style={{backgroundColor:color}}
                        >
                        {this.props.day}
                        {this.props.plans.map(
                            (content,id) => {
                            //plansのなかに予定が存在する場合は表に中身を追加
                            if(this.props.year+"/"+this.props.month+"/"+this.props.day == content.date){
                                        return (
                                            //表の中身
                                            <DnDContent 
                                                content={content}
                                                id={id} index={this.props.i+this.props.j}
                                                day={this.props.day} plans={this.props.plans}
                                                addPlanContent={this.props.addPlanContent}
                                            />
                                        )
                                }
                        })
                        }
                        {provided.placeholder}
                    </div>);}}                                              
            </Droppable>
        );
    }
}