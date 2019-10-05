import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import Nouislider from 'react-nouislider';
import "./nonslider.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Z_ASCII } from "zlib";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

//月を変更する
export default class ChangeMonth extends React.Component{
    render(){
        return (
                <div className={"changeMonth"}>
                    <button onClick = {() => this.props.changeMonth(-1)}>＜＜</button>
                    <span>{this.props.year}年{this.props.month}月</span>
                    <button onClick = {() => this.props.changeMonth(1)}>＞＞</button>
                </div>
        );
    }
}