import React from 'react';
import uuid from 'uuid';


export class AddField extends React.Component {
    constructor() {
        super();
        this.state = {
            newField: {}
        }
    }

    handleSubmitField(e) {
        if (this.refs.label.value === '')
            alert('Please enter label');
        else if (this.refs.inputName.value === '')
            alert('Please enter input name');
        else {
            this.setState({
                newField: {
                    id: uuid.v4(),
                    label: this.refs.label.value,
                    inputName: this.refs.inputName.value,
                    type: this.refs.type.value
                }
            }, function () {
                this.props.addField(this.state.newField)
                this.refs.label.value = '';
                this.refs.inputName.value = '';
                this.refs.type.value = 'text';
            });
        }
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmitField.bind(this)}>
                    <div className="form-group">
                        <label>field label : </label>
                        <input className="form-control" type="text" ref="label"/><br/><br/>
                    </div>
                    <div className="form-group">
                        <label>input name : </label>
                        <input className="form-control" type="text" ref="inputName"/><br/><br/>
                    </div>
                    <div className="form-group">
                        <label>input type : </label>
                        <select className="form-control" ref="type">
                            <option value="text"> Text</option>
                            <option value="color"> Color</option>
                            <option value="date"> Date</option>
                            <option value="email"> Email</option>
                            <option value="tel"> Tel</option>
                            <option value="number"> Number</option>
                        </select>
                    </div>
                    <br/>
                    <input className="btn btn-default" type="submit" value="Add Field"/>
                    <hr/>
                </form>
            </div>
        );
    }
}

export default AddField
