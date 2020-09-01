import React from "react";

const Header = (props) => {
    return(
        <header className="header">
            <h1 className="title">Список задач</h1>
            <button onClick={props.showNewTask} className="btnText _green addTask">Добавить</button>
        </header>
    )
}

export default Header;