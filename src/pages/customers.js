import React, { useState } from "react";

import { MainFireStore } from "../firebase-connectors/closed-loren";
import LayoutApp from "../components/layout-app";
import { collection, getDocs } from "firebase/firestore";
import { query } from "firebase/database";
import { extract_firebase_object } from "../services/data.service";

export default function CustomerPage(){

    const db=MainFireStore;

    const [companys,setCompanys]=useState([]);

    const q=query(collection(db,"company"));

    getDocs(q).then(response=>{

        let companys=extract_firebase_object(response.docs);

        console.log("getDocs",companys)

        setCompanys(companys)

    })

    return (
        <LayoutApp>

            <div className="row">

            <div className="card">
                <div className="card-header">
                    <h5>Company Management</h5><span></span>
                </div>

            </div>

                {companys.map( (company,key)=>(
                    <div key={key} className="col-xl-4 col-lg-6 col-md-6">
                    <div className="card">
                    <div className="card-header">
                        <div className="d-flex align-items-start">
                        <div className="d-flex align-items-start">
                           
                            <div className="me-2">
                            <h5 className="mb-1"><span className="h5 stretched-link">{company.name}</span></h5>
                            <div className="client-info d-flex align-items-center">
                                <h6 className="mb-0 me-1">Created By:</h6><span>Christian Jimenez</span>
                            </div>
                            </div>
                        </div>
                        <div className="ms-auto">
                           
                        </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="d-flex align-items-center flex-wrap">
                        <div className="bg-lighter rounded me-auto mb-3">
                            <h6 className="mb-1">Latest Collection<span className="text-body fw-normal"></span></h6>
                            
                        </div>
                        <div className="text-end mb-3">
                            <h6 className="mb-1">Latest Activity <span className="text-body fw-normal">{company.created_on}</span></h6>
                           
                        </div>
                        </div>
                        <p className="mb-0">We are Consulting, Software Development and Web Development Services.</p>
                    </div>
                    <div className="card-body border-top">
                        <div className="d-flex align-items-center mb-3">
                        <h6 className="mb-1">Total Collections: <span className="text-body fw-normal">380</span></h6>
                        <span className="badge bg-label-success ms-auto">28 Days left</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                       
                        </div>
                        <div className="progress mb-3" >
                        <div className="progress-bar" role="progressbar"  aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                            <ul className="list-unstyled d-flex align-items-center avatar-group mb-0 zindex-2">
                
                            <li><small className="text-muted">3 Users</small></li>
                            </ul>
                        </div>
                        <div className="ms-auto">
                            
                        </div>
                        </div>
                    </div>
                    </div>
                 </div>
                ))}
                
            </div>
        
        </LayoutApp>
    )
}