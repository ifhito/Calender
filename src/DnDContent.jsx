import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import Nouislider from 'react-nouislider';
import "./nonslider.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Z_ASCII } from "zlib";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";


export default class DnDContent extends React.Component{
    constructor(props){
        super(props);
    }
    deletePlan(event){
        let copyPlans = this.props.plans;
        this.props.plans.map( (plan,id) =>{
            if(String(id) == event.target.id){
                console.log(event.target.id);
                copyPlans.splice(id,1);
            }
        });
        this.props.addPlanContent(copyPlans);
    }
    render(){
        return (
            <Draggable draggableId={`${this.props.id}`} index={this.props.index}>
                {(provided, snapshot) => {
                return (
                    <div ref={provided.innerRef} 
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    data-title={this.props.day}>
                        {this.props.content.plan}<button id={`${this.props.id}`} data-title={"delete"} onClick = {event => this.deletePlan(event)}>×</button>
                    </div>
                );}}
            </Draggable>
        );
    }
}