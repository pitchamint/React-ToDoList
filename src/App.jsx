import { v4 as uuidv4 } from 'uuid';
import './App.css'
import List from './component/list';
import Alert from './component/Alert';
import { useState } from 'react'

function App() {
  //สร้าง state ในการรอรับข้อมูลที่ผู้ใช้ป้อนใน input เมื่อกดปุ่ม add
  const [name,setName] = useState("")
  //นำข้อมูลมายัดใน list โดยให้เป็น array
  const [list,setList] = useState([])

  //เก็บสถานะของ alert
  const [alert,setAlert] = useState({show:false,msg:'',type:''})
  //เพื่อเปลี่ยนปุ่มจากเพิ่มข้อมูลเป็นการแก้ไขข้อมูล นำ state ไปใส่ที่ button โดยการกำหนดเงื่อนไข
  const [checkEditItem,setCheckEditItem] = useState(false) 
  //สรา้ง state เพื่อจดจำเลข id ท่ีมีการแก้ไข
  const [editId,setEditId] = useState(null)


  //ทำหน้าที่เก็บข้อมูลที่เราเพิ่มมา
  const submitData = (e) =>{
    e.preventDefault()
    if(!name){
      //แสดง alert
      setAlert({show:true,msg:"กรุณาป้อนข้อมูล",type:"error"}) 
    }else if(checkEditItem && name){
      //กระบวนการอัพเดตข้อมูลรายการที่ต้องการแก้ไข
      const result = list.map((item)=>{
        if(item.id === editId){
            return {...item,title:name}
        } 
        return item
      })
      setList(result)
      setName('')
      setCheckEditItem(false)
      setEditId(null)
      setAlert({show:true,msg:"แก้ไขข้อมูลเรียบร้อย",type:"success"})
    }else{
        const newItem = {
          id: uuidv4(),
          title : name
        }
         //จัดเก็บข้อมูลใน newItem ไว้ใน state list 
        setList([...list,newItem])
        setName('') //ให้ช่องมันว่างเมื่อกดปุ่ม add แล้ว
        setAlert({show:true,msg:"บันทึกข้อมูลเรียบร้อย",type:"success"}) 
      }
  }
  //function ในการลบ
  //ทำการเช็คเลขไอดี ว่าเลขไอดีของlist โดยการกรองเข้าทุกตัว กับไอดีที่เรากดปุ่มลบมันตรงกันมั้ย ถ้าไม่เราจะเก็บกลับเข้าstateให้เป็ข้อมูลล่าสุด (มันก็จะแสดงอันที่เราไม่ได้ลบ)
  const removeItem = (id) =>{
    const result =  list.filter((item)=>item.id !== id)
    setList(result)
    setAlert({show:true,msg:"ลบข้อมูลเรียบร้อย!!",type:"error"})
  }
  //function ในการแก้ไขข้อมูล
  const editItem = (id) =>{
    console.log("แก้ไขข้อมูล" ,id)
    setCheckEditItem(true)
    setEditId(id)
    const searchItem = list.find((item)=>item.id === id)
    console.log(searchItem)
    setName(searchItem.title) //เมื่อมีการกดแก้ไขข้อมูลให้นำเอาข้อมูลของ title ในรายการนั้นมาแสดงใน text fill
  }
  return (

    <section className="container">
      <h1>TO DO LIST</h1>
      {alert.show && <Alert {...alert} setAlert={setAlert} list={list}/>}
      <form className="form-group" onSubmit={submitData}>
        <div className="form-control">
          <input type="text" className="text-input" 
          onChange={(e)=> setName(e.target.value)}
          value={name}
          />
          <button type="submit" className="submit-btn">
            {checkEditItem ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}
          </button>
        </div>
      </form>

      <section className="list-container">
          {list.map((data,index)=>{
            return <List key={index} {...data} removeItem={removeItem} editItem={editItem}/> //{...data}เป็นการ props ข้อมูล
          })}
      </section>
    </section>
  )
}

export default App
