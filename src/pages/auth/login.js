import React from "react";
import { GetToken } from "../../services/token.service";
import { MainFireStore } from "../../firebase-connectors/closed-loren";
import { collection, getDocs, query } from "firebase/firestore";
import { extract_firebase_object } from "../../services/data.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class LoginPage extends React.Component{

    constructor(props) {
        super(props);

        this.state={
            processing:false,
            username:'',
            current_password:'',
            token:GetToken() !==undefined && GetToken() !=null
        }
    }

    processLogin(e){

        e.preventDefault()

        const db=MainFireStore;

        const q=query(collection(db,"users"));
        
        getDocs(q).then(response=>{

            let users=extract_firebase_object(response.docs);

            let found=false

            users.forEach(user=>{
               
                if(this.state.username === user.email && this.state.current_password ===user.password){
                   
                    this.props.setToken(user.email)

                    this.setState({...this.state,token:GetToken() !==undefined && GetToken() !=null})

                    window.location.href="/home";

                    found=true
                }

            });

            if(!found){
                toast("User not found please contact admin or check users");
            }
        });

    }
    
    updateInputValue(e){
        let item=[]

        item[e.target.name]=e.target.value

        this.setState({...this.state,...item})

    }
    render() {
        return(
            <>
                <section>
                    <div className="container-fluid p-0">
                        <div className="row">
                            <div className="col-12">
                                <div className="login-card">
                                    <form className="theme-form login-form" method={'post'} onSubmit={this.processLogin.bind(this)}>
                                        <h4>Taka</h4>
                                        <h6>Welcome back! Log in to your account.</h6>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <div className="input-group"><span className="input-group-text"><i
                                                className="icon-email"></i></span>
                                                <input className="form-control" type="email" required name='username' onKeyUp={this.updateInputValue.bind(this)}
                                                       placeholder="Test@gmail.com"/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <div className="input-group"><span className="input-group-text">
                                                <i className="fa fa-key"></i></span>
                                                <input className="form-control" type="password" name="current_password"
                                                       required placeholder="*********" onKeyUp={this.updateInputValue.bind(this)}/>
                                                    <div className="show-hide"><span
                                                        className="show">                         </span></div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="checkbox">
                                                <input id="checkbox1" type="checkbox"/>
                                                    <label htmlFor="checkbox1">Remember password</label>
                                            </div>
                                            <a className="link" href="/forgot-password">Forgot password?</a>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary btn-block" type="submit">Sign in</button>
                                        </div>
                                        <ToastContainer />
                                        <p>Don't have account?<a className="ms-2" href="/create-account">Create Account</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </>


        )
    }
}