import React from "react";
import ExitSvg from "./SVG/Exit";

const NewTask = (props) => {
    return(
        <div className="darkBackground">
            <div className="newTask">
                <div className="newTask_header">
                    <h2 className="newTask_title">Краткое описание</h2>
                    <button onClick={props.showNewTask} className="btnImg _red exit"><ExitSvg/></button>
                </div>
                <input onChange={props.onChangeNewTask} value={props.newTask.value} className="input"/>
                <div className="error">{props.newTask.isValid || 'Поле не может быть пустым'}</div>
                <button disabled={!props.newTask.isValid} onClick={props.createNewTask}
                        className="btnText _green">Создать
                </button>
            </div>
        </div>
    )
}

export default NewTask;