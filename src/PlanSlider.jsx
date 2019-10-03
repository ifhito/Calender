import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import Nouislider from 'react-nouislider';
import "./nonslider.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Z_ASCII } from "zlib";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default class PlanSlider extends React.Component{
    render(){
        return (
            <div>{this.props.plans.map(content => {
            //予定の時間をバーで調節できる
            if(this.props.year+"/"+this.props.month+"/"+this.props.day == content.date){
                    return (
                        <div className = "examples">
                            {content.plan}
                            <Nouislider
                                start={[content.startTime, content.endTime]}
                                range={{
                                min: [0],
                                max: [24],
                                }}
                                step = {1}
                                pips={{ mode: 'count', values: 25 }}
                                onChange ={this.props.changeTimes(content)}
                                clickablePips
                            />
                        </div>
                    );
                }
            })
            }</div>
        );
    }
}