import axios from 'axios'


export const addType =(data)=>(dispatch)=>{
    dispatch({ type: "TYPE", payload: data });
}
export const addColor =(data)=>(dispatch)=>{
    dispatch({ type: "COLOR", payload: data });
}
export const addSize =(data)=>(dispatch)=>{
    dispatch({ type: "SIZE", payload: data });
}
export const addJumlah =(data)=>(dispatch)=>{
    dispatch({ type: "JUMLAH", payload: data });
}
