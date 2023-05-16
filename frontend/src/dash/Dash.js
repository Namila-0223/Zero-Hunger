import { Space } from "antd";
import "./App.css";
import AppFooter from "../components/Dashboard/AppFooter/index";
import AppHeader from "../components/Dashboard/AppHeader/index";
import PageContent from "../components/Dashboard/PageContent/index";
import SideMenu from "../components/Dashboard/SideMenu/index";

function Dash() {
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </div>
      <AppFooter />
    </div>
  );
}
export default Dash;
