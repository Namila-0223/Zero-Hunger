import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../../pages/Customers";
import Dashboard from "../../../pages/Dashbaord";
import Inventory from "../../../pages/Inventory";
import Orders from "../../../pages/Orders";

import Donationdetails from "../../../pages/donator/Donationdetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/emp" element={<Donationdetails />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>

      <Route path="/rqs" element={<reqDo/>}/>

      
    </Routes>
  );
}
export default AppRoutes;
