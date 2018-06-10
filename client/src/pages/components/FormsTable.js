import React from 'react';
import ReactBasicTable from 'react-basic-table';
import {Link} from 'react-router-dom';

export class FormsTable extends React.Component {

    render() {
        let table = undefined;
        if (this.props.formsDetails) {
            const formRows = this.props.formsDetails;
            const columns = ['Form Id', 'User Name', '# Submissions', 'Submit Page', 'Submission Page'];
            let rows = [];
            let i = 1;
            formRows.map((formRow => {
                let item = [
                    <span data-reactbasictable-value={i}>{i}</span>,
                    <span data-reactbasictable-value={formRow.formName}>{formRow.formName}</span>,
                    <span data-reactbasictable-value={formRow.subCount}>{formRow.subCount}</span>,
                    <Link id={formRow.username} to={"/SubmitPage/" + formRow.formID}>View</Link>,
                    <Link id={formRow.username} to={"/SubmissionPage/" + formRow.formID}>View</Link>
                ];
                i++;
                rows.push(item);
            }));
            table = <ReactBasicTable rows={rows} columns={columns}/>
        }
        return (
            <div>
                {table}
            </div>)
    }
}

export default FormsTable
