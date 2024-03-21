import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { putUpdateUser } from '../services/UserService'
import { toast } from 'react-toastify'

function ModalEditUser(props) {
    const {showModalEditUser,handleClose, dataEditUser, updateUserAfterEdit }=props
    const [name, setName]=useState("")
    const[email, setEmail]=useState("")
    const[phone, setPhone]=useState("")
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');

    useEffect(()=>{
        setName(dataEditUser.name || '')
        setEmail(dataEditUser.email || '')
        setPhone(dataEditUser.phone || '')
        setStreet(dataEditUser.address?.street || '');
        setCity(dataEditUser.address?.city || '');
    }, [dataEditUser])

    const handleUpdateUser =async ()=>{
        const id=dataEditUser.id
        const address = { street, city };
        let res=await putUpdateUser(id, name, email, phone, address)
        if(res && res.data){
            updateUserAfterEdit({name:res.data.name, email:res.data.email, phone:res.data.phone, address:res.data.address, id:res.data.id})
            handleClose()
            toast.success("Update user succeed!")
        }
        else{
            toast.error("Error updating user")
        }
        
    }
  return (
    <div>
        <Modal
        show={showModalEditUser}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="form-add-user">
                <div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className='form-control' />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}className='form-control' />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} className='form-control' />
                </div>
                <div>
                    <label htmlFor="street">Street:</label>
                    <input type="text" id="street" placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} className="form-control" />
                </div>
                <div>
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="form-control" />
                </div>
            </div>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleUpdateUser()}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalEditUser
