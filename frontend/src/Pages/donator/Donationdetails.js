import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalTitle } from 'react-bootstrap'
import axios from 'axios'
import {  Space,Typography } from "antd";

import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import NavBar from '../../components/NavBar';
import DashNavBar from '../../components/DashNavBar';

import { newDonation } from "../../api/donator.api";
import { getCookie } from "../../components/common/getCookie";





const Donationdetails = () => {
    const [Data, setData] = useState([]);
    const [RowData, SetRowData] = useState([])
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = () => { SetViewShow(true) }
    const hanldeViewClose = () => { SetViewShow(false) }
    //FOr Edit Model
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = () => { SetEditShow(true) }
    const hanldeEditClose = () => { SetEditShow(false) }
    //FOr Delete Model
    const [ViewDelete, SetDeleteShow] = useState(false)
    const handleDeleteShow = () => { SetDeleteShow(true) }
    const hanldeDeleteClose = () => { SetDeleteShow(false) }
    //FOr Add New Data Model
    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => { SetPostShow(false) }



    const [Delete,setDelete] = useState(false)
    //Id for update record and Delete
    const [id,setId] = useState("");
    
    const navigate = useNavigate();
    const [datatable, setDatatable] = useState([]);
    const [search, setSearch] = useState("");
    const getReqOrgList = async () => {
        try {
          const data = await axios.get (`http://localhost:8090/donator/getDonations`);
          setDatatable(data.data);
        } catch (e) {
          console.log(e);
        }
      };
    
      useEffect(() => {
        getReqOrgList();
      }, []);

      const onView = (id) => {
        const oid = id;
        navigate(`/admin/viewreqfund/${oid}`);
        console.log(oid);
      };
    
    const [donationTitle, setdonationTitle] = useState("");
    const [email , setemail] = useState("");
    const [contactNumber, setcontactNumber] = useState("");
    const [donationDescription, setdonationDescription] = useState("");
    const [location, setLocation] = useState("");
    const [donationEndDate, setDonationEndDate] = useState("");


    const editDonation = async (e) => {
        e.preventDefault();
        const donation = {
          donationTitle,
          email,
          contactNumber,
          donationDescription,
          location,
         
        };
        await axios
          .put(`http://localhost:8090/donator/updateDonation/${id}`, donation)
          .then((res) => {
            swal("Donation update succesfully", "", "success").then((value) => {
              if (value) {
                setTimeout(function () {
                  window.location.reload();
                }, 3000);
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      };

    const onDelete = (id) => {
        swal({
          title: "Are you sure?",
          text: "The Donation Request Will be Rejected",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willDelete) => {
          if (willDelete) {
            axios
              .put(`http://localhost:8090/donator/deleteDonation/${email}`)
              .then(() => {
                if (willDelete) {
                  swal("The Donation Request Has Been Rejected!", {
                    icon: "success",
                  });
                  setTimeout(function () {
                    window.location.reload();
                  }, 3000);
                } else {
                  swal("File Is Not Deleted");
                }
              });
          }
        });
      };


    //call this function in useEffect
    console.log(ViewShow, RowData)
    useEffect(() => {
        getReqOrgList();
    }, [])


  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate() + 1;
  var year = dtToday.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();
  var minDate = year + "-" + month + "-" + day;

  console.log(minDate);

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(getCookie("uId"));
  }, []);

  const createDonation = async (e) => {
    setLoading(true);
    e.preventDefault();
    
    const userID = userId;

    const donation = {
      userID,
      donationTitle,
      email,
      location,
      donationEndDate,
      contactNumber,
      donationDescription,
    };
    console.log(donation);
    await newDonation(donation)
      .then((res) => {
        setLoading(false);
        swal("Donation Succesfully Created", "", "success").then((value) => {
          if (value)
          setTimeout(function () {
            window.location.reload();
          }, 3000);
        });
      })
      .catch((err) => {
        console.log(err);
        swal("Donation creation failed", "Please try again", "error").then(
          (value) => {
            if (value) setTimeout(function () {
              window.location.reload();
            }, 3000);
          }
        );
      });
  };

    return (
        <div>
            {/* <DashNavBar/> */}
            <Space size={20} direction="vertical">
            <div className='row'>
                <div className='mt-5 mb-4'style={{"paddingLeft":"525px"}}>
                <Space direction="horizontal" size={20}>
                    <Button  variant='primary' onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
                        Add New Donation
                    </Button>
                    
                    <Button  variant='primary' onClick={() => { handlePostShow() }}><i className='fa fa-plu'></i>
                       Genarate Report
                    </Button>
                    </Space>
                </div>
            </div>
            <div className='row'>
                <div className='table-responsive' style={{"paddingRight":"200px","paddingLeft":"200px"}}>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                
                                <th>Tital</th>
                                <th>Email</th>
                                <th>Number</th>
                                <th>Description</th>
                                <th>Location</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {Data.map((item) =>
                                <tr key={item.userID}>
                                    <td>{item.donationTital}</td>
                                    <td>{item.email}</td>
                                    <td>{item.contactNumber}</td>
                                    <td>{item.donationDescription}</td>
                                    <td>{item.location}</td>
                                    <td>{item.donationStartDate}</td>
                                    <td style={{ minWidth: 190 }}>
                                        <Button size='sm' variant='primary' onClick={() => { handleViewShow(SetRowData(item)) }}>View</Button>|
                                        <Button size='sm' variant='warning' onClick={()=> {handleEditShow(SetRowData(item),setId(item._id))}}>Edit</Button>|
                                        <Button size='sm' variant='danger' onClick={() => {handleViewShow(SetRowData(item),setId(item._id), setDelete(true))}}>Delete</Button>|
                                    </td>
                                </tr>
                            )} */}
                            {datatable
                  .filter((org) => {
                    if (search == "") {
                      console.log(org);
                      return org;
                    } else if (
                      org.name
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase())
                    ) {
                      return org;
                    }
                  })

                    .map((org) => {
                    return (
                      <tr>
                        <td>{org.donationTital}</td>
                        <td>{org.email}</td>
                        <td>{org.contactNumber}</td>
                        <td>{org.donationDescription}</td>
                        <td>{org.location}</td>
                        <td>{org.donationStartDate}</td>
                        <td style={{ minWidth: 190 }}>
                        <Button size='sm' variant='primary' onClick={() => { handleViewShow(SetRowData(org)) }}>View</Button>|
                        <Button size='sm' variant='warning' onClick={()=> {handleEditShow(SetRowData(org),setId(org._id))}}>Edit</Button>|
                        <Button size='sm' variant='danger' onClick={() => {handleViewShow(SetRowData(org),setId(org._id), setDelete(true))}}>Delete</Button>|
                        </td>
                        {/* <td>{org.donationTitle}</td>
                        <td>{org.email}</td>
                        <td>{org.donationDescription}</td> */}
                        {/* <td>
                          <div>
                            <Link
                              to={"/donator/view/" + org._id}
                              state={{
                                fromAdmin: true,
                                req:true
                              }}
                            >
                              <button className="btn btn-outline-info">
                                View
                              </button>
                            </Link>
                          </div>
                        </td> */}
                      </tr>
                    );
                  })}



                        </tbody>
                    </table>
                </div>
            </div>
            {/* View Modal */}
            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>View Donation Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.donationTital} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' value={RowData.email} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.contactNumber} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.donationDescription} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.location} readOnly />
                            </div>
                            {
                                Delete && (
                                    <Button type='submit' className='btn btn-danger mt-4' onClick={onDelete}>Delete Donation</Button>
                                )
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeViewClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* Modal for submit data to database */}
            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add new Donation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div class="row">
                      <div class="mx-auto">
                        <div class="card z-index-0 fadeIn3 fadeInBottom">
                          <div class="card-body">
                            <form
                              role="form"
                              class="text-start"
                              onSubmit={createDonation}
                            >
                    <div class="d-flex justify-content-center">
                      <h4>Create Your Donation</h4>
                    </div>
                    <div class="d-flex justify-content-between">
                      <div></div>
                      <div></div>
                      <h6>* Required Fields</h6>
                    </div>

                    <div class="input-group mb-3 input-group input-group-outline mb-3">
                      <input
                        type="text"
                        maxLength={35}
                        class="form-control"
                        placeholder="Donation Title*"
                        aria-label="Donation Title"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                          setdonationTitle(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div class="input-group mb-3 input-group input-group-outline mb-3">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Location*"
                        aria-label="Location"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                          setLocation(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div class="input-group mb-3 input-group input-group-outline mb-3">
                      <input
                        type="text"
                        placeholder="Contact Number*"
                        aria-label="Contact Number"
                        aria-describedby="basic-addon1"
                        title="Error Message"
                        pattern="[0]{1}[0-9]{9}"
                        class="form-control"
                        onChange={(e) => {
                          setcontactNumber(e.target.value);
                        }}
                      
                      />
                      {/* <input type="text" name="country_code"></input> */}
                    </div>
                    <div class="input-group mb-3 input-group input-group-outline mb-3">
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email*"
                        aria-label="Email"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                        required
                      />
                    </div>
                    <div class="input-group mb-3 input-group input-group-outline mb-3">
                      <input
                        placeholder="Donation End Date"
                        class="form-control"
                        type="text"
                        min={minDate}
                        max="2025-05-20"
                        id="datefield"
                        onFocus={(e) => (e.target.type = "date")}
                        onChange={(e) => {
                          setDonationEndDate(e.target.value);
                        }}
                      />
                    </div>
                    <div class="input-group mb-3 input-group input-group-outline mb-3">
                      <textarea
                        class="form-control"
                        placeholder="Description about the donation*"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        onChange={(e) => {
                          setdonationDescription(e.target.value);
                        }}
                        required
                      ></textarea>
                    </div>
                    

                    <div class="text-center">
                      <button type="submit" class="btn btn-secondary">
                        Create Donation
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldePostClose}>Close</Button>
                    </Modal.Footer>
                    </Modal>
            </div>
                    {/* Modal for Edit donation record */}
                    <div className='model-box-view'>
                     <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Donation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Tital</label>
                                <input type="text" className='form-control' onChange={(e) => setdonationTitle(e.target.value)} placeholder="Please enter Tiatl" defaultValue={RowData.donationTital}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Email</label>
                                <input type="email" className='form-control' onChange={(e) => setemail(e.target.value)} placeholder="Please enter email" defaultValue={RowData.email} />
                            </div>
                            <div className='form-group mt-3'>
                                <label>Number</label>
                                <input type="text" className='form-control' onChange={(e) => setcontactNumber(e.target.value)} placeholder="Please enter Number" defaultValue={RowData.contactNumber}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Description</label>
                                <input type="text" className='form-control' onChange={(e) => setdonationDescription(e.target.value)} placeholder="Please enter Description" defaultValue={RowData.donationDescription}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Location</label>
                                <input type="text" className='form-control' onChange={(e) => setLocation(e.target.value)} placeholder="Please enter location" defaultValue={RowData.location}/>
                            </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={editDonation}>Edit Donation</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            </Space>
        </div>
    );
};

export default Donationdetails;