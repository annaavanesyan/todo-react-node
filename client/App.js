import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SwitcherModes from './constants/SwitcherModes';

import Switcher from './components/Switcher';
import Listener from './components/Listener';
const globalURL = 'http://localhost:4567/';

class App extends Component {
    state = {
        mode: SwitcherModes.LISTENER,
        listeners: [],
        emitters: [],
        items: [],
        loading: true,
        todoItem: ''
    };

    changeMode = (event, checked) => {
        this.setState({
            mode: checked ? SwitcherModes.EMITTER : SwitcherModes.LISTENER
        });
    };

    componentDidMount = () => {
        fetch(`${globalURL}items`)
            .then(res => res.json())
            .then(items => {
                return this.setState({ items, loading: false });
            });
    };

    addItem = e => {
        e.preventDefault();

        fetch(`${globalURL}items`, {
            method: 'POST',
            body: JSON.stringify({ item: this.state.todoItem }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(items => {
                this.setState({ items, todoItem: '' });
            });
    };

    deleteItem = id => {
        console.log(id);
        fetch(`${globalURL}items/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(items => {
                this.setState({ items });
            });
    };

    render() {
        return (
            <div className="App">
                <nav className="navbar navbar-light mb-0 bg-light">
                    <span className="navbar-brand h1">
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="logo"
                        />
                        Socket Client
                    </span>
                </nav>
                <Switcher changeMode={this.changeMode} />
                <div className="emitters-wrapper">
                {this.state.emitters.map((item, i) => {
                        return <tr key={i} className="emitter"></tr>;
                    })}
                </div>
                <div className="px-3 py-2">
                    <form
                        className="form-inline my-3 align-items-center"
                        onSubmit={this.addItem}
                    >
                        <div className="form-group mb-2 col-8  col-sm-10 align-items-center">
                            <input
                                type="text"
                                value={this.state.todoItem}
                                onChange={e => {
                                    this.setState({
                                        todoItem: e.target.value
                                    });
                                }}
                                className="form-control col-12"
                                id="inlineFormInputName"
                                placeholder="what's next?"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mb-2">
                            Submit
                        </button>
                    </form>

                    {this.state.loading && (
                        <p className="align-self-center">Loading...</p>
                    )}

                    {!this.state.loading && this.state.items.length === 0 && (
                        <div className="alert alert-secondary" role="alert">
                            All Done! - No Items Left
                        </div>
                    )}

                    {
                        <table className="table table-hover table-striped">
                            <tbody>
                                {this.state.items.map((item, i) => {
                                    return (
                                        <tr key={item.id} className="row">
                                            <td className="col-1">{i + 1}</td>
                                            <td className="col-10">
                                                {item.item}
                                            </td>
                                            <td className="col-1">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        this.deleteItem(item.id)
                                                    }
                                                    aria-label="Close"
                                                    className="close"
                                                >
                                                    <span aria-hidden="true">
                                                        &times;
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        );
    }
}

export default App;
