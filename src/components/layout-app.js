import React,{Component} from "react";
import NavbarApp from "./navbar-app";
import SidebarApp from "./sidebar-app";
import FooterApp from "./footer-app";
import {Helmet} from "react-helmet";
import { DeleteToken } from "../services/token.service";


export default class LayoutApp extends Component{

    constructor(props) {
        super(props);

        this.state={
            theme:'light'
        }


    }

    logout(){
        console.log("logout user");
        
        DeleteToken();

        window.location.href="/login";
    }

    render() {
        return(
            <div className="page-wrapper compact-wrapper" id="pageWrapper">

                <NavbarApp logout={this.logout.bind(this)}/>

                <div className="page-body-wrapper sidebar-icon">

                   <SidebarApp logout={this.logout.bind(this)}/>

                    <div className={'page-body'}>
                        {this.props.children}
                    </div>

                    <FooterApp/>

                </div>

                <Helmet>

                </Helmet>

            </div>
        )
    }
}