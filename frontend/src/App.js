import { Space } from "antd";
import {render} from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import "./App.css";
// import Homepage from "./Pages/Dashboard/homee";
// import AppFooter from "./Components/AppFooter";
// import AppHeader from "./Components/AppHeader";
// import PageContent from "./Components/PageContent";
// import SideMenu from "./Components/SideMenu";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Sidebar from './Sidebar';
import Home from './Home';
import { useState } from 'react';
import HomePage from "./pages/HomePage";
import RequesterSignIn from "./components/Donator/requesterSignIn";
import RequesterSignUp from "./components/Donator/requesterSignUp";
import Dcard from "./components/Donator/Dcard";
import CreateDonation from "./components/Donator/createDonation";
import Dash from "./dash/Dash";
import Employee from "./Employee";
import Customers from "./pages/Customers";
import DonationHome from "./components/Donator/HomePage/donationHome";
import GetRequestedDonations from "./components/Donator/reqDonationList";



function App() {
  const [toggle, setToggle] = useState(true)

  const Toggle = () => {
    setToggle(!toggle)
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/signin" element={<RequesterSignIn/>}/>
          <Route path="/signup" element={<RequesterSignUp/>}/>
          <Route path="/dcard" element={<Dcard/>}/>
          <Route path="/dash" element={<Dash/>}/>
          <Route path="/emp" element={<Employee/>}/>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/createDonaion" element={<CreateDonation/>}/>
      <Route path="/Dhome" element={<DonationHome/>}/>
      <Route path="/req" element={<GetRequestedDonations/>}/>

      




          
        </Routes>
      </BrowserRouter>



      {/* <AppHeader />
      <div className="SideMenuAndPageContent">
      <Routes>
          <Route path="/" element={<Homepage/>}/>
        </Routes>
        <SideMenu></SideMenu>
        
        <PageContent></PageContent>
      </div>
      <AppFooter /> */}
    {/* <div className='container-fluid bg-secondary min-vh-100 '>
      <div className='row '>
        {toggle && 
          <div className='col-4 col-md-2 bg-white vh-100 position-fixed'>
            <Sidebar />
          </div>
        }
        {toggle &&  
          <div className='col-4 col-md-2'></div>
        }
        <div className='col'>
          <Home Toggle={Toggle}/>
        </div>
      </div>
    </div> */}
    </div>
  )
}
export default App;

