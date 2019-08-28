import React, { Component } from "react";
import { getOnDuty } from '../gcal';
import '../style/OnDuty.css';

class OnDuty extends Component {
    state = {
        tas: []
    }

    componentWillMount() {
        getOnDuty((tas) => {
            this.setState({tas})
        });
    }

    componentDidMount() {
        window.setInterval(function () {
            getOnDuty((tas) => {
                this.setState({tas});
            })
        }.bind(this), 10000);
    }

    fileType = (name) => {
        const exts = [".png", ".jpg", ".jpeg", ".JPG", ".gif"];
        let type;
        for (let i = 0; i < exts.length; i++) {
            try {
                require('../references/ta_pics/' + name + exts[i]);
                type = exts[i];
            } catch (e) {} // I know this is jank, I'm sorry
        }
        return type;
    }

    render() {
        return (
            <div className="OnDuty">
                <div id="onduty_title">TAs On Duty</div>
                <div id="onduty_tas">
                { 
                    this.state.tas && this.state.tas.map((ta, index) => (
                        <div id="onduty_ta" key={index}>
                            <img 
                                id="onduty_pic" 
                                alt={ta.name}
                                src={require(
                                    '../references/ta_pics/' 
                                    + ta.name.toLowerCase() 
                                    + this.fileType(ta.name.toLowerCase()))} 
                            />
                            <div id="onduty_name">{ta.name}</div>
                        </div>
                    ))
                }
                </div>
            </div>
        );
    }
}

export default OnDuty;