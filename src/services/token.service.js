
const PRIVATE_TOKEN_DEF="app.eco.mode"

export const SetToken=(value)=>{
    localStorage.setItem(PRIVATE_TOKEN_DEF,value)
}

export const DeleteToken=()=>{
    localStorage.removeItem(PRIVATE_TOKEN_DEF)
}

export const GetToken=()=>localStorage.getItem(PRIVATE_TOKEN_DEF)