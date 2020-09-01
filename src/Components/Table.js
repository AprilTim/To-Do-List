import React from "react";
import EditSvg from "./SVG/Edit";
import DeleteSvg from "./SVG/Delete";

const Table = (props) => {
    return(
        <table className="table">
            {props.data.map(el => <tr key={el.id} className="tableRow">
                    <td className="tableCeil taskNum">{el.id}</td>
                    <td className="tableCeil taskDescription">{el.title}</td>
                    <td className="tableCeil taskControl">
                        <div className="table_btn">
                            <button onClick={() => props.showEditTask(el.id, el.title)}
                                    className="btnImg _green taskEdit">
                                <EditSvg/>
                            </button>
                            <button onClick={() => props.deleteTask(el.id)}
                                    className="btnImg _red taskDelete">
                                <DeleteSvg/></button>
                        </div>
                    </td>
                </tr>
            )}
        </table>
    )
}

export default Table;