import React, { useEffect, useState } from 'react'
import "./Home.css"
import { Form, InputGroup, Table } from 'react-bootstrap'
import { getUser } from '../services/UserService';
import ModalCreateUser from './ModalCreateUser';
import ReactPaginate from 'react-paginate';
import ModalEditUser from './ModalEditUser';
import _, { debounce } from "lodash";
import ModalDeleteUser from './ModalDeleteUser';

function Home() {

  const [listUser, setListUser]=useState([]);
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalEditUser, setShowModalEditUser] = useState(false);
  const [dataEditUser, setDataEditUser] = useState({})
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
  const [dataUserDelete, setDataUserDelete] = useState({})
  const [pageNumber, setPageNumber] = useState(0);
  const [sortBy, setSortBy]=useState("asc");
  const [sortField, setSortField] = useState("id")
  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  useEffect(()=>{
    getListUser()
    
  }, [pageNumber])
  const getListUser = async ()=>{
    let res= await getUser()
    if(res && res.data){
      setListUser(res.data)
    }
  }

  const handleCreateUser=()=>{
    setShowModalCreateUser(true)

  }
  const handleClose=()=>{
    setShowModalCreateUser(false)
    setShowModalEditUser(false)
    setShowModalDeleteUser(false)
  }
  const updateUserAfterCreate =(user)=>{
    setListUser([user, ...listUser])
  }

  const pageCount = Math.ceil(listUser.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleEditUser =(edit_user)=>{
    setShowModalEditUser(true)
    setDataEditUser(edit_user)
  }
  const updateUserAfterEdit =(user)=>{
    let cloneListUser= _.cloneDeep(listUser)
  
    let index=cloneListUser.findIndex((item)=>item.id===user.id)
    cloneListUser[index].name=user.name;
    cloneListUser[index].email=user.email;
    cloneListUser[index].phone=user.phone;
    cloneListUser[index].address=user.address;

    setListUser(cloneListUser)
  }
  const handleDeleteUser=(user_delete)=>{
    setShowModalDeleteUser(true)
    setDataUserDelete(user_delete);
  }
  const updateUserAfterDelete=(user_delete)=>{
    let cloneListUser=_.cloneDeep(listUser)
    cloneListUser=cloneListUser.filter(item=>item.id !==user_delete.id)
    console.log("check del", cloneListUser)
    setListUser(cloneListUser)
  }

  const handleSort =(sortby, sortfield)=>{
    setSortBy(sortby)
    setSortField(sortfield)
    let cloneListUser=_.cloneDeep(listUser)
    cloneListUser=_.orderBy(cloneListUser, [sortField], [sortBy])
    setListUser(cloneListUser)
  }
  const handleSearch=debounce((event)=>{
    let keyword=event.target.value;
    let cloneListUser=_.cloneDeep(listUser)
    cloneListUser=cloneListUser.filter(item=>item.email.includes(keyword) || item.name.includes(keyword) )
    if(keyword){
      setListUser(cloneListUser)
    }
    else{
      getListUser()
    }
    
  }, 500)

  return (
    <div className="home">
      <div className="home-header">
        <h3>Manage Customer</h3>
        <div>
            <i className="fas fa-cog"></i> Setting
        </div>
      </div>
      
      <div className="home-table-container container my-4">

        <div className="table-head d-flex justify-content-between my-3">
          <div className="table-search">
            <div className="search-container">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Search name or email..." onChange={(e)=>handleSearch(e)} />
            </div>
          </div>
          <div className="table-create-data">
            <button className="btn btn-success" onClick={()=>handleCreateUser()}>
            <i className="fas fa-plus-circle"></i> Add new</button>
          </div>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID &nbsp;
                <span>
                  <i className="fas fa-arrow-up" onClick={()=>handleSort("asc", "id")}></i>
                  <i className="fas fa-arrow-down" onClick={()=>handleSort("desc", "id")}></i>
                </span>
              </th>
              <th>Name  &nbsp;
                <span>
                  <i className="fas fa-arrow-up" onClick={()=>handleSort("asc", "name")}></i>
                  <i className="fas fa-arrow-down" onClick={()=>handleSort("desc", "name")}></i>
                </span>

              </th>
              <th>Email  &nbsp;
                <span>
                  <i className="fas fa-arrow-up" onClick={()=>handleSort("asc", "email")}></i>
                  <i className="fas fa-arrow-down" onClick={()=>handleSort("desc", "email")}></i>
                </span>

              </th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { listUser && listUser.length > 0 &&
              listUser
              .slice(pagesVisited, pagesVisited + usersPerPage)
              .map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.address ? `${user.address.street} ${user.address.city}` : ''}</td>
                  <td>
                    <div key={index}>
                      <button className='btn btn-warning me-3' onClick={()=> handleEditUser(user)}>Edit</button>
                      <button className='btn btn-danger' onClick={()=>handleDeleteUser(user)}>Delete</button>
                    </div>
                  </td>
                </tr>)
                )} 
          </tbody>
        </Table>
        <ReactPaginate
          breakLabel="..." nextLabel="next >"  onPageChange={changePage} pageRangeDisplayed={5}
          pageCount={pageCount} previousLabel="< previous" pageClassName='page-item' pageLinkClassName='page-link'
          previousClassName='page-item' previousLinkClassName='page-link' nextClassName='page-item'
          nextLinkClassName='page-link' breakClassName='page-item' breakLinkClassName='page-link'
          containerClassName='pagination' activeClassName='active'
        />
        <ModalCreateUser showModalCreateUser={showModalCreateUser} handleClose={handleClose} updateUserAfterCreate={updateUserAfterCreate}/>
        <ModalEditUser showModalEditUser={showModalEditUser} handleClose={handleClose} dataEditUser={dataEditUser} updateUserAfterEdit={updateUserAfterEdit}/>
        <ModalDeleteUser showModalDeleteUser={showModalDeleteUser} handleClose={handleClose} dataUserDelete={dataUserDelete} updateUserAfterDelete={updateUserAfterDelete}/>
      </div>
    </div>
  )
}

export default Home
