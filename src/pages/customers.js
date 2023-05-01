import React, { useState } from "react";

import { MainDatabase,MainFireStore } from "../firebase-connectors/closed-loren";
import { useEffect } from 'react';
import LayoutApp from "../components/layout-app";
import { getFirestore, addDoc, collection, getDocs, where } from "firebase/firestore";
import { onValue, ref,getDatabase, query } from "firebase/database";

export default function CustomerPage(){

    const db=MainFireStore;

    const [companys,setCompanys]=useState([]);

    const q=query(collection(db,"company"));

    getDocs(q).then(response=>{

        setCompanys(response.docs)

        response.docs.forEach(company=>{
            console.log("doc-response",company._document.data.value.mapValue.fields)
        })

    })

    return (
        <LayoutApp>

            <div className="row">

                {companys.map( (company)=>(
                    <div className="col-xl-4 col-lg-6 col-md-6">
                    <div className="card">
                    <div className="card-header">
                        <div className="d-flex align-items-start">
                        <div className="d-flex align-items-start">
                            <div className="avatar me-3">
                            <i className="rounded-circle" alt="Avatar"/>
                            </div>
                            <div className="me-2">
                            <h5 className="mb-1"><a href="javascript:;" className="h5 stretched-link">{company.name}</a></h5>
                            <div className="client-info d-flex align-items-center">
                                <h6 className="mb-0 me-1">Client:</h6><span>Christian Jimenez</span>
                            </div>
                            </div>
                        </div>
                        <div className="ms-auto">
                           
                        </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="d-flex align-items-center flex-wrap">
                        <div className="bg-lighter p-2 rounded me-auto mb-3">
                            <h6 className="mb-1">$24.8k <span className="text-body fw-normal">/ $18.2k</span></h6>
                            <span>Total Budget</span>
                        </div>
                        <div className="text-end mb-3">
                            <h6 className="mb-1">Start Date: <span className="text-body fw-normal">14/2/21</span></h6>
                            <h6 className="mb-1">Deadline: <span className="text-body fw-normal">28/2/22</span></h6>
                        </div>
                        </div>
                        <p className="mb-0">We are Consulting, Software Development and Web Development Services.</p>
                    </div>
                    <div className="card-body border-top">
                        <div className="d-flex align-items-center mb-3">
                        <h6 className="mb-1">All Hours: <span className="text-body fw-normal">380/244</span></h6>
                        <span className="badge bg-label-success ms-auto">28 Days left</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                        <small>Task: 290/344</small>
                        <small>95% Completed</small>
                        </div>
                        <div className="progress mb-3" >
                        <div className="progress-bar" role="progressbar"  aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                            <ul className="list-unstyled d-flex align-items-center avatar-group mb-0 zindex-2">
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-sm pull-up" aria-label="Vinnie Mostowy" data-bs-original-title="Vinnie Mostowy">
                                <img className="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar"/>
                            </li>
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-sm pull-up" aria-label="Allen Rieske" data-bs-original-title="Allen Rieske">
                                <img className="rounded-circle" src="../../assets/img/avatars/12.png" alt="Avatar"/>
                            </li>
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-sm pull-up me-2" aria-label="Julee Rossignol" data-bs-original-title="Julee Rossignol">
                                <img className="rounded-circle" src="../../assets/img/avatars/6.png" alt="Avatar"/>
                            </li>
                            <li><small className="text-muted">8 Users</small></li>
                            </ul>
                        </div>
                        <div className="ms-auto">
                            <a href="javascript:void(0);" className="text-body"><i className="bx bx-chat"></i> 15</a>
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