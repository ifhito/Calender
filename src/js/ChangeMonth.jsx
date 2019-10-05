import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import { Z_ASCII } from "zlib";

//月を変更する
export default class ChangeMonth extends React.Component{
    render(){
        // 数字を月の名前に変化させるための配列
        const monthName = {
            1: "JAN",
            2: "FEB",
            3: "MAR",
            4: "APR",
            5: "MAY",
            6: "JUN",
            7: "JUL",
            8: "AUG",
            9: "SEP",
            10: "OCT",
            11: "NOV",
            12: "DEC"
        }
        return (
                <div className={"changeMonth"}>
                    <span className={"Year"}>{this.props.year}</span>
                    <span className={"Month"}>
                        <button className={"monthButton"} onClick = {() => this.props.changeMonth(-1)}>{"《"}</button>
                        <span>{monthName[this.props.month]}</span>
                        <button className={"monthButton"} onClick = {() => this.props.changeMonth(1)}>{"》"}</button>
                    </span>
                    <span className={"Year"}></span>
                </div>
        );
    }
}