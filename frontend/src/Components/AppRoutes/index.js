import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import Homee from "../../Pages/Dashboard/homee";
import Item_donation from "../../Pages/Dashboard/Item donation";
import Money_donation from "../../Pages/Dashboard/Money donation";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homee />}></Route>
      <Route path="/item_donation" element={<Item_donation />}></Route>
      <Route path="/money_donation" element={<Money_donation />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
    </Routes>
  );
}
export default AppRoutes;
