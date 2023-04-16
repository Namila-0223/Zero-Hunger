import { Space } from "antd";
import {render} from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Dashboard/homee";
import AppFooter from "./Components/AppFooter";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
      <Routes>
          <Route path="/" element={<Homepage/>}/>
        </Routes>
        <SideMenu></SideMenu>
        
        <PageContent></PageContent>
      </div>
      <AppFooter />
    </div>
  );
}
export default App;