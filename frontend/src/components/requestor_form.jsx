import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


const RequestorForm = () => {


    const [fullname, setFullName] = useState('');
    const [id, setID] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [fullnameError, setFullnameError] = useState(false);
    const [idError, setIDError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [phoneNoError, setPhoneNoError] = useState(false);
    const [message, setMessage] = useState(false);

    // const resetForm = () => {
    //     setFullName('');
    //     setID('');
    //     setEmail('');
    //     setAddress('');
    //     setPhoneNo('');
    // };


    const handleSubmit = async () => {
        if (!fullname) {
            setFullnameError(true)
        }
        else {
            setFullnameError(false)
        }
        if (!id) {
            setIDError(true)
        }
        else {
            setIDError(false)
        }
        if (!email) {
            setEmailError(true)
        }
        else {
            setEmailError(false)
        }
        if (!address) {
            setAddressError(true)
        }
        else {
            setAddressError(false)
        }
        if (!phoneNo) {
            setPhoneNoError(true)
        }
        else {
            setPhoneNoError(false)
        }
        console.log("data : ", fullname, id, email, address, phoneNo)
        const response = await fetch('http://localhost:8090/requester_details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Full_name: fullname, ID_No: id, Email_Address: email, Address: address, Phone_Number: phoneNo }),
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
                    <h2 className="text-black text-[20px] text-center font-bold mb-3">Requestor Details</h2>
                    {message && <div className='flex justify-start item-start text-green-500 rounded'>Your data submitted...</div>}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 mt-2 mb-1">
                            <div className="flex text-black">
                                <p>Full name : </p>
                            </div>
                            <div className="flex flex-col">
                                <input type="text" name="Full_name" className=" bg-white text-black" style={{ width: '300px' }} onChange={(e) => setFullName(e.target.value)} />
                                {fullnameError && <div className='flex justify-start item-start text-red-500 rounded'>Please enter your name...</div>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 mt-2 mb-1">
                            <div className="flex text-black">
                                <p>ID No : </p>
                            </div>
                            <div className="flex flex-col">
                                <input type="text" name="ID_No" className=" bg-white text-black" style={{ width: '300px' }} onChange={(e) => setID(e.target.value)} />
                                {idError && <div className='flex justify-start item-start text-red-500 rounded'>Please enter your name...</div>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 mt-2 mb-1">
                            <div className="flex text-black">
                                <p>Email Address : </p>
                            </div>
                            <div className="flex flex-col">
                                <input type="email" name="Email_Address" className=" bg-white text-black" style={{ width: '300px' }} onChange={(e) => setEmail(e.target.value)} />
                                {emailError && <div className='flex justify-start item-start text-red-500 rounded'>Please enter your email...</div>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 mt-2 mb-1">
                            <div className="flex text-black">
                                <p>Address : </p>
                            </div>
                            <div className="flex flex-col">
                                <input type="text" name="Address" className=" bg-white text-black" style={{ width: '300px' }} onChange={(e) => setAddress(e.target.value)} />
                                {addressError && <div className='flex justify-start item-start text-red-500 rounded'>Please enter your Address...</div>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 mt-2 mb-1">
                            <div className="flex text-black">
                                <p>Phone Number : </p>
                            </div>
                            <div className="flex flex-col">
                                <input type="tel" name="Phone_Number" className=" bg-white text-black" style={{ width: '300px' }} onChange={(e) => setPhoneNo(e.target.value)} />
                                {phoneNoError && <div className='flex justify-start item-start text-red-500 rounded'>Please enter your phone number...</div>}
                            </div>
                        </div>
                        <div className="flex flex-row mt-4 justify-end">
                            <a href="/requester-details-view">
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
export default RequestorForm;
