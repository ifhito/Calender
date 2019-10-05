import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import Nouislider from 'react-nouislider'
import "../css/nonslider.css"
import { Z_ASCII } from "zlib"

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
        let num = 0;
        let pips = null;
        this.props.plans.map( content => {
            if(this.props.year+"/"+this.props.month+"/"+this.props.day == content.date){
                num +=1;
            }
        });
        return (
            <div className={"sliders"}>
                <div className={"title"}>{this.props.day} days scheduled time</div>
                <div className={"Content"}>
                    {this.props.plans.map(content => {
                        {/* console.log(num); */}
                        //予定の時間をバーで調節できる
                        if(this.props.year+"/"+this.props.month+"/"+this.props.day == content.date){

                            //最後のスライダーの下に目盛りを表示させる
                            num -=1;
                            if(num==0){
                                pips = { mode: 'count', values: 25 };
                            }

                            return (
                                <div className={"sliderContent"}>
                                    <span className={"planName"}>
                                        {content.plan}
                                    </span>
                                        {/* Nouisliderはライブラリのコンポーネント */}
                                        <div className={"slider"}>
                                        <Nouislider
                                            start={[content.startTime, content.endTime]}
                                            range={{
                                            min: [0],
                                            max: [24],
                                            }}
                                            step = {1}
                                            pips={pips}
                                            onChange ={this.changeTimes(content)}
                                            clickablePips
                                        />
                                        </div>
                                </div>
                            );
                        }
                    })
                    }
                </div>
            </div>
        );
    }
}