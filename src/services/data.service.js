export function extract_firebase_object(obj){
    
    let temp=[];

    obj.forEach(object=>{

        let comp=[];

        Object.keys(object._document.data.value.mapValue.fields).forEach(key=>{
          comp[key]=Object.values(object._document.data.value.mapValue.fields[key])[0]
        })

        temp.push({...comp})
    });

    return temp
}