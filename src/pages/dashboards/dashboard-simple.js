
import React from "react";
import LayoutApp from "../../components/layout-app";
import Chart from "react-apexcharts";

import { onValue, ref,getDatabase } from "firebase/database";
import { MainDatabase,MainFireStore } from "../../firebase-connectors/closed-loren";
import { GetCurrentDate, GetFirstDateOfTheMonth } from "../../services/date.service";

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
          
            bins:[ ],
            quantities:[],
            chart:this.chartStructure(),
            chart1:this.chartStructure(),
            chart2:this.chartStructure(),
            chart3:this.chartStructure(),
            from_date:GetFirstDateOfTheMonth(),
            to_date:GetCurrentDate()
          };
    }
    chartStructure(series=[],categories=[],title='',colors=['#d22d3d','#ffa500','#1b4c43']){
       return {
        series: series,
        options: {
          chart: {
            type: 'bar',
            height: 630,
            width:400
          },
          plotOptions: {
            bar: {
              horizontal: false,
              dataLabels: {
                position: 'top',
              },
            }
          },

          title: {
            text: title,
            align: 'center',
            floating: true
          },
          
          colors: colors,
          dataLabels: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '10px',
              colors: ['#000']
            }
          },
          stroke: {
            show: true,
            width: .1,
            colors: ['#fff']
          },
          tooltip: {
            shared: false,
            intersect: false
          },
          xaxis: {
            categories: categories,
          },
        },
      
      }
    }

    componentDidMount(){
    

      const db=MainDatabase;

      const query = ref(db, "bin_monitor_1");

        return onValue(query, (snapshot) => {
        
          const data = snapshot.val();

          let gadgets=new Object();

          let quantities=new Object();

          let historical=new Object();

        
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

           
          });


         

          let cleanBin={1:[],2:[],3:[]};

          Object.keys(historical).forEach(key=>{
            
            if( parseInt(key.split("-")[0]) >= parseInt(this.state.from_date.split("-")[0]) & parseInt(key.split("-")[1]) >= parseInt(this.state.from_date.split("-")[1])){
              Object.keys(historical[key]).forEach( (element,keyp)=>{

          
                let items=historical[key][Object.keys(historical[key])[keyp]];
  
                 if(items.length > 1){
                  cleanBin[keyp+1].push(items[0])
                }else{
                  cleanBin[keyp+1].push(0)
                }
  
              })
            }
            
            
          });

          

          this.setState({...this.state,quantities:quantities,
            
            chart:this.chartStructure([{data:cleanBin[1],name:"Smart Bin 1"},{data:cleanBin[2],name:"Smart Bin 2"},{data:cleanBin[3],name:"Smart Bin 3"}],Object.keys(historical),"Comparison For Bin Collection "),
            chart1:this.chartStructure([{data:cleanBin[1],name:"Smart Bin 1"}],Object.keys(historical),"Smart Bin 1 report",['#d22d3d']),
            chart2:this.chartStructure([{data:cleanBin[2],name:"Smart Bin 2"}],Object.keys(historical),"Smart Bin 1 report",['#ffa500']),
            chart3:this.chartStructure([{data:cleanBin[3],name:"Smart Bin 3"}],Object.keys(historical),"Smart Bin 1 report",['#1b4c43']),
         
         
          })


          console.log("historical-data",cleanBin.length)
          console.log("historical-length",Object.keys(historical).length)



          Object.keys(historical).forEach(element=>{
          
          });

          
         

        
        });
    }

    handleToDate(e){
      this.setState({...this.state,to_date:e.target.value})
    }

    handleFromDate(e){
      console.log("change",e.target.value)

      this.setState({...this.state,from_date:e.target.value})
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
                <div className="card col-lg-12 col-md-12 ">

                    <div className="mixed-chart">
                      <Chart options={this.state.chart.options} series={this.state.chart.series} type="bar" height={630} />
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
                        { <Chart
                        options={this.state.chart1.options}
                        series={this.state.chart1.series}
                        type="bar"
                        title="Smart Bin Monitor 1"
                        height={400} /> }
                    </div>
                </div>

                <div className="card col-lg-5 col-md-12 mx-1">

                  <div className="mixed-chart">
                        {<Chart
                        options={this.state.chart2.options}
                        series={this.state.chart2.series}
                        type="bar"
                        title="Smart Bin Monitor 2"
                        height={400}
                        /> }
                    </div>
                </div>

                <div className="card col-lg-5 col-md-12 mx-1">

                  <div className="mixed-chart">
                        {<Chart
                        options={this.state.chart3.options}
                        series={this.state.chart3.series}
                        type="bar"
                        title="Smart Bin Monitor 3"
                        height={400}
                        /> }
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
                          <input type='date' className="form-control" onChange={this.handleFromDate.bind(this)} value={this.state.from_date}/>
                        </div>
                        <div className='col-6'>
                          <label>To date</label>
                          <input type='date' className="form-control" onChange={this.handleToDate.bind(this)} value={this.state.to_date}/>
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