import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import { Z_ASCII } from "zlib";
import DropTh from "./DropTh.jsx";

//カレンダーの一行のコンポーネント
export default class Tr extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={"tr"} key={this.props.week.join("")}>
                {this.props.week.map((day, j) => { 
                    //マスのReturn
                    return(
                        <DropTh 
                        key={"Drop"+j}
                        changeWeekandDay={this.props.changeWeekandDay}
                        addPlanContent={this.props.addPlanContent}
                        day={day}
                        choiceDay={this.props.day}
                        i={this.props.i}
                        j={j}
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