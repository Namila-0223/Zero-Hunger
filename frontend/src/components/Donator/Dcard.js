import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBCardImage,
  MDBCardOverlay
} from 'mdb-react-ui-kit';
import NavBar from '../NavBar';
import '../../assets/images/1.jpg';
import '../../assets/images/2.jpg';


export default function Dcard() {
  return (
    <div>
    <nav>
      <NavBar />
    <MDBRow style={{"position":"align-center"}}>
      <MDBCol sm='6'>
        <MDBCard className='row-cols-1 row-cols-md-3 g-4'>
        <MDBCardImage overlay src='1.jpg'  style={{height:'500px'}}/>
          <MDBCardOverlay>
            <MDBCardTitle>Special title treatment</MDBCardTitle>
            <MDBCardText>
              With supporting text below as a natural lead-in to additional content.
            </MDBCardText>
            <MDBBtn href='RequesterSignIn'>Go somewhere</MDBBtn>
          </MDBCardOverlay>
        </MDBCard>
      </MDBCol>
    </MDBRow>
    </nav>
    </div>
    
  );
}