import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';

class Switcher extends Component {
    state = {};

    render() {
        return (
            <div className="switcher-wrapper">
                <div>Listener</div>
                <Switch
                    onChange={this.props.changeMode}
                    className="switcher"
                    color="primary"
                />
                <div>Emitter</div>
            </div>
        );
    }
}

export default Switcher;
