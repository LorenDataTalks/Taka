import React,{Component} from "react";

export default class SidebarApp extends Component{

    render() {
        return(
            <header className="main-nav">
                <div class="sidebar-user text-center"><a class="setting-primary" href="javascript:void(0)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></a>
                    <img class="img-90 rounded-circle" src="../assets/images/dashboard/1.png" alt=""/>
            <div class="badge-bottom"><span class="badge badge-primary">New</span></div><a href="user-profile.html">
              <h6 class="mt-3 f-14 f-w-600">Devambrose</h6></a>
            <p class="mb-0 font-roboto">Taka Resources Department</p>
            <ul>
              <li><span><span class="counter">10</span></span>
                <p>Follow</p>
              </li>
              <li><span>3 years</span>
                <p>Experince</p>
              </li>
              <li><span><span class="counter">95.2</span></span>
                <p>Follower </p>
              </li>
            </ul>
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

                               
                                <li className="dropdown"><a className="nav-link menu-title"
                                                            href="/customers"><i
                                    data-feather="home"></i><span>Company Management</span></a>
                                    <ul className="nav-submenu menu-content">
                                        <li><a href="index.html">Default</a></li>
                                        <li><a href="dashboard-02.html">Ecommerce</a></li>
                                    </ul>
                                </li>

                            </ul>
                        </div>
                        <div className="right-arrow" id="right-arrow"><i data-feather="arrow-right"></i></div>
                    </div>
                </nav>
            </header>
        )
    }
}