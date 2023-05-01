
import React from "react";
import LayoutApp from "../../components/layout-app";
import Chart from "react-apexcharts";

import { onValue, ref,getDatabase } from "firebase/database";
import { MainDatabase,MainFireStore } from "../../firebase-connectors/closed-loren";

const Bar=({obj,name,color,key})=>(
  <div className={`my-1 mx-0 col-4 ${color}`}   >
    <div className="card-body ">
      <h3 className="text-center px-0 py-0">{name}</h3>
      <div className="font-center text-center ">{obj.level}</div>
    </div>
  </div>
)



class DashboardSimple extends React.Component{
    constructor(props){
        super(props);

        this.state = {
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
            quantities:[],
            chart1:this.chartStructure(),
          };
    }
    chartStructure(){
       return {
        series: [{
          data: [44, 55, 41, 64, 22, 43, 21]
        }, {
          data: [53, 32, 33, 52, 13, 44, 32]
        }],
        options: {
          chart: {
            type: 'bar',
            height: 430
          },
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                position: 'top',
              },
            }
          },
          dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
              fontSize: '12px',
              colors: ['#fff']
            }
          },
          stroke: {
            show: true,
            width: 1,
            colors: ['#fff']
          },
          tooltip: {
            shared: true,
            intersect: false
          },
          xaxis: {
            categories: [],
          },
        },
      
      }
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

          console.log(data);

          let items={"smart-bin-1":[],"smart-bin-2":[],"smart-bin-3":[]}

          Object.values(data).map((instance,key) => {
           
            let date= instance.received_at.split("T")[0]

            if(instance.end_device_ids.device_id !=="bin-monitor-1" && instance.end_device_ids.device_id !=="om-demo-2" ){
             
              if(historical[date]==undefined){
               
                historical[date]={'smart-bin-1':[],'smart-bin-2':[],'smart-bin-3':[]}
              
              }else{
                
                historical[date][instance.end_device_ids.device_id]
                .push(instance.uplink_message.decoded_payload.bin_level  || instance.uplink_message.decoded_payload.bin_level )
  
              }
            }
            
            if(instance.end_device_ids.device_id !=="bin-monitor-1" && instance.end_device_ids.device_id !=="om-demo-2" ){
              if(items[instance.end_device_ids.device_id] ==undefined){
                items[instance.end_device_ids.device_id]=[]
              }else{
                items[instance.end_device_ids.device_id].push({date:instance.received_at,quantity:instance.uplink_message.decoded_payload.bin_level  || instance.uplink_message.decoded_payload.bin_level })
              }
            }
            
            gadgets[instance.end_device_ids.device_id]={...instance.end_device_ids};

            if(instance.end_device_ids.device_id !=="bin-monitor-1" && instance.end_device_ids.device_id !=="om-demo-2" )
                quantities[instance.end_device_ids.device_id]={level:instance.uplink_message.decoded_payload.bin_level}

            let chart1=this.state.chart1

            chart1.options.xaxis.categories=Object.keys(historical)

            this.setState({...this.state,quantities:quantities,chart1:chart1})
          });

          Object.keys(historical).forEach(element=>{
            console.log(element,Object.keys(historical[element]))

         //   items['smart-bin-1'].push(historical['element'].smart-bin-1)


          });

          
         

        
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

          if(bin.level > 26)
             color='bg-success'
          if(bin.level <= 26)
              color='bg-orange'
          if(bin.level <=17)
              color='bg-danger'



          bars.push(<Bar obj={bin} name={name} color={color} />);
      })


        return(
            <LayoutApp>
              <h2 className="text-center bg-white p-2">Taka Smart Bin Analytics</h2>

              <div className="row">
                <div className="col-9">
                <div className="row justify-space-center mb-3">
                   {bars}
                </div>

              

              <div className="row">
                <div className="card col-lg-6 col-md-12 ">

                    <div className="mixed-chart">
                      <Chart options={this.state.chart1.options} series={this.state.chart1.series} type="bar" height={430}/>
                          {/* <Chart
                          options={this.state.chart1.options}
                          series={this.state.chart1.series}
                          type="line"
                          height={'500'}
                          /> */}
                      </div>
                </div>

                <div className="card col-lg-6 col-md-12 ">

                  <div className="mixed-chart">
                        {/* <Chart
                        options={this.state.options2}
                        series={this.state.series}
                        type="bar" /> */}
                    </div>
                </div>

                <div className="card col-lg-5 col-md-12 mx-1">

                  <div className="mixed-chart">
                        {/* <Chart
                        options={this.state.options3}
                        series={this.state.series}
                        type="bar"
                        title="Bin By count"
                        height={'200px'}
                        /> */}
                    </div>
                </div>
              </div>

                </div>
                <div className="col-3">

                   <div className="card  card-primary mb-1">
                     <div className="card-body">
                      <h6>Select bin status</h6>
                      <select className='form-control'>
                        <option value='1'>Full </option>
                        <option value='2'>Empty </option>
                        <option value='3'>Nearly Full </option>
                      </select>
                     </div>
                   </div>

                   <div className="card  card-primary mt-3">
                     <div className="card-body">
                      <h6>Select Duration</h6>

                      <div className="row">
                        <div className='col-6'>
                          <label>From date</label>
                          <input type='date' className="form-control"/>
                        </div>
                        <div className='col-6'>
                          <label>To date</label>
                          <input type='date' className="form-control"/>
                        </div>
                      </div>
                     
                     </div>
                   </div>

                   <div className="card card-primary mt-3">
                     <div className="card-body">
                      <h6>Legend</h6>

                      <div className="row px-3" >
                        <div className="col-2 bg-danger p-2"></div>
                        <div className="col-4">Full</div>
                      </div>

                      <div className="row px-3 mt-2">
                        <div className="col-2 bg-orange p-2"></div>
                        <div className="col-7">Half Empty</div>
                      </div>

                      <div className="row px-3 mt-2">
                        <div className="col-2 bg-success p-2"></div>
                        <div className="col-4"> Empty</div>
                      </div>
                     </div>
                   </div>

                   <div className="card card-primary mt-3">
                     <div className="card-body">
                      <h6>Select location</h6>
                      <select className='form-control'>
                       
                       <option value='1'>Strathmore</option>
                      </select>
                     </div>
                   </div>

                 

                </div>
              </div>
            </LayoutApp>
        )
    }
}

export default DashboardSimple;