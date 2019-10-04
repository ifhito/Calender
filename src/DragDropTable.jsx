import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import Nouislider from 'react-nouislider';
import "./nonslider.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Z_ASCII } from "zlib";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Tr from "./Tr.jsx";

//Tableの親コンポーネント
export default class DragDropTable extends React.Component{
    constructor(props){
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    //ドラッグ&ドロップが終わった際に発火
    onDragEnd(result){
        //ドロップ先のIDとドラックしたコンテンツのIDを取得
        const {destination, draggableId} = result;
        //planのコピーを作成
        let copyPlans = this.props.plans;
        //planのコピーのdateを書き換える
        copyPlans.map((plan,id) => {
            if(id==draggableId){
                copyPlans[id].date = copyPlans[id].date.split("/")[0]+"/"+copyPlans[id].date.split("/")[1]+"/"+destination.droppableId;
            }
        });
        //addPlanContentで親要素のstate.planの書き換え
        this.props.addPlanContent(copyPlans);
    }
    render(){
        return (
                <DragDropContext onDragEnd={this.onDragEnd}>
                <table　table-layout={"fixed"}>
                <thead>
                    <tr>
                        <th>日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th>土</th>
                    </tr>
                </thead>
                    <tbody>
                        {this.props.calendar.map((week, i) => {
                            //カレンダーの表の内部を作成
                            return(
                                <Tr
                                    week={week}
                                    i={i} plans={this.props.plans}
                                    year={this.props.year}
                                    month={this.props.month}
                                    day={this.props.day}
                                    changeWeekandDay={this.props.changeWeekandDay}
                                    addPlanContent={this.props.addPlanContent}
                                />);
                        })}
                    </tbody>
                </table>
                </DragDropContext>
        );
    }
}