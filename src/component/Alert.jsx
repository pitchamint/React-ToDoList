import { useEffect } from "react"
const Alert = ({msg,type,setAlert,list}) => {
    useEffect(()=>{
        const timeOut = setTimeout(()=>{
            setAlert({show:false,mgs:'',type:''})
        },1000)
        return()=>clearTimeout(timeOut)
    },[list])
    return(
        <p className={`alert ${type}`} >{msg}</p>
    )
}

export default Alert