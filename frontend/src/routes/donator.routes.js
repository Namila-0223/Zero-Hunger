import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateDonation from "../components/Donator/createDonation";
import DashboardCard from "../components/Donator/DashboardComponents/dashboardCard";
import ActiveDonations from "../components/Donator/DashboardComponents/activeDonations";
import DonatorCard from "../components/Donator/donatorCard";
import DonatorDashboard from "../components/Donator/donatorDashboard";
import EditDonation from "../components/Donator/editDonation";
import DonationView from "../components/Donator/DonationView/donationView";
import SeeRequests from "../components/Donator/SeeRequests/seeRequests";
import SendRequest from "../components/Donator/SendRequest/sendRequest";
import PendingDonationView from "../components/Donator/PendingDonations/pendingDonationView";
import RejectedDonationView from "../components/Donator/RejectedDonations/rejectedDonationView";
import AcceptedRequestView from "../components/Donator/AcceptedRequests/acceptedRequestsView";
import DonationHome from "../components/Donator/HomePage/donationHome";

export default function Donator() {
  return (
    <>
      <Routes>
        <Route path="/card" element={<DonatorCard />} />
        <Route path="/createDonation" element={<CreateDonation />} />
        <Route path="/myDonations" element={<DonatorDashboard />} />
        <Route path="/dashboard/donator/editDonation/:id" element={<EditDonation />}  />
        <Route path="/dashboard/card" element={<DashboardCard />} />
        <Route path="/dashboard" element={<ActiveDonations />} />
        <Route path="/view/:id" element={<DonationView />} />
        <Route path="/viewRequest/:id" element={<SeeRequests />} />
        <Route path="/sendRequest/:id" element={<SendRequest />} />
        <Route path="/pendingDonations" element={<PendingDonationView />} />
        <Route path="/rejectedDonations" element={<RejectedDonationView />} />
        <Route path="/acceptedRequests" element={<AcceptedRequestView />} />
        <Route path="/home" element={<DonationHome />} />
      </Routes>
    </>
  );
}
