import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import Nouislider from 'react-nouislider';
import "./nonslider.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Z_ASCII } from "zlib";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DropTh from "./DropTh.jsx";
//カレンダーの一行の定義
export default class Tr extends React.Component{
    render(){
        return (
            <div className={"tr"} key={this.props.week.join("")}>
                {this.props.week.map((day, j) => { 
                    let width = "";
                    let height = "";
                    //予定の有る無しでwidth,heightの変更
                    {/* if(this.props.plans.length != 0){
                        this.props.plans.map(content => {
                            if(this.props.year+"/"+this.props.month+"/"+day == content.date){
                                width = "100";
                                height = "100";
                            }else{
                                width = "100";
                                height = "100";
                            }
                        })
                    }else{
                        width = "100";
                        height = "100";
                    } */}
                    //マスのReturn
                    return(
                        <DropTh 
                        changeWeekandDay={this.props.changeWeekandDay}
                        addPlanContent={this.props.addPlanContent}
                        day={day}
                        choiceDay={this.props.day}
                        i={this.props.i}
                        j={j}
                        width={width}
                        height={height}
                        year={this.props.year}
                        month={this.props.month}
                        plans={this.props.plans}
                        />
                        );
                })}
            </div>
        );
    }
}