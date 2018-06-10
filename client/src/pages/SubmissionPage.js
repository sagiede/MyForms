import React from 'react';
import axios from 'axios'
import SubmissionItem from "./components/SubmissionItem";
import uuid from "uuid";

export class SubmissionPage extends React.Component {
    constructor() {
        super();
        this.state = {
            submissions: {},
        }
    }

    getData() {
        const serverURL = 'http://127.0.0.1:5000/get_form_submissions';
        return axios.get(serverURL, {params: {formID: this.props.match.params.formID}}).then(res => {
            return res;
        })
    }

    componentWillMount() {
        this.getData().then(data => {
            this.setState(
                {
                    submissions: data.data
                }
            )
        }).catch(err => console.log(err))
    }

    render() {

        let submissionItems;
        if (this.state.submissions['formSubmissions']) {
            const submissions = this.state.submissions['formSubmissions'];
            submissionItems = submissions.map((sub) => {
                return <SubmissionItem key={uuid.v4()} sub={sub}/>
            });
        }

        return (
            <div className="SubmissionPage bg-light">
                <h3>User Submissions</h3>
                {submissionItems}
            </div>
        );
    }
}
