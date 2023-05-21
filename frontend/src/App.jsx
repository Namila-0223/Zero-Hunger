import Navbar from './components/navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequestorForm from './components/requestor_form.jsx';
import RequestorDataView from './components/requestor_view_data.jsx';
import RequestorItemForm from './components/requestor_item_form.jsx';
import RequestorItemView from './components/requestor_view_item';


const Home = ({ component }) => {
    return (
        <div className='relative z-0 bg-white ' style={{minHeight:'100vh'}}>
            <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                <Navbar />
                <RequestorForm />
            </div>
        </div>
    );
}

const RequesterDetailsView = ({ component }) => {
    return (
        <div className='relative z-0 bg-white' style={{minHeight:'100vh'}}>
            <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                <Navbar />
            </div>
            <RequestorDataView />
        </div>
    );
}

const RequesterItemForm = ({ component }) => {
    return (
        <div className='relative z-0 bg-white' style={{minHeight:'100vh'}}>
            <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                <Navbar />
            </div>
            <RequestorItemForm />
        </div>
    );
}

const RequesterItemDetailsView = ({ component }) => {
    return (
        <div className='relative z-0 bg-white' style={{minHeight:'100vh'}}>
            <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                <Navbar />
            </div>
            <RequestorItemView />
        </div>
    );
}



const AppLayout = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/requester-details-view" element={<RequesterDetailsView />} />
                <Route path="/requester-item-form" element={<RequesterItemForm />} />
                <Route path="/requester-item-view" element={<RequesterItemDetailsView />} />
            </Routes>
        </BrowserRouter>

    );
};

export default AppLayout;