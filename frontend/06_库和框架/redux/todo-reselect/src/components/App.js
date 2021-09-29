import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
    <div>
        <AddTodo />
        <VisibleTodoList listId="1"/>
        <VisibleTodoList listId="2"/>
        <VisibleTodoList listId="3"/>
        <Footer />
    </div>
)

export default App