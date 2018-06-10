import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Header} from "./pages/components/Header";
import {FormBuilderPage} from "./pages/FormBuilderPage";
import {FormListPage} from "./pages/FormListPage";
import {SubmitPage} from "./pages/SubmitPage";
import {SubmissionPage} from "./pages/SubmissionPage";
import {HomePage} from "./pages/HomePage";


class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container ">
                    <Header/>
                    <Switch>
                        <Route exact path={"/"} component={HomePage}/>
                        <Route path={"/FormListPage"} component={FormListPage}/>
                        <Route path={"/FormBuilderPage"} component={FormBuilderPage}/>
                        <Route path={"/SubmitPage/:formID"} component={SubmitPage}/>
                        <Route path={"/SubmissionPage/:formID"} component={SubmissionPage}/>
                    </Switch>
                </div>
            </Router>

        );
    }
}


ReactDOM.render(<App/>, document.getElementById("index"));
