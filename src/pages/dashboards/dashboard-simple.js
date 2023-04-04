
import React from "react";
import LayoutApp from "../../components/layout-app";
import Chart from "react-apexcharts";

import { onValue, ref,getDatabase } from "firebase/database";
import { MainDatabase } from "../../firebase-connectors/closed-loren";

const Bar=({obj,name,color,key})=>(
  <div className={`card col-4 ${color}`}   >
    <div className="card-body ">
      <h3>{name}</h3>
      <small>{obj.level}</small>
    </div>
  </div>
)



class DashboardSimple extends React.Component{
    constructor(props){
        super(props);


        let chart1={
          options: {
            chart: {
              id: "basic-bar",
              height: 350,
            },
            xaxis: {
              categories: ["2023-03-10", "2023-03-11", "2023-03-12", "2023-03-14", "2023-03-15", "2023-03-16", "2023-03-17", "2023-03-18", "2023-03-19"]
            },
            title: {
              text: 'Daily Bin records',
              align: 'left'
            },
          },
          series: [
            {
              name: "bin-1",
              data: [30, 40, 45, 50, 49, 60, 70, 91]
            },
            {
              name: "bin-2",
              data: [30, 50, 55, 10, 39, 19, 30, 41]
            },
            {
              name: "bin-3",
              data: [20, 80, 10, 15, 56, 77, 90, 61]
            }
          ],
        }
        this.state = {
            chart1:chart1,
            options2: {
              chart: {
                id: "basic-bar",
                height: 350,
              },
              xaxis: {
                categories: ["2023-03-10", "2023-03-11", "2023-03-12", "2023-03-14", "2023-03-15", "2023-03-16", "2023-03-17", "2023-03-18", "2023-03-19"]
              },
              title: {
                text: 'Product Trends by Month',
                align: 'left'
              },
            },
            options3: {
              chart: {
                id: "basic-bar",
                height: 350,
              },
              xaxis: {
                categories: ["2023-03-10", "2023-03-11", "2023-03-12", "2023-03-14", "2023-03-15", "2023-03-16", "2023-03-17", "2023-03-18", "2023-03-19"]
              },
              title: {
                text: 'Product Trends by Month',
                align: 'left'
              },
            },
            series: [
              {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
              }
            ],
            bins:[
              {name:"Number of Bins", level: 3,location:{
                longitude: -0.2938847,
                latitude: 1.234784
              }},
              {name:"Smart Monitor 1", level: 80,location:{
                longitude: -0.2938847,
                latitude: 1.234784
              }},
              {name:"Smart Monitor 2", level: 70,location:{
                longitude: -0.2938847,
                latitude: 1.234784
              }}
            ],
            quantities:[]
          };


          

    }

    componentDidMount(){
      console.log("componentDidMount")

      const db=MainDatabase;

      const query = ref(db, "bin_monitor_1");

        return onValue(query, (snapshot) => {
        
          const data = snapshot.val();

          let gadgets=new Object();

          let quantities=new Object();

          let historical=new Object();


          Object.values(data).map((instance,key) => {
            //console.log(""+instance.end_device_ids.device_id ,instance.end_device_ids.device_id !=="bin-monitor-1");

            gadgets[instance.end_device_ids.device_id]={...instance.end_device_ids};

            if(instance.end_device_ids.device_id !=="bin-monitor-1" && instance.end_device_ids.device_id !=="om-demo-2" )
                quantities[instance.end_device_ids.device_id]={level:instance.uplink_message.decoded_payload.bin_level}



            this.setState({...this.state,quantities:quantities})
            //gadgets.push({...instance.end_device_ids,})
            
          });

          console.log(quantities)

        });
    }

    render() {

      
      const bars = [];

      Object.values(this.state.quantities).map( (bin,key)=>{

          let name=Object.keys(this.state.quantities)[key].split("-").join(" ");

         name= name.replace(
              /\w\S*/g,
              function(txt) {
                  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
              }
          );

         let color='bg-info';

          if(bin.level > 23)
             color='bg-success'
          if(bin.level <= 22)
              color='bg-secondary'
          if(bin.level <=2)
              color='bg-danger'



          bars.push(<Bar obj={bin} name={name} color={color} />);
      })


        return(
            <LayoutApp>
              <h2 className="text-center bg-white ">Taka Smart Bin Analytics</h2>

              <div className="row">
                <div className="col-8">
                <div className="row justify-space-between">
                   {bars}
                </div>

              

              <div className="row">
                <div className="card col-6 mx-1">

                    <div className="mixed-chart">
                          <Chart
                          options={this.state.chart1.options}
                          series={this.state.chart1.series}
                          type="line"
                          
                          />
                      </div>
                </div>

                <div className="card col-6 mx-1">

                  <div className="mixed-chart">
                        <Chart
                        options={this.state.options2}
                        series={this.state.series}
                        type="bar" />
                    </div>
                </div>

                <div className="card col-6 mx-1">

                  <div className="mixed-chart">
                        <Chart
                        options={this.state.options3}
                        series={this.state.series}
                        type="bar"
                        title="Bin By count"
                        
                        />
                    </div>
                </div>
              </div>

                </div>
                <div className="col-4">

                   <div className="card card-primary mb-1">
                     <div className="card-body">
                      <h3>Select bin status</h3>
                      <select className='form-control'>
                        <option value='1'>Full </option>
                        <option value='2'>Empty </option>
                        <option value='3'>Nearly Full </option>
                      </select>
                     </div>
                   </div>

                   <div className="card card-primary mt-3">
                     <div className="card-body">
                      <h3>Select Duration</h3>

                      <div className="row">
                        <div className='col-6'>
                          <label>From date</label>
                          <input type='date' className="form-control"/>
                        </div>
                        <div className='col-6'>
                          <label>From date</label>
                          <input type='date' className="form-control"/>
                        </div>
                      </div>
                     
                     </div>
                   </div>

                   <div className="card card-primary mt-3">
                     <div className="card-body">
                      <h4>legend</h4>

                      <div className="row">
                        <div className="col-2 bg-danger p-2"></div>
                        <div className="col-4">Full</div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-2 bg-secondary p-2"></div>
                        <div className="col-4">Half Empty</div>
                      </div>

                      <div className="row mt-2">
                        <div className="col-2 bg-success p-2"></div>
                        <div className="col-4"> Empty</div>
                      </div>



                     
                     
                     </div>
                   </div>

                 

                </div>
              </div>
            </LayoutApp>
        )
    }
}

export default DashboardSimple;