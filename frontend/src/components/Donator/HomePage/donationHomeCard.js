import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalTitle } from 'react-bootstrap'
import axios from 'axios'
import {  Space,Typography } from "antd";

export default function DonationHomeCard(props) {

  const [RowData, SetRowData] = useState([])
  const [ViewShow, SetViewShow] = useState(false)
  const handleViewShow = () => { SetViewShow(true) }
  const hanldeViewClose = () => { SetViewShow(false) }


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
        <img
          src={props.donationImage}
          class="card-img-top"
          alt="image"
          style={{
            maxHeight: 180,
            minHeight: 140,
          }}
        /> 
        <div class="card-body">
          <h5 class="card-title">{props.title}</h5>
          <p class="card-text">{props.userID}</p>
          <p class="card-text">{props.email}</p>
          <p class="card-text">{props.contactNumber}</p>
          <p class="card-text">{props.description}</p>
          <p class="card-text">{props.location}</p>
        </div>
        <Button size='sm' variant='primary' onClick={() => { handleViewShow(SetRowData(props)) }}>View</Button>
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
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant='secondary' onClick={hanldeViewClose}>Close</Button>
                  </Modal.Footer>
              </Modal>
          </div>

    </div>
  );

             
                      
}
