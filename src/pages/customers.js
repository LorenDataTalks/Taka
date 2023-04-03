import React, { useState } from "react";
import { onValue, ref,getDatabase } from "firebase/database";
import { MainDatabase } from "../firebase-connectors/closed-loren";
import { useEffect } from 'react';
import LayoutApp from "../components/layout-app";

export default function CustomerPage(){

    const db=MainDatabase;

    const [devices,setDevices]=useState([]);



    useEffect(() => {
        const query = ref(db, "bin_monitor_1");

        return onValue(query, (snapshot) => {
        const data = snapshot.val();

        //[{id:"000000",name:"Trash Bin"}]

        console.log("response ",data)

        if (snapshot.exists()) {
            Object.values(data).map((project) => {

                let device_id=project.end_device_ids.application_ids.dev_eui;

                setDevices(device_id);

               // console.log("snapshots-update",devices)
            // setProjects((projects) => [...projects, project]);
            });
        }
        });
    }, []);

    return (
        <LayoutApp>

            <div className="row">
                <div class="col-xl-4 col-lg-6 col-md-6">
                    <div class="card">
                    <div class="card-header">
                        <div class="d-flex align-items-start">
                        <div class="d-flex align-items-start">
                            <div class="avatar me-3">
                            <i className="rounded-circle" alt="Avatar"/>
                            </div>
                            <div class="me-2">
                            <h5 class="mb-1"><a href="javascript:;" class="h5 stretched-link">Social Banners</a></h5>
                            <div class="client-info d-flex align-items-center">
                                <h6 class="mb-0 me-1">Client:</h6><span>Christian Jimenez</span>
                            </div>
                            </div>
                        </div>
                        <div class="ms-auto">
                            <div class="dropdown zindex-2">
                            <button type="button" class="btn dropdown-toggle hide-arrow p-0" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-vertical-rounded"></i></button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item" href="javascript:void(0);">Rename project</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">View details</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">Add to favorites</a></li>
                                <li>
                                <hr class="dropdown-divider"/>
                                </li>
                                <li><a class="dropdown-item text-danger" href="javascript:void(0);">Leave Project</a></li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="d-flex align-items-center flex-wrap">
                        <div class="bg-lighter p-2 rounded me-auto mb-3">
                            <h6 class="mb-1">$24.8k <span class="text-body fw-normal">/ $18.2k</span></h6>
                            <span>Total Budget</span>
                        </div>
                        <div class="text-end mb-3">
                            <h6 class="mb-1">Start Date: <span class="text-body fw-normal">14/2/21</span></h6>
                            <h6 class="mb-1">Deadline: <span class="text-body fw-normal">28/2/22</span></h6>
                        </div>
                        </div>
                        <p class="mb-0">We are Consulting, Software Development and Web Development Services.</p>
                    </div>
                    <div class="card-body border-top">
                        <div class="d-flex align-items-center mb-3">
                        <h6 class="mb-1">All Hours: <span class="text-body fw-normal">380/244</span></h6>
                        <span class="badge bg-label-success ms-auto">28 Days left</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-1">
                        <small>Task: 290/344</small>
                        <small>95% Completed</small>
                        </div>
                        <div class="progress mb-3" >
                        <div class="progress-bar" role="progressbar"  aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div class="d-flex align-items-center">
                        <div class="d-flex align-items-center">
                            <ul class="list-unstyled d-flex align-items-center avatar-group mb-0 zindex-2">
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Vinnie Mostowy" data-bs-original-title="Vinnie Mostowy">
                                <img class="rounded-circle" src="../../assets/img/avatars/5.png" alt="Avatar"/>
                            </li>
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up" aria-label="Allen Rieske" data-bs-original-title="Allen Rieske">
                                <img class="rounded-circle" src="../../assets/img/avatars/12.png" alt="Avatar"/>
                            </li>
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up me-2" aria-label="Julee Rossignol" data-bs-original-title="Julee Rossignol">
                                <img class="rounded-circle" src="../../assets/img/avatars/6.png" alt="Avatar"/>
                            </li>
                            <li><small class="text-muted">8 Users</small></li>
                            </ul>
                        </div>
                        <div class="ms-auto">
                            <a href="javascript:void(0);" class="text-body"><i class="bx bx-chat"></i> 15</a>
                        </div>
                        </div>
                    </div>
                    </div>
                 </div>
            </div>
        
        </LayoutApp>
    )
}