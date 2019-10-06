import React,{Fragment} from "react"
import ReactDOM from "react-dom"
import { Z_ASCII } from "zlib";

//月を変更する
export default class ChangeMonth extends React.Component{
    render(){
        // 数字を月の名前に変化させるための配列
        const monthName = {
            1: "JANUARY",
            2: "FEBRUARY",
            3: "MARCH",
            4: "APRIL",
            5: "MAY",
            6: "JUNE",
            7: "JULY",
            8: "AUGUST",
            9: "SEPTEMBER",
            10: "OCTOBER",
            11: "NOVEMBER",
            12: "DECEMBER"
        }
        return (
                    
                    <div className={"MonthAndYear"}>
                        <div className={"Year"}>{this.props.year}</div>
                        <div className={"Month"}>
                            <button className={"monthButton"} onClick = {() => this.props.changeMonth(-1)}>{"《"}</button>
                                <div>{monthName[this.props.month]}</div>
                            <button className={"monthButton"} onClick = {() => this.props.changeMonth(1)}>{"》"}</button>
                        </div>
                    </div>
                    
        );
    }
}