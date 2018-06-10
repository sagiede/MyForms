import React from 'react';

export class SubmissionLabelItem extends React.Component {

    render() {
        return (
            <ul className="FieldItem">
                <label style={{margin: '10px'}} className="label label-default" htmlFor={this.props.label} >{this.props.label}:</label>
                <label htmlFor={this.props.value} >{this.props.value}</label>
            </ul>
        );
    }
}
export default SubmissionLabelItem
