import React from 'react';
import './App.css';
import * as axios from "axios";
import Header from "./Components/Header";
import Table from "./Components/Table";
import NewTask from "./Components/NewTask";
import EditTask from "./Components/EditTask";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isNewTask: false,
            newTask: {
                isValid: false,
                value: ''
            },
            isEditTask: false,
            editTask: {
                isValid: true,
                id: '',
                value: ''
            }
        }
    }

    instance = axios.create({
        baseURL: "https://test.megapolis-it.ru/api/list"
    })

    //Загрузка списка задач с сервера и упаковка его в state.
    componentDidMount() {
        return this.instance.get()
            .then(response => {
                this.setState({
                    ...this.state,
                    data: response.data.data
                })
            })
    }

    //Показать или скрыть окно добавления новой задачи.
    showNewTask = () => {
        this.setState({
            ...this.state,
            isNewTask: !this.state.isNewTask
        })
    }

    //Запрос на создание новой задачи и добавление ее в state.
    createNewTask = () => {
        return this.instance.post("https://test.megapolis-it.ru/api/list", {title: this.state.newTask.value})
            .then(response => {
                if (response.data.success) {
                    let newTask = {
                        id: response.data.id,
                        title: this.state.newTask.value
                    }
                    this.setState({
                        ...this.state,
                        data: [...this.state.data, newTask],
                        newTask: {...this.state.data, value: ""}
                    })
                }
            })
    }

    //Реагирование на изменение поля ввода новой задачи для отрисовки его через state.
    onChangeNewTask = (e) => {
        let text = e.currentTarget.value
        this.setState({
            ...this.state,
            newTask: {...this.state.newTask, value: text}
        }, () => this.checkValidNewTask(text))
    }

    //Проверка поля ввода новой задачи на валидность. Принимает в себя текст из поля ввода новой задачи.
    checkValidNewTask = (text) => {
        if (text !== '') {
            this.setState({
                ...this.state,
                newTask: {...this.state.newTask, isValid: true}
            })
        } else {
            this.setState({
                ...this.state,
                newTask: {...this.state.newTask, isValid: false}
            })
        }
    }

    //Показать или скрыть страницу редактирования задачи, принимает в себя ID и текст редактируемой задачи
    showEditTask = (id, title) => {
        if (this.state.isEditTask) {
            this.setState({
                ...this.state,
                isEditTask: !this.state.isEditTask
            })
        } else {
            this.setState({
                ...this.state,
                isEditTask: !this.state.isEditTask,
                editTask: {
                    ...this.state.editTask,
                    id: id,
                    value: title
                }
            })
        }
    }

    //Реагирование на изменение поля ввода редактируемой задачи для отрисовки его через state.
    onChangeEditTask = (e) => {
        let text = e.currentTarget.value
        this.setState({
            ...this.state,
            editTask: {...this.state.editTask, value: text}
        }, () => this.checkValidEditTask(text))
    }

    //Проверка поля ввода новой задачи на валидность. Принимает в себя текст из поля ввода новой задачи.
    checkValidEditTask = (text) => {
        if (text !== '') {
            this.setState({
                ...this.state,
                editTask: {...this.state.editTask, isValid: true}
            })
        } else {
            this.setState({
                ...this.state,
                editTask: {...this.state.editTask, isValid: false}
            })
        }
    }

    //Запрос обновления задачи на сервер и добавление ее в state.
    updateTask = (e) => {
        if(this.state.editTask.isValid) {
            let id = this.state.editTask.id
            let text = e.currentTarget.value
            return this.instance.post(`${id}`, {title: text})
                .then(response => {
                    this.setState({
                        ...this.state,
                        data: this.state.data.map(el => ({
                            ...el,
                            title: el.id === this.state.editTask.id ? text : el.title
                        }))
                    })
                })
        }
    }

    //Запрос на удаление задачи на сервер и удаление ее из state. Принимает в себя ID удаляемой задачи.
    deleteTask = (id) => {
        return this.instance.delete(`${id}`)
            .then(response => {
                let newData = this.state.data.filter(n => n.id !== id)
                this.setState({
                    ...this.state,
                    data: newData,
                    isEditTask: false
                })
            })
    }

    render() {

        return (
            <div className="main">
                {!this.state.isEditTask ? <>
                    <Header showNewTask={this.showNewTask}/>

                    <Table data={this.state.data}
                           showEditTask={this.showEditTask}
                           deleteTask={this.deleteTask}/>

                    {this.state.isNewTask && <NewTask showNewTask={this.showNewTask}
                                                      onChangeNewTask={this.onChangeNewTask}
                                                      newTask={this.state.newTask}
                                                      createNewTask={this.createNewTask}/>}</>

                : <EditTask editTask={this.state.editTask}
                            deleteTask={this.deleteTask}
                            updateTask={this.updateTask}
                            onChangeEditTask={this.onChangeEditTask}
                            showEditTask={this.showEditTask}/>
            }
            </div>
        );
    }
}

export default App;
