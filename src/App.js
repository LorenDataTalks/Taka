import './App.css';
import PrivateRoute from "./components/private-route";
import {Routes,Route} from "react-router-dom";
import React,{Component} from "react";
import LoginPage from "./pages/auth/login";
import {GetToken, SetToken} from "./services/token.service";
import DashboardSimple from "./pages/dashboards/dashboard-simple";
import RegisterPage from './pages/auth/register';
import CustomerPage from './pages/customers';
import MapReport from './pages/usage/map-report';
import { Bins } from './pages/usage/bin';
import UserManagement from './pages/usage/users';

class App extends Component{

    constructor(props) {
        super(props);
        this.state={
            token:GetToken() !==undefined && GetToken() !=null,
        }
    }

    componentDidMount() {
        console.log("password",GetToken() !==undefined && GetToken() !=null)
    }

    updateTokenState(){
        this.setState({...this.state,token:GetToken()!==undefined})
    }
    componentWillUnmount() {

        this.updateTokenState()

        console.log("password","componentWillUnmount")
    }

    setToken(value){
        SetToken(value)

        
        this.updateTokenState()

        console.log("password-setToken",GetToken())
    }
    render(){
        return (
            <Routes>
                <Route path="/" element={<PrivateRoute token={this.state.token}><DashboardSimple/></PrivateRoute>} exact />

                <Route path="/home" element={<PrivateRoute token={this.state.token}><DashboardSimple/></PrivateRoute>} exact />

                <Route path="/login" element={<LoginPage setToken={this.setToken.bind(this)}/>} />

                <Route path="/create-account" element={<RegisterPage/>}/>

                <Route path="/customers" element={<CustomerPage/>}/>

                <Route path='/map-report' element={<MapReport/>}></Route>

                <Route path='/bins' element={<Bins/>}/>

                <Route path='/users' element={<UserManagement/>}/>
            </Routes>
        );
  }
}

export default App;
