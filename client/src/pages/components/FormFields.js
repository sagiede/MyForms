import React from 'react';
import FieldItem from './FieldItem'

import uuid from 'uuid';


export class FormFields extends React.Component {

    deleteField(id) {
        this.props.onDelete(id);
    }

    getFieldValues() {
        let refs = [];
        for (const ref in this.refs) {
            refs.push({label: this.refs[ref].props.field.label, value: this.refs[ref].refs['fieldInput'].value})
        }
        return refs
    }

    render() {
        let fieldItems;
        if (this.props.fields) {
            fieldItems = this.props.fields.map((field) => {
                return <FieldItem ref={uuid.v4()} key={uuid.v4()} field={field} onDelete={this.deleteField.bind(this)}/>
            });
        }
        return (
            <div className="FormFields bg-gray">
                <br/>
                <h3>Form Added Fields: </h3>
                <hr/>
                {fieldItems}
            </div>
        );
    }
}

export default FormFields
