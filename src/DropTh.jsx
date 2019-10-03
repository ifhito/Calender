import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import Nouislider from 'react-nouislider';
import "./nonslider.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Z_ASCII } from "zlib";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DnDContent from "./DnDContent.jsx";

export default class DropTh extends React.Component{
    constructor(props){
        super(props);
    }
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
                <Droppable droppableId={`${this.props.day}`}>
                    {(provided, snapshot) => {
                        return(<th key={`${this.props.i}${this.props.j}`} ref={provided.innerRef} data-title={this.props.day} width={this.props.width} height={this.props.height} onClick={event => this.changeWeekandDay(event)}>
                            {this.props.day}
                            {this.props.plans.map(
                                (content,id) => {
                                if(this.props.year+"/"+this.props.month+"/"+this.props.day == content.date){
                                            return (<DnDContent content={content} id={id} index={this.props.i+this.props.j} day={this.props.day} plans={this.props.plans} addPlanContent={this.props.addPlanContent}/>
                                            )
                                    }
                            })
                            }
                            {provided.placeholder}
                        </th>);}}                                              
                </Droppable>
        );
    }
}