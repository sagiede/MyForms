import React from "react";
import {Link} from 'react-router-dom';

export const Header = () => {
    return (
        <div className="row">
            <div className="col-xs-10 col-xs-offset-1">
                <nav class="navbar navbar-default">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand">Welcome to My Form Builder</a>
                        </div>
                        <ul class="nav navbar-nav">
                            <li><Link to={"/"}>Home</Link></li>
                            <li><Link to={"/FormBuilderPage"}>Form Builder Page</Link></li>
                            <li><Link to={"/FormListPage"}>Forms List Page</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};