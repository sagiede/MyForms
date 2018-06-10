import React from 'react';
import uuid from 'uuid';
import SubmitFieldItem from "./SubmitFieldItem";


export class BasicForm extends React.Component {


    getFieldValues() {
        let refs = [];
        for (const ref in this.refs) {
            refs.push({label: this.refs[ref].props.field.label, value: this.refs[ref].refs['fieldInput'].value})
        }
        return refs
    }

    render() {
        let submitFieldItems;
        if (this.props.fields) {
            submitFieldItems = this.props.fields.map((field) => {
                return <SubmitFieldItem ref={uuid.v4()} key={uuid.v4()} field={field}/>
            });
        }
        return (
            <div>
                <h3>Please fill the next form</h3>
                <br/>
                <hr/>
                {submitFieldItems}
            </div>
        );
    }
}

export default BasicForm
