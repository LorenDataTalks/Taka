import React,{Component} from "react";

export default class SidebarApp extends Component{

    render() {
        return(
            <header className="main-nav">

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
                                    data-feather="home"></i><span>Home</span></a>
                                </li>

                                <li className="dropdown"><a className="nav-link menu-title"
                                                            href="/map-report"><i
                                    data-feather="home"></i><span>Map Report</span></a>
                                </li>


                                <li className="dropdown"><a className="nav-link menu-title"
                                                            href="/customers"><i
                                    data-feather="home"></i><span>Company Management</span></a>
                                    <ul className="nav-submenu menu-content">
                                        <li><a href="index.html">Default</a></li>
                                        <li><a href="dashboard-02.html">Ecommerce</a></li>
                                    </ul>
                                </li>

                                <li className="dropdown"><a className="nav-link menu-title"
                                                            href=""><i
                                    data-feather="home"></i><span>Bins</span></a>
                                    <ul className="nav-submenu menu-content">
                                        <li><a href="index.html">Default</a></li>
                                        <li><a href="dashboard-02.html">Ecommerce</a></li>
                                    </ul>
                                </li>

                                <li className="dropdown"><a className="nav-link menu-title"
                                                            href=""><i
                                    data-feather="airplay"></i><span>Widgets</span></a>
                                    <ul className="nav-submenu menu-content">
                                        <li><a href="general-widget.html">General</a></li>
                                        <li><a href="chart-widget.html">Chart</a></li>
                                    </ul>
                                </li>
                                <li className="dropdown"><a className="nav-link menu-title"
                                                            href=""><i
                                    data-feather="layout"></i><span>Page layout</span></a>
                                    <ul className="nav-submenu menu-content">
                                        <li><a href="box-layout.html">Boxed</a></li>
                                        <li><a href="layout-rtl.html">RTL</a></li>
                                        <li><a href="layout-dark.html">Dark</a></li>
                                        <li><a href="footer-light.html">Footer Light</a></li>
                                        <li><a href="footer-dark.html">Footer Dark</a></li>
                                        <li><a href="footer-fixed.html">Footer Fixed</a></li>
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