import React from 'react';
import SubmissionLabelItem from "./SubmissionLabelItem";
import uuid from "uuid";


export class SubmissionItem extends React.Component {

    render() {
        let labelItems;
        if (this.props.sub) {
            labelItems = this.props.sub.map((label) => {
                return <SubmissionLabelItem key={uuid.v4()} label={label.label} value={label.value}/>
            });
        }
        return (
            <div>
                {labelItems}
                <hr/>
            </div>
        );
    }
}

export default SubmissionItem
