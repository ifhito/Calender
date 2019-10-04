import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import Nouislider from 'react-nouislider';
import "./nonslider.css"
import 'bootstrap/dist/css/bootstrap.css';
import { Z_ASCII } from "zlib";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

//日の予定の時間をスライダーで変化するためのコンポーネント
export default class PlanSlider extends React.Component{
    constructor(props){
        super(props);
    }
    //時間の変更をする関数
    changeTimes = Plan => value =>{
        //planのコピー
        let copyPlans = this.props.plans;
        //planの書き換え
        copyPlans.map( (plan,id) =>{
            if(plan.date.split("/")[2] == this.props.day && Plan.id == plan.id){
                plan.startTime = value[0];
                plan.endTime = value[1];
            }
        });
        //planの変更
        this.props.addPlanContent(copyPlans);
        //console.log(event);
    };
    render(){
        return (
            <div>
                {this.props.plans.map(content => {
                    //予定の時間をバーで調節できる
                    if(this.props.year+"/"+this.props.month+"/"+this.props.day == content.date){
                            return (
                                <div className = "examples">
                                    {content.plan}
                                    {/* Nouisliderはライブラリのコンポーネント */}
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
                            );
                        }
                })
                }
            </div>
        );
    }
}