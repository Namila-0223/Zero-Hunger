import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  getAllDonations,
} from "../../../api/donator.api";
import { getCookie } from "../../common/getCookie";
import LoadingSpinner from "../../common/LoadingSpinner";
import Footer from "../../Footer";
import NavBar from "../../NavBar";
// import DonationDescription from "../DonationView/DonationViewComponents/DonationDescription";
import DonationHomeCard from "./donationHomeCard";
import AppHeader from "../../Dashboard/AppHeader";

export default function DonationHome() {
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();
  // const markAsCompleted = (id) => {
  //   // console.log(id);
  //   if (userId == false) {
  //     //     swal()
  //     //
  //     swal({
  //       title: "You are not logged in !!",
  //       text: "Please login to create a donation",
  //       icon: "warning",
  //       buttons: true,
  //       dangerMode: true,
  //     }).then((willDelete) => {
  //       if (willDelete) {
  //         navigate("/signin");
  //       }
  //     });
  //   } else {
  //     navigate("/createDonation");
  //   }
  // };
  useEffect(() => {
    setUserId(getCookie("uId"));
  }, []);
  
  const [loading, setLoading] = useState(false);
  const [donation, setDonation] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    setLoading(true);
    //fetching all inbound item data from the database
    getAllDonations()
      .then((res) => {
        setLoading(false);
        console.log(res);
        if (res.data.length > 0) {
          setDonation(res.data);
          console.log(res.data);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);
  return (
    <>
      <div class="overflow-hidden" style={{}}>
        <AppHeader />
        {loading ? (
          <div
            style={{
              marginTop: 250,
              minHeight: "100vh",
            }}
          >
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div
              className="container"
              style={{
                //   marginLeft: 150,
                overflow: "hidden",
                // position: "fixed"
                // marginTop: 20,
                // marginBottom: 20,
              }}
            >
              <div
                class="d-flex justify-content-around"
                style={{
                  marginTop: 20,
                  marginBottom: 10,
                  overflow: "hidden",
                }}
              >
                {/* <div className="row d-flex my-3 me-3"> */}
                <div className="col-lg-4 col-md-6 col-sm-8">
                  <div className="input-group input-group-outline bg-white">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Search here..."
                      aria-label="Search"
                      onChange={(e) => {
                        setsearchTerm(e.target.value);
                      }}
                    />{" "}
                  </div>
                </div>{" "}
                {/* <div></div>
                <h2>All Donations</h2>
                <div></div> */}
                {/* <button className="btn btn-primary " onClick={markAsCompleted}>
                  Create A Donation
                </button> */}
              </div>
            </div>

            <div
              class="row row-cols-4"
              style={{
                marginLeft: 20,
                marginRight: 20,
                overflow: "hidden",
              }}
            >
              {donation
                .filter((val) => {
                  // console.log(val == 0);
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.donationTitle
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                      val.email
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    val.donationDescription
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return (
                      <>
                        <h2>Nooasa</h2>
                      </>
                    );
                  }
                })
                .map(function (f) {
                  console.log(f);
                  return (
                    <Link to={"/donator/view/" + f._id}>
                      <DonationHomeCard
                        donationImage={f.donationImage}
                        title={f.donationTitle}
                        userid={f.email}
                        description={f.donationDescription}
                      />
                    </Link>
                  );
                })}
            </div>
          </>
        )}

        <Footer />
      </div>
    </>
  );
}
