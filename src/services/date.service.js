const date=()=>{
    let date=new Date();

    return date;
}

export const GetCurrentDate=()=> date().getFullYear()+"-"+date().getMonth()+"-"+date().getDate();

export const GetTimeStamp=()=>GetCurrentDate()+" "+date().getHours()+":"+date().getMinutes()
