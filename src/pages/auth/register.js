
import React,{Fragment} from "react";
import { useState } from "react";
import { getFirestore, addDoc, collection, getDocs, where } from "firebase/firestore";
import { onValue, ref as sRef,getDatabase, query } from "firebase/database";
import { MainDatabase,MainFireStore } from "../../firebase-connectors/closed-loren";
import { Navigate } from "react-router-dom";
import { GetTimeStamp } from "../../services/date.service";

function RegisterPage(){

  const db=MainFireStore;

  const [name,setName]=useState("");

  const [lastname,setLastName]=useState('');

  const [company,setCompany]=useState('');

  const [password,setPassword]=useState('');

  const [email,setEmail]=useState('');

  const [users,setUsers]=useState([]);
 
  const q=query(collection(db,"users"));

  getDocs(q).then(response=>{
   
    setUsers(response.docs);

    response.docs.forEach(user=>{
     // console.log("doc-response",user._document.data.value.mapValue.fields)
    })
  })

  const handleFormSubmission=(event)=>{
   
    event.preventDefault();

    //todo :check if the email already exits in the database

    let isAvailable=false;
    
    if(users.length > 0){

      users.forEach(user=>{
        if(user._document.data.value.mapValue.fields.email.stringValue==email){
          isAvailable=true;
        }
      })

    }

    if(isAvailable){
      alert("Email already exists in our system")
      console.log("duplicate emails not allowed")
      return ;
    }

    return ;
   

    addDoc(collection(db,"company"),{name:company,created_on:GetTimeStamp()}).then(response=>{

      let company_id=response.id;

      addDoc(collection(db,"users"),{firstname:name,lastname:lastname,company:company_id,password,email}).then(response=>{
       
        console.log("created-users-id",response.id);
        
       // clearForm();
        
      //  Navigate('/login');
      
      }).catch(error=>{
       
        console.log("error-addoc",error)

        alert("Error connecting to the server , please retry again later");
     
      });
    });

   }

   const clearForm=()=>{setName('');setLastName('');setCompany('');setPassword('');setEmail('');}
   
    return(
      <Fragment>
         <section>         
          <div className="container-fluid p-0"> 
            <div className="row m-0">
              <div className="col-12 p-0">    
                <div className="login-card">
                  <form className="theme-form login-form" onSubmit={handleFormSubmission}>
                    <h4>Create your account</h4>
                    <h6>Enter your personal details to create account</h6>
                    <div className="form-group">
                      <label>Your Name</label>
                      <div className="small-group">
                        <div className="input-group"><span className="input-group-text"><i className="icon-user"></i></span>
                          <input className="form-control" type="text" value={name} onChange={(e)=>setName(e.target.value)} required placeholder="Fist Name"/>
                        </div>
                        <div className="input-group"><span className="input-group-text"><i className="icon-user"></i></span>
                          <input className="form-control" type="text" value={lastname} onChange={(e)=>setLastName(e.target.value)} required placeholder="Last Name"/>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <div className="input-group"><span className="input-group-text"><i className="icon-email"></i></span>
                        <input className="form-control" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Test@gmail.com"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Company name</label>
                      <div className="input-group"><span className="input-group-text"><i className="icon-email"></i></span>
                        <input className="form-control" type="text" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="compa"/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <div className="input-group"><span className="input-group-text"><i className="icon-lock"></i></span>
                        <input className="form-control" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} name="login[password]" required="" placeholder="*********"/>
                        <div className="show-hide"><span className="show">                         </span></div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="checkbox">
                        <input id="checkbox1" type="checkbox"/>
                        <label className="text-muted" htmlFor="checkbox1">Agree with <span>Privacy Policy                   </span></label>
                      </div>
                    </div>
                    <div className="form-group">
                      <button className="btn btn-primary btn-block" type="submit">Create Account</button>
                    </div>
                    
                    <p>Already have an account?<a className="ms-2" href="/login">Sign in</a></p>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </section>
      </Fragment>
     
    )
}

export default RegisterPage;