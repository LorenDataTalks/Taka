import React from "react";
import LayoutApp from "../../components/layout-app";
import { MainFireStore } from "../../firebase-connectors/closed-loren";
import { query } from "firebase/database";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { extract_firebase_object } from "../../services/data.service";
import { GetToken } from "../../services/token.service";
import { ToastContainer, toast } from "react-toastify";

export default class UserManagement extends React.Component{

    constructor(props) {
        super(props);

        this.state={
           userEmail:[],
           companyId:'',
           users:[],
           display:'none',
           email_address:'',
           lastname:'',
           firstname:'',
           role:1
        }
    }

    launchModal(){

        this.setState({...this.state,display:'block'})

        console.log("state-object",this.state);
    }

    toggleDisplay(){

        this.setState({...this.state,display: this.state.display==="block" ? "none" : "block"})

    }

    updateValue(e){

        let currentState=this.state;

        currentState[e.target.id]=e.target.value;

        this.setState({...currentState})
        
    }

    handleSubmit(e){
        e.preventDefault();

        const db=MainFireStore;

        if(this.state.companyId ==""){
            toast("please sect a company")
            return
        }

        addDoc(collection(db,"users"),{firstname:this.state.firstname,
            lastname:this.state.lastname,company:this.state.companyId,
            password:"1234",email:this.state.email_address,level:this.state.role}).then(response=>{

                this.clearForm()

                toast("Created Successfully");

        }).catch(error=>{
            toast("asn error occured !")
        })

    }
    clearForm(){
        this.setState({...this.state,firstname:"",email_address:"",lastname:"",})
    }

    componentDidMount(){
        const db=MainFireStore;

        const q=query(collection(db,"users"));


        let userEmail=GetToken();

        let company_id=""

      


        getDocs(q).then(response=>{

            const users=extract_firebase_object(response.docs)

            users.forEach(user=>{

                if(user.email==userEmail){
                    company_id=user.company;
                   
                }

            })

            let companyUsers=[];

            users.forEach(user=>{

                if(user.company == company_id)
                  companyUsers.push(user)

            })

            console.log("company-id",company_id)

            this.setState({...this.state,users:companyUsers,companyId:company_id});


        });
    }

    render(){

        return(
            <LayoutApp>

                <div className="col-sm-12">
                                <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">User Management</h5><span></span>

                                    <div className="header-details card-tools">
                                        <button className="btn btn-primary btn-sm" onClick={this.launchModal.bind(this)}>Create User</button>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Status </th>
                                        <th scope="col">Created On </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.users.map( (user,key)=>( <tr key={key}>
                                                            <td >{key+1}</td>
                                                            <td>{user.firstname}</td>
                                                            <td>{user.email}</td>
                                                    
                                                            <td>{user.level}</td>
                                                            <td>--</td>
                                                        </tr> ))}
                                    </tbody>
                                    </table>
                    </div>
                    </div>
            </div>

            <div style={{display:this.state.display,background:'rgba(0,0,0,0.3)',width:'100%',height:'100%',top:'0%',left:'0%',zIndex:'1023',position:'fixed'}}>

            </div>

            <div class="modal" tabindex="-1" role="dialog"  style={{display:this.state.display}}>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Create User</h5>
                        <button type="button" class="close" onClick={this.toggleDisplay.bind(this)} data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="firstname">Firstname</label>
                            <input type="text" onChange={this.updateValue.bind(this)} value={this.state.firstname} class="form-control" id="firstname" name="firstname" required aria-describedby="emailHelp" placeholder="Enter firstname"/>
                            <small id="emailHelp" class="form-text text-danger"></small>
                        </div>

                        <div class="form-group">
                            <label for="lastname">Lastname</label>
                            <input type="text" onChange={this.updateValue.bind(this)} value={this.state.lastname} class="form-control" id="lastname" name="lastname" required  aria-describedby="emailHelp" placeholder="Enter lastname"/>
                            <small id="emailHelp" class="form-text text-danger"></small>
                        </div>

                        <div class="form-group">
                            <label for="email_address">Email Address</label>
                            <input type="email" onChange={this.updateValue.bind(this)} value={this.state.email_address} class="form-control" id="email_address" required name="email_address" aria-describedby="emailHelp" placeholder="Enter email"/>
                            <small id="emailHelp" class="form-text text-danger"></small>
                        </div>

                        <div class="form-group">
                                <small id="emailHelp" class="form-text text-muted">Default Password is 1234</small>
                        </div>


                    

                        <div class="form-group">
                            <label for="exampleInputEmail1">Role</label>
                            <select className="form-control" id='role' name='role' onChange={this.updateValue.bind(this)} >
                                <option value='2'>User</option>
                                <option value='1'>Admin</option>
                            </select>
                        </div>

                        

                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Save changes</button>
                        <button type="button" class="btn btn-secondary" onClick={this.toggleDisplay.bind(this)} data-dismiss="modal">Close</button>
                    </div>
                    </form>
                   
                    </div>

                    <ToastContainer />
                </div>
                </div>

            </LayoutApp>
        )
    }
}