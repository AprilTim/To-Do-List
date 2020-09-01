import React from "react";

const EditTask = (props) => {
    return(
        <div className="editTask">
            <div className="editTask_header">
                <h2 className="editTask_title">Задача
                №{props.editTask.id}</h2>
                <button onClick={() => props.deleteTask(props.editTask.id)}
                        className="btnText _red taskDelete">Удалить</button>
            </div>
            <p>Краткое описание</p>
            <input onBlur={props.updateTask}
                   onChange={props.onChangeEditTask}
                   value={props.editTask.value}
                   className="input"/>
            <div className="error">{props.editTask.isValid || 'Поле не может быть пустым'}</div>
            <button onClick={props.showEditTask}
                    className="btnText _blue"
                    value="">Вернуться в список
            </button>
        </div>
    )
}

export default EditTask;