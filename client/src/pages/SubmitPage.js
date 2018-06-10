import React from 'react';
import {reduce} from 'rambda';
import axios from 'axios'
import BasicForm from "./components/BasicForm";

export class SubmitPage extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: [],
        }
    }

    getData() {
        const serverURL = 'http://127.0.0.1:5000/get_form_fields';
        return axios.get(serverURL, {params: {formID: this.props.match.params.formID}}).then(res => {
            return res;
        })
    }

    componentWillMount() {
        this.getData().then(res => {
            this.setState(
                {
                    fields: res.data.formFields
                }
            )
        }).catch(err => console.log(err))
    }


    checkFields(fields) {
        return reduce((keepChecking, currRef) => (keepChecking && currRef.value !== ''), true, fields)
    }

    handleSubmitForm(e) {
        let inputRefs = this.refs.formFields.getFieldValues();
        if (!this.checkFields(inputRefs))
            alert('Please fill all of the fields');
        else {
            const serverURL = 'http://127.0.0.1:5000/add_submission';
            axios.post(serverURL, {refs: inputRefs, formID: this.props.match.params.formID}).then(res => {
                this.props.history.push('/FormListPage')
            }).catch(err => console.log(err));
        }
    }

    render() {
        return (
            <div className="row bg-light">
                <div className="col-sm-3"></div>
                <div className="col-sm-6">
                    <BasicForm ref='formFields' fields={this.state.fields}/>
                    <button onClick={this.handleSubmitForm.bind(this)} className="btn btn-primary">submit Form</button>
                </div>
                <div className="col-sm-3"></div>
            </div>
        );
    }
}
