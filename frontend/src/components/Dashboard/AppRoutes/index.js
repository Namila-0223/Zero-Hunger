import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../../pages/Customers";
import Dashboard from "../../../pages/Dashbaord";
import Inventory from "../../../pages/Inventory";
import Orders from "../../../pages/Orders";
import Employee from "../../../Employee";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/emp" element={<Employee/>}/>
      <Route path="/rqs" element={<reqDo/>}/>

      
    </Routes>
  );
}
export default AppRoutes;
