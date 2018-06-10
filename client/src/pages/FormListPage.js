import React from "react";
import axios from 'axios'
import FormsTable from "./components/FormsTable";


export class FormListPage extends React.Component {

    constructor() {
        super();
        this.state = {
            formsDetails: []
        }

    }

    getData() {
        const serverURL = 'http://127.0.0.1:5000/get_all_forms_details';
        return axios.get(serverURL).then(res => {
            console.log('server loging');
            return res;
        })
    }

    componentWillMount() {
        this.getData().then(res => {
            this.setState(
                {
                    formsDetails: res.data
                }
            )
        }).catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h3><strong>Forms List</strong></h3>
                <FormsTable formsDetails={this.state.formsDetails}/>
            </div>
        );
    }
}