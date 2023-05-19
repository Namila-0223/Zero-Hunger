import { BellFilled, UserOutlined  } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { getComments, getOrders } from "../../../API copy";
import LOGO from "../../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";


import { getUserDonations } from "../../../api/donator.api";
import { Button, Modal, ModalTitle } from 'react-bootstrap'
import swal from "sweetalert";
import { newDonation } from "../../../api/donator.api";
import { getCookie } from "../../../components/common/getCookie";

function AppHeader() {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);

  const [userId, setUserId] = useState("");
  const navigate = useNavigate()
  const [showDonations, setShowDonations] = useState(false);
  useEffect(() => {
    userId
      ? getUserDonations(userId)
          .then((donations) => {
            if (donations.length > 0) {
              setShowDonations(true);
            }
            setShowDonations(false);
          })
          .catch((e) => console.log(e))
      : setShowDonations(false);
  }, [userId]);
  useEffect(() => {
    setUserId(getCookie("uId"));
    // setLoading(true);
    //fetching all inbound item data from the database
  }, [userId]);
  // console.log(userId); 


  const logOut = (e) => {

    e.preventDefault();
    document.cookie = "uId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/signin"); 
  }; 

  //FOr Add New Data Model
  const [ViewPost, SetPostShow] = useState(false)
  const handlePostShow = () => { SetPostShow(true) }
  const hanldePostClose = () => { SetPostShow(false) }
  const [donationTitle, setdonationTitle] = useState("");
  const [email , setemail] = useState("");
  const [contactNumber, setcontactNumber] = useState("");
  const [donationDescription, setdonationDescription] = useState("");
  const [location, setLocation] = useState("");
  const [donationEndDate, setDonationEndDate] = useState("");

  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate() + 1;
  var year = dtToday.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();
  var minDate = year + "-" + month + "-" + day;

  console.log(minDate);

  const [loading, setLoading] = useState(false);
  // const [userId, setUserId] = useState("");

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
    <div className="AppHeader">
      <Image
        style={{"marginTop":"-20px",}}
        width={250}
        src={LOGO}
      ></Image>
      <Typography.Title>foodies</Typography.Title>
      
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

            <li className="nav-item dropdown ms-3">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Profile
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="/dash">
                        Dashbaord
                      </a>
                    </li>

                    

                    {setShowDonations ? (
                      <li>
                        <a className="dropdown-item" href="/Dhome">
                          Your donations
                        </a>
                      </li>
                    ) : (
                      <li>
                        <a
                          className="dropdown-item"
                          href="/createDonation"
                        >
                          Create a donation
                        </a>
                      </li>
                    )}
                    <li>
                      <a className="dropdown-item" onClick={() => { handlePostShow() }}href="#">
                        Create request
                      </a>
                    </li>
                    <Link to={`/user/profile/${userId}`} key={userId}>
                      <li>
                        <a className="dropdown-item" href="#">
                          Account Settings
                        </a>
                      </li>
                    </Link>
                    
                    <Link to="/requester/signin">
                      <li>
                        <a className="dropdown-item" onClick={logOut} href="#">
                          Sign out
                        </a>
                      </li>
                    </Link>
                  </ul>
            </li>

                {/* Modal for submit data to database */}
            
      
      
    </div>
  );
}
export default AppHeader;
