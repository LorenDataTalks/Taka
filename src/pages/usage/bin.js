import React, { useEffect,Fragment } from "react";
import LayoutApp from "../../components/layout-app";
import { useState } from "react";
import { onValue, ref } from "firebase/database";
import { MainDatabase } from "../../firebase-connectors/closed-loren";



export function Bins(){

    const [bins,setBins]=useState([]);
    


    useEffect( ()=>{
        const db=MainDatabase;
        
        const query = ref(db, "bin_monitor_1");

        onValue(query, (snapshot) => {

            const data = snapshot.val();

            let items=[];
            
            Object.values(data).forEach((instance,key) => {

              let level=0;

              if(instance.end_device_ids.device_id !=="bin-monitor-1" && instance.end_device_ids.device_id !=="om-demo-2" ){
                level=instance.uplink_message.decoded_payload.bin_level
              }
              
              items[instance.end_device_ids.device_id]={latest_received:instance.received_at.split("T")[0],...instance.end_device_ids,level:level}
           
            });
            
            let binItems=[];

            Object.values(items).forEach(item=>{
                binItems.push(item)
            })
            
            setBins(binItems);
        })
    },[])


    return (
        <Fragment>
            <LayoutApp>

            <div className="col-sm-12">
                <div className="card">
                <div className="card-header">
                    <h5>Bin Management</h5><span></span>
                </div>
                <div className="table-responsive">
                    <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Latest Collection</th>
                        <th scope="col">Level</th>
                        </tr>
                    </thead>
                    <tbody>
                       {bins.map( (bin,key)=>( <tr key={key}>
                                            <td >{key+1}</td>
                                            <td>{bin.device_id}</td>
                                            <td>Active</td>
                                    
                                            <td>{bin.latest_received}</td>
                                            <td>{bin.level}</td>
                                        </tr> ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>

        </LayoutApp>
        </Fragment>
        
    )
}