import React,{Component} from "react";
import NavbarApp from "./navbar-app";
import SidebarApp from "./sidebar-app";
import FooterApp from "./footer-app";
import {Helmet} from "react-helmet";
import { DeleteToken, GetToken } from "../services/token.service";
import { MainFireStore } from "../firebase-connectors/closed-loren";
import { query } from "firebase/database";
import { collection, getDocs } from "firebase/firestore";
import { extract_firebase_object } from "../services/data.service";


export default class LayoutApp extends Component{

    constructor(props) {
        super(props);

        this.state={
            theme:'light',
            name:{},
        }
    }

    logout(){ 
        DeleteToken();

        window.location.href="/login";
    }
    
    componentDidMount(){
        const db=MainFireStore;

        const q=query(collection(db,"users"));

        const email=GetToken();

        console.log("email-response",email)

        getDocs(q).then(response=>{

            let users=extract_firebase_object(response.docs);

            users.forEach(user=>{

                if(user.email===email)
                  this.setState({...this.state,user:user})
            })

        });

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