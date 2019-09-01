import React, { Component } from 'react';
import './Tasks.css';
//import task
class Tasks extends Component {
    state = {
        items: [],
    };

    componentDidMount = () => {

    }

    render() {
        return (
            <div className="Tasks">
                {this.state.items.map((item)=>{
                    {/* <Task task = {item}/> */}
                })}
            </div>
        );
    }
}

export default Tasks;