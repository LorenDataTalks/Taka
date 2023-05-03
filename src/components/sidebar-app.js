import React,{Component} from "react";
import { DeleteToken, GetToken } from "../services/token.service";
import { MainFireStore } from "../firebase-connectors/closed-loren";
import { query } from "firebase/database";
import { collection, getDocs } from "firebase/firestore";
import { extract_firebase_object } from "../services/data.service";

export default class SidebarApp extends Component{

    constructor(props){
        super(props);

        this.state={
            name:'',
            companyId:'',
            companyName:'',
            role:2
        }

        
    }

    componentDidMount(){
        const db=MainFireStore;

        const q=query(collection(db,"users"));

        const email=GetToken();

        getDocs(q).then(response=>{

            let users=extract_firebase_object(response.docs);

            users.forEach(user=>{

                if(user.email===email){
                    this.setState({...this.state,name:user.firstname+' '+user.lastname,companyId:user.company,role:user.level})
                }     
            });

        });

        const qr=query(collection(db,"company"));

        getDocs(qr).then(response=>{

            let companys=extract_firebase_object(response.docs);

            companys.forEach(company=>{

                if(company.id==this.state.companyId){
                    this.setState({...this.state,companyName:company.name})
                }
            })

        })

    }

    render() {
        return(
            <header className="main-nav">
                <div className="sidebar-user text-center">
                    <span className="setting-primary" >
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    </span>
                    <img className="img-90 rounded-circle" src="../assets/images/dashboard/1.png" alt=""/>
            <div className="badge-bottom"></div><a href="user-profile.html">
              <h6 className="mt-3 f-14 f-w-600">{this.state.name}</h6></a>
            <p className="mb-0 font-roboto">{this.state.companyName}</p>
           
          </div>

                <nav>
                    <div className="main-navbar">
                        <div className="left-arrow" id="left-arrow"><i data-feather="arrow-left"></i></div>
                        <div id="mainnav">
                            <ul className="nav-menu custom-scrollbar">
                                <li className="back-btn">
                                    <div className="mobile-back text-end"><span>Back</span><i
                                        className="fa fa-angle-right ps-2" aria-hidden="true"></i></div>
                                </li>
                                
                                <li className="dropdown"><a className="nav-link menu-title"
                                                            href="/home"><i
                                    data-feather="home"></i><span>Dashboard</span></a>
                                </li>

                                <li className="dropdown"><a className="nav-link menu-title"
                                                            href="/map-report"><i
                                    data-feather="home"></i><span>Map Reports</span></a>
                                </li>


                               

                                <li className="dropdown"><a className="nav-link menu-title"
                                                            href="/bins"><i
                                    data-feather="home"></i><span>Bins</span></a>
                                    <ul className="nav-submenu menu-content">
                                        <li><a href="index.html">Default</a></li>
                                        <li><a href="dashboard-02.html">Ecommerce</a></li>
                                    </ul>
                                </li>

                                {this.state.role == 3? 
                               
                                <li className="dropdown"><a className="nav-link menu-title"
                                                            href="/customers"><i
                                    data-feather="home"></i><span>Company Management</span></a>
                                    <ul className="nav-submenu menu-content">
                                        <li><a href="index.html">Default</a></li>
                                        <li><a href="dashboard-02.html">Ecommerce</a></li>
                                    </ul>
                                </li>  : ''}

                                {this.state.role ==1  || this.state.role == 3? 

                                <li className="dropdown"><a className="nav-link menu-title"
                                                            href="/users"><i
                                    data-feather="home"></i><span>User Management</span></a>
                                    <ul className="nav-submenu menu-content">
                                        <li><a href="index.html">Default</a></li>
                                        <li><a href="dashboard-02.html">Ecommerce</a></li>
                                    </ul>
                                </li>  : ''}

                            </ul>
                        </div>
                        <div className="right-arrow" id="right-arrow"><i data-feather="arrow-right"></i></div>
                    </div>
                </nav>
            </header>
        )
    }
}