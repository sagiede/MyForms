import React from 'react';

export class FieldItem extends React.Component {

    deleteField(id) {
        this.props.onDelete(id);
    }

    render() {
        return (
            <li className="form-group">
                <label htmlFor={this.props.field.label}>{this.props.field.label}</label>
                <input style={{padding: '20px'}} className="form-control" ref='fieldInput' type={this.props.field.type}
                       name={this.props.field.inputName} id={this.props.field.id}/>
                <button style={{margin: '20px'}} type="button"
                        onClick={this.deleteField.bind(this, this.props.field.id)}>Delete Field
                </button>
                <hr/>
            </li>
        );
    }
}

export default FieldItem
