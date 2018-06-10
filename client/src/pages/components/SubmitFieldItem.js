import React from 'react';

export class SubmitFieldItem extends React.Component {


    render() {
        return (
            <li className="form-group">
                <label htmlFor={this.props.field.label}>{this.props.field.label}</label>
                <input className="form-control" ref='fieldInput' type={this.props.field.type}
                       name={this.props.field.inputName} id={this.props.field.id}/>
                <hr/>
            </li>
        );
    }
}

export default SubmitFieldItem
