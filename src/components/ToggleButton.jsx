import React, { Component } from 'react';

export default class ToggleButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isToggled: false,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        let icon = this.state.isToggled ? this.props.imageOn : this.props.imageOff;
        return (
            <div id={this.props.id} className="ToggleButton">
                <button onClick={()=>{this.handleClick()}}>
                    <i alt="" className="material-icons">{icon}</i>
                </button>
            </div>
        );
    }

    handleClick() {
        let isToggled = !this.state.isToggled;

        this.setState({
            isToggled: isToggled,
        });

        if(this.props.onToggle) {
            this.props.onToggle(isToggled);
        }
    }
}