import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { deleteUser } from '../services/UserService'

function ModalDeleteUser(props) {
    const {showModalDeleteUser,handleClose, dataUserDelete, updateUserAfterDelete }=props
    

    
    const handleDeleteUser =async ()=>{
        
        let res=await deleteUser(dataUserDelete.id)
        if(res && res.status===200){
            updateUserAfterDelete(dataUserDelete)
            toast.success("Delete user succeed!")
            handleClose()
        }
        console.log("check res", res)
        
    }
  return (
    <div>
        <Modal
        show={showModalDeleteUser}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
         <div>Do you want to delete this user <br />
         <span><b>Name: {dataUserDelete.name} and email: {dataUserDelete.email}?</b></span>
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleDeleteUser()}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalDeleteUser
