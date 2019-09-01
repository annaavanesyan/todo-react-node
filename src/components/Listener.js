import React, { Component } from 'react';

class Listener extends Component {
    state = { event: '' };
    render() {
        return (
            <div className="listener">
                <div className="event">
                    <p>message-event: </p>
                    <input type="text" />
                </div>
            </div>
        );
    }
}

export default Listener;
