
import React from "react";
import LayoutApp from "../../components/layout-app";
import Chart from "react-apexcharts";


const Bar=({obj,key})=>(
   
  <div className="card col-3 mx-1">
    <div className="card-body">
      <h3>{obj.name}</h3>
      <small>{obj.level}</small>
    </div>
  </div>
)



class DashboardSimple extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            options: {
              chart: {
                id: "basic-bar"
              },
              xaxis: {
                categories: ["2023-03-10", "2023-03-11", "2023-03-12", "2023-03-14", "2023-03-15", "2023-03-16", "2023-03-17", "2023-03-18", "2023-03-19"]
              }
            },
            series: [
              {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
              }
            ],
            bins:[
              {name:"Smart Monitor 1", level: 200,location:{
                longitude: -0.2938847,
                latitude: 1.234784
              }},
              {name:"Smart Monitor 2", level: 80,location:{
                longitude: -0.2938847,
                latitude: 1.234784
              }}
            ]
          };


          

    }

    render() {

      
      const bars = [];

      for (let i = 0; i < this.state.bins.length; i++) {
        bars.push(<Bar obj={this.state.bins[i]}/>);
      }

        return(
            <LayoutApp>

              <div className="row justify-space-between">
               {bars}
              </div>

              <div className="row">
                <div className="card col-4">

                  <div className="mixed-chart">
                        <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="line"
                        width="500"
                        />
                    </div>
                </div>
              </div>

             

              

            </LayoutApp>
        )
    }
}

export default DashboardSimple;