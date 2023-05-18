import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalTitle } from 'react-bootstrap'
import axios from 'axios'
import {  Space,Typography } from "antd";

export default function DonationHomeCard(props) {
  return (
    <div class="col">
      <div
        class="card"
        style={{
          maxHeight: 280,
          minHeight: 280,
          marginBottom: 20,
        }}
      >
        {/* <img
          src={props.donationImage}
          class="card-img-top"
          alt="image"
          style={{
            maxHeight: 180,
            minHeight: 140,
          }}
        />  */}
        <div class="card-body">
          <h5 class="card-title">{props.title}</h5>
          <p class="card-text">{props.userID}</p>
          <p class="card-text">{props.email}</p>
          <p class="card-text">{props.contactNumber}</p>
          <p class="card-text">{props.description}</p>
          <p class="card-text">{props.location}</p>
        </div>
        <Button size='sm' variant='primary'>View</Button>|
      </div>
    </div>
  );
//   const Employee = () => {
//     const [Data, setData] = useState([]);
//     const [RowData, SetRowData] = useState([])
//     const [ViewShow, SetViewShow] = useState(false)
//     const handleViewShow = () => { SetViewShow(true) }
//     const hanldeViewClose = () => { SetViewShow(false) }
//     //FOr Edit Model
//     const [ViewEdit, SetEditShow] = useState(false)
//     const handleEditShow = () => { SetEditShow(true) }
//     const hanldeEditClose = () => { SetEditShow(false) }
//     //FOr Delete Model
//     const [ViewDelete, SetDeleteShow] = useState(false)
//     const handleDeleteShow = () => { SetDeleteShow(true) }
//     const hanldeDeleteClose = () => { SetDeleteShow(false) }
//     //FOr Add New Data Model
//     const [ViewPost, SetPostShow] = useState(false)
//     const handlePostShow = () => { SetPostShow(true) }
//     const hanldePostClose = () => { SetPostShow(false) }

//   return (
//     <div>
//         <Space size={20} direction="vertical">
//          <Typography.Title level={4}>Dashboard</Typography.Title>
//         <div className='row'>
//             <div className='mt-5 mb-4'>
//                 <Button variant='primary' onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
//                     Add New Employee
//                 </Button>
//             </div>
//         </div>
//         <div className='row'>
//             <div className='table-responsive'>
//                 <table className='table table-striped table-hover table-bordered'>
//                     <thead>
//                         <tr>
//                             <th>User Id</th>
//                             <th>Tital</th>
//                             <th>Email</th>
//                             <th>Number</th>
//                             <th>Description</th>
//                             <th>Location</th>
//                             <th>Date</th>
//                             <th>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {Data.map((props) =>
//                             <tr key={props.userID}>
//                                 <td>{props.donationTital}</td>
//                                 <td>{props.email}</td>
//                                 <td>{props.contactNumber}</td>
//                                 <td>{props.donationDescription}</td>
//                                 <td>{props.location}</td>
//                                 <td>{props.donationStartDate}</td>
//                                 <td style={{ minWidth: 190 }}>
//                                     <Button size='sm' variant='primary' onClick={() => { handleViewShow(SetRowData(props)) }}>View</Button>|
//                                     <Button size='sm' variant='warning' onClick={()=> {handleEditShow(SetRowData(props),setId(props._id))}}>Edit</Button>|
//                                     <Button size='sm' variant='danger' onClick={() => {handleViewShow(SetRowData(props),setId(props._id), setDelete(true))}}>Delete</Button>|
//                                 </td>
//                             </tr>
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//         {/* View Modal */}
//         <div className='model-box-view'>
//             <Modal
//                 show={ViewShow}
//                 onHide={hanldeViewClose}
//                 backdrop="static"
//                 keyboard={false}
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>View Employee Data</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div>
//                         <div className='form-group'>
//                             <input type="text" className='form-control' value={RowData.name} readOnly />
//                         </div>
//                         <div className='form-group mt-3'>
//                             <input type="email" className='form-control' value={RowData.email} readOnly />
//                         </div>
//                         <div className='form-group mt-3'>
//                             <input type="text" className='form-control' value={RowData.number} readOnly />
//                         </div>
//                         <div className='form-group mt-3'>
//                             <input type="text" className='form-control' value={RowData.nic} readOnly />
//                         </div>
//                         <div className='form-group mt-3'>
//                             <input type="text" className='form-control' value={RowData.address} readOnly />
//                         </div>
//                         {
//                             Delete && (
//                                 <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Delete Employee</Button>
//                             )
//                         }
//                     </div>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant='secondary' onClick={hanldeViewClose}>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//         {/* Modal for submit data to database */}
//         <div className='model-box-view'>
//             <Modal
//                 show={ViewPost}
//                 onHide={hanldePostClose}
//                 backdrop="static"
//                 keyboard={false}
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>Add new Employee</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div>
//                         <div className='form-group'>
//                             <input type="text" className='form-control' onChange={(e) => setname(e.target.value)} placeholder="Please enter Name" />
//                         </div>
//                         <div className='form-group mt-3'>
//                             <input type="email" className='form-control' onChange={(e) => setemail(e.target.value)} placeholder="Please enter email" />
//                         </div>
//                         <div className='form-group mt-3'>
//                             <input type="text" className='form-control' onChange={(e) => setnumber(e.target.value)} placeholder="Please enter Number" />
//                         </div>
//                         <div className='form-group mt-3'>
//                             <input type="text" className='form-control' onChange={(e) => setnic(e.target.value)} placeholder="Please enter NIC" />
//                         </div>
//                         <div className='form-group mt-3'>
//                             <input type="text" className='form-control' onChange={(e) => setaddress(e.target.value)} placeholder="Please enter Address" />
//                         </div>
//                         <Button type='submit' className='btn btn-success mt-4' onClick={handleSubmite}>Add Employee</Button>
//                     </div>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//         {/* Modal for Edit employee record */}
//         <div className='model-box-view'>
//             <Modal
//                 show={ViewEdit}
//                 onHide={hanldeEditClose}
//                 backdrop="static"
//                 keyboard={false}
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>Edit Employee</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <div>
//                         <div className='form-group'>
//                             <label>Name</label>
//                             <input type="text" className='form-control' onChange={(e) => setname(e.target.value)} placeholder="Please enter Name" defaultValue={RowData.name}/>
//                         </div>
//                         <div className='form-group mt-3'>
//                             <label>Email</label>
//                             <input type="email" className='form-control' onChange={(e) => setemail(e.target.value)} placeholder="Please enter email" defaultValue={RowData.email} />
//                         </div>
//                         <div className='form-group mt-3'>
//                             <label>Number</label>
//                             <input type="text" className='form-control' onChange={(e) => setnumber(e.target.value)} placeholder="Please enter Number" defaultValue={RowData.number}/>
//                         </div>
//                         <div className='form-group mt-3'>
//                             <label>NIC</label>
//                             <input type="text" className='form-control' onChange={(e) => setnic(e.target.value)} placeholder="Please enter NIC" defaultValue={RowData.nic}/>
//                         </div>
//                         <div className='form-group mt-3'>
//                             <label>Address</label>
//                             <input type="text" className='form-control' onChange={(e) => setaddress(e.target.value)} placeholder="Please enter Address" defaultValue={RowData.address}/>
//                         </div>
//                         <Button type='submit' className='btn btn-warning mt-4' onClick={handleEdit}>Edit Employee</Button>
//                     </div>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//         </Space>
//     </div>
// );
//                       }
}
