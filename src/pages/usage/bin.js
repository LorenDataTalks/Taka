import React from "react";
import LayoutApp from "../../components/layout-app";

export const Bins=()=>{

    return (
        <LayoutApp>

            <div class="col-sm-12">
                <div class="card">
                <div class="card-header">
                    <h5>Bin Management</h5><span></span>
                </div>
                <div class="table-responsive">
                    <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Created On</th>
                        <th scope="col">Latest Collection</th>
                        <th scope="col">Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Alexander</td>
                        <td>Orton</td>
                        <td>@mdorton</td>
                        <td>Admin</td>
                        <td>USA</td>
                        </tr>
                    
                    </tbody>
                    </table>
                </div>
                </div>
            </div>

        </LayoutApp>
    )
}