import React, { Component } from "react";
import '../style/Header.css';

class Header extends Component {
    state = {
        hours: '00',
        mins: '00',
        secs: '00',
        ampm: 'AM'
    }

    setTime() {
        const now = new Date();
        let hours = now.getHours();
        let ampm = "AM";
        if (hours === 0) { hours = 12; }
        else if (hours === 12) { ampm = "PM"; }
        else if (hours > 12) { hours %= 12; ampm = "PM"; }
        const mins = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
        const secs = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();  

        this.setState({
            hours: hours,
            mins: mins,
            secs: secs,
            ampm: ampm
        });
    }

    componentWillMount() {
        this.setTime();
    }

    componentDidMount() {
        window.setInterval(function () {
            this.setTime();
        }.bind(this), 1000);
    }

    render() {
        return (
            <div className="Header">
                <div id="header_cs1332">CS 1332</div>
                <div id="header_info">
                    <div id="header_info_title">The Hashboard</div>
                    <div id="header_info_version">Version A</div>
                </div>
                <div id="header_time">{this.state.hours}:{this.state.mins} {this.state.ampm}</div>
            </div>
        );
    }
}

export default Header;