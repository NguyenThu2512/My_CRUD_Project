import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { postCreateUser } from '../services/UserService'
import { toast } from 'react-toastify'

function ModalCreateUser(props) {
    const {showModalCreateUser,handleClose, updateUserAfterCreate }=props
    const [name, setName]=useState("")
    const[email, setEmail]=useState("")
    const[phone, setPhone]=useState("")

    const handleAddUser =async ()=>{
        let res=await postCreateUser(name, email, phone)
        if(res && res.data && res.data.id){
            updateUserAfterCreate({name:name,email:email, phone:phone})
            toast.success("Create user succeed!")
            handleClose()
        }
    }
  return (
    <div>
        <Modal
        show={showModalCreateUser}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add user</Modal.Title>
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
            </div>
         
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleAddUser()}>ADD</Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  )
}

export default ModalCreateUser
