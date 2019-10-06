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
    render(){
        /* 今日であった場合はマスの色を変化させる */
        let color = "#f7f1e3";
        if(this.props.day == new Date().getDate() && this.props.year == new Date().getFullYear() && this.props.month == new Date().getMonth() + 1){
            color = "#ffeaa7";
        }else if(this.props.choiceDay == this.props.day){
            color = "#74b9ff";
        }
        return (
            <div 
                className={"th"}
                valign="top"
                style={{backgroundColor:color}}
            >
            {this.props.day}
            <Droppable droppableId={`${this.props.day}`}>
                {(provided, snapshot) => {
                    return(
                        <div
                            className={"dropSpace"}
                            key={`${this.props.i}${this.props.j}`}
                            data-title={this.props.day}
                            onClick={event => this.props.changeWeekandDay(event.target.getAttribute("data-title"))}
                            ref={provided.innerRef}
                        >
                        {provided.placeholder}
                        {this.props.plans.map(
                            (content,id) => {
                            //plansのなかに予定が存在する場合は表に中身を追加
                            if(this.props.year+"/"+this.props.month+"/"+this.props.day == content.date){
                                        return (
                                            //表の中身
                                            <DnDContent
                                                key={"drop"+id}
                                                content={content}
                                                id={id} 
                                                index={this.props.i+this.props.j}
                                                day={this.props.day} plans={this.props.plans}
                                                addPlanContent={this.props.addPlanContent}
                                            />
                                        )
                                }
                        })
                        }
                    </div>);}}                                              
            </Droppable>
            </div>
        );
    }
}