import Navbar from './components/navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StoreForm from './components/store_form.jsx';
import StoreDataView from './components/store_view_data.jsx';


const Home = ({ component }) => {
    return (
        <div className='relative z-0 bg-white ' style={{minHeight:'100vh'}}>
            <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                <Navbar />
                <StoreForm />
            </div>
        </div>
    );
}

const StoreDetailView = ({ component }) => {
    return (
        <div className='relative z-0 bg-white' style={{minHeight:'100vh'}}>
            <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                <Navbar />
            </div>
            <StoreDataView />
        </div>
    );
}

const AppLayout = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/store_form" element={<StoreForm />} />
                <Route path="/store_view_data" element={<StoreDetailView />} />
            </Routes>
        </BrowserRouter>

    );
};

export default AppLayout;