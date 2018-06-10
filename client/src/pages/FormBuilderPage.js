import React from 'react';
import FormFields from './components/FormFields'
import AddField from './components/AddField'
import axios from 'axios'
import uuid from "uuid";

export class FormBuilderPage extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: [],
            form: {}
        }
    }

    addField(newField) {
        let fields = this.state.fields;
        fields.push(newField);
        this.setState(fields);
    }

    handleDeleteField(id) {
        let fields = this.state.fields;
        let index = fields.findIndex(x => x.id === id);
        fields.splice(index, 1);
        this.setState(fields);
    }

    handleSubmitField(e) {
        if (this.refs.label.value === '')
            alert('Please enter label');
        else if (this.refs.inputName.value === '')
            alert('Please enter input name');
        else
            this.setState({
                newField: {
                    id: uuid.v4(),
                    label: this.refs.label.value,
                    inputName: this.refs.inputName.value,
                    type: this.refs.type.value
                }
            }, function () {
                this.props.addField(this.state.newField)
            });

        e.preventDefault();
    }

    handleSubmitForm(e) {
        if (this.refs.formName.value === '')
            alert('Please enter Form Name');
        else if (this.state.fields.length === 0) {
            alert('Please enter at least one field');
        }
        else {
            let formFields = this.state.fields;
            let formName = this.refs.formName.value;
            const serverURL = 'http://127.0.0.1:5000/add_new_form';
            axios.post(serverURL, {formFields: formFields, formName: formName, formID: uuid.v4()}).then(res => {
                this.props.history.push('/')
            }).catch(err => console.log(err));
        }
    }

    componentWillMount() {
        this.setState(
            {
                fields: []
            }
        )
    }

    render() {
        return (
            <div className="row bg-light">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <h2>Please insert fields</h2>
                    <AddField addField={this.addField.bind(this)}/><br/>
                    <button onClick={this.handleSubmitForm.bind(this)} className="btn btn-primary">Add Form</button>
                    <label style={{paddingLeft: '20px', paddingRight: '20px'}}>Form Name - </label>
                    <input type="text" ref="formName"/>
                    <hr/>
                    <FormFields fields={this.state.fields} onDelete={this.handleDeleteField.bind(this)}/>
                </div>
                <div className="col-sm-3"></div>
            </div>
        );
    }


}
