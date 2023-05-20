import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const StoreForm = () => {


    const [fullname, setFullName]= useState('');
    const [storeItem, setStoreItem]= useState('');
    const [itemCode, setItemCode]= useState('');
    const [quentity, setQuenty]= useState('');
    const [indate, setInDate]= useState('');
    const [expiredate, setExpireDate]= useState('');
    const [fullnameError, setFullnameError] = useState(false);
    const [storeItemError, setStoreItemError]= useState(false);
    const [itemCodeError, setItemCodeError]= useState(false);
    const [quentityError, setQuentyError]= useState(false);
    const [indateError, setInDateError]= useState(false);
    const [expiredateError, setExpireDateError]= useState(false);
    const [message, setMessage] = useState(false);

    // const resetForm = () => {
    //     setFullName('');
    //     setID('');
    //     setEmail('');
    //     setAddress('');
    //     setPhoneNo('');
    // };


    const handleSubmit = async () => {
        if(!fullname){
            setFullnameError(true)
        }
        else{
            setFullnameError(false)
        }
        if(!storeItem){
            setStoreItemError(true)
        }
        else{
            setStoreItemError(false)
        }
        if(!itemCode){
            setItemCodeError(true)
        }
        else{
            setItemCodeError(false)
        }
        if(!quentity){
            setQuentyError(true)
        }
        else{
            setQuentyError(false)
        }
        if(!indate){
            setInDateError(true)
        }
        else{
            setInDateError(false)
        }
        if(!expiredate){
            setExpireDateError(true)
        }
        else{
            setExpireDateError(false)
        }

        if (indate && expiredate && new Date(expiredate) < new Date(indate)) {
            setExpireDateError(true);
            return;
          }

        console.log("data : ", fullname, storeItem, itemCode, quentity, indate, expiredate)
        const response = await fetch('http://localhost:8090/store_items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Full_name: fullname, Store_Item: storeItem, Item_Code: itemCode, Quantity: quentity, InDate: indate, ExpireDate: expiredate }),
        });

        if (response.status !== 200) {
            const error = await response.json();
            throw new Error(error.message);
        }
        const data = await response.json();
        console.log('response : ', data)
        // resetForm()
        setMessage(true)

    }

    return (
        <>
            <div className={'flex flex-col justify-center bg-blue-100 sm:px-16 mx-6 pt-40 pb-60 items-center gap-5 '}>
                <div className="flex flex-col justify-center p-20 item-center bg-blue-200">
                <h2 className="text-black text-[20px] text-center  font-bold mb-3">Store Item Information</h2>
                {message && <div className='flex justify-start item-start text-green-500 rounded'>Your data submitted...</div>}
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-2 mb-1">
                        <div className="flex text-black">
                            <p>Full name : </p>
                        </div>
                        <div className="flex flex-col">
                            <input type="text" name="Full_name" className=" bg-white text-black" style={{width: '300px'}} onChange={(e) => setFullName(e.target.value)}/>
                            {fullnameError && <div className='flex justify-start item-start text-red-500 rounded'>Please enter your name...</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-2 mb-1">
                        <div className="flex text-black">
                            <p>Store Item : </p>
                        </div>
                        <div className="flex flex-col">
                            <input type="text" name="requested_item" className=" bg-white text-black" style={{width: '300px'}}  onChange={(e) => setStoreItem(e.target.value)}/>
                            { storeItemError && <div className='flex justify-start item-start text-red-500 rounded'>Please enter Requested Item...</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-2 mb-1">
                        <div className="flex text-black">
                            <p>Item code : </p>
                        </div>
                        <div className="flex flex-col">
                            <input type="text" name="item_code" className=" bg-white text-black" style={{width: '300px'}} onChange={(e) => setItemCode(e.target.value)}/>
                            {itemCodeError && <div className='flex justify-start item-start text-red-500 rounded'>Please enter item code...</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-2 mb-1">
                        <div className="flex text-black">
                            <p>Quantity : </p>
                        </div>
                        <div className="flex flex-col">
                            <input type="text" name="quentity" className=" bg-white text-black" style={{width: '300px'}} onChange={(e) => setQuenty(e.target.value)}/>
                            {quentityError && <div className='flex justify-start item-start text-red-500 rounded'>Please enter Quantity...</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 mt-2 mb-1">
    <div className="flex text-black">
        <p>In Date : </p>
    </div>
    <div className="flex flex-col">
        <DatePicker
            name="inDate"
            selected={indate}
            onChange={(date) => setInDate(date)}
            className=" bg-white text-black"
            style={{ width: '300px' }}
        />
        {indateError && <div className='flex justify-start item-start text-red-500 rounded'>Please enter Date...</div>}
    </div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 mt-2 mb-1">
    <div className="flex text-black">
        <p>Expire Date : </p>
    </div>
    <div className="flex flex-col">
        <DatePicker
            name="expireDate"
            selected={expiredate}
            onChange={(date) => setExpireDate(date)}
            className=" bg-white text-black"
            style={{ width: '300px' }}
        />
        {expiredateError && <div className='flex justify-start item-start text-red-500 rounded'>InDate should be less than ExpireDate</div>}
    </div>
</div>

                    <div className="flex flex-row mt-4 justify-end">
                    <a href="/store_view_data">
                    <button
                        className="py-3 mr-4 px-8 text-sm font-bold text-white  bg-teal-300 duration-300">
                        VIEW
                    </button>
                    </a>
                    <button
                        onClick={handleSubmit}
                        className="py-3 px-8 text-sm font-bold text-white  bg-teal-300 duration-300">
                        SUBMIT
                    </button>
                    </div>
                </div>
                </div>
            </div>
        </>
    );
};
export default StoreForm;
