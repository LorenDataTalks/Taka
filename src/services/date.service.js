const date=()=>{
    let date=new Date();

    return date;
}

export const GetCurrentYear=()=>date().getFullYear()

export const GetCurrentMonth=()=>date().getMonth() > 10 ? date().getMonth() : "0"+date().getMonth()

export const GetCurrentDate=()=> GetCurrentYear()+"-"+GetCurrentMonth()+"-"+(date().getDate() > 10 ?  date().getDate() : "0"+date().getDate()) ;

export const GetTimeStamp=()=>GetCurrentDate()+" "+date().getHours()+":"+date().getMinutes()

export const GetFirstDateOfTheMonth=()=>GetCurrentYear()+"-"+GetCurrentMonth()+"-01";
