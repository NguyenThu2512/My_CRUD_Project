import axios from "./customize_axios"


const getUser = ()=>{
    return axios.get("/users")
}
const postCreateUser=(name, email, phone) =>{
    return axios.post("/users", {name, email, phone})
}

const putUpdateUser=(id,name, email, phone, address) =>{
    return axios.put(`/users/${id}`, {name, email, phone,address})
}
const deleteUser=(id)=>{
    return axios.delete(`/users/${id}`)
}
export {getUser, postCreateUser, putUpdateUser, deleteUser}