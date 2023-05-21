import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { saveAs } from 'file-saver';


const generateCSVReport = (data) => {

    const csv = [
        Object.keys(data[0]).join(','),
        ...data.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });

    saveAs(blob, 'report.csv');
};


const StoreDataView = () => {

    const [id, setId] = useState('');
    const [resData, setResData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [originalData, setOriginalData] = useState([]);

    const handleGenerateReport = () => {
        generateCSVReport(resData);
    };

    useEffect(() => {

        const getData = async () => {
            const response = await fetch('http://localhost:8090/store_items', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status !== 200) {
                const error = await response.json();
                throw new Error(error.message);
            }
            const data = await response.json();
            setResData(data)
            setOriginalData(data);
        }
        getData()
    }, [])
    console.log("data : ", resData);


    const handleEdit = async (id, updatedData) => {
        console.log('edit: ', id, updatedData);
        const response = await fetch(`http://localhost:8090/store_items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
    
        if (response.status !== 200) {
            const error = await response.json();
            throw new Error(error.message);
        }
    
        const data = await response.json();
    };
    
    // Example usage:
    const selectedRecord = {
        id: 'your_record_id',
        // ... other properties of the selected record
    };
    
    handleEdit(selectedRecord.id, selectedRecord);
    

    

    const handleDelete = async (id) => {
        console.log('delete : ', id)
        const response = await fetch(`http://localhost:8090/store_items/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status !== 200) {
            const error = await response.json();
            throw new Error(error.message);
        }
        const data = await response.json();
        window.location.reload();
    }

      const handleSearch = (query) => {
        const filteredData = originalData.filter((row) => {
          return row.Full_name.toLowerCase().includes(query.toLowerCase());
        });
        if(filteredData){
            setResData(filteredData);
        }
        else{
            alert('Search data not found')
        }

      };


    // const handleSearch = async () => {
    //     const response = await fetch(`http://localhost:8090/requester_details/${searchQuery}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     });

    //     if (response.status !== 200) {
    //         const error = await response.json();
    //         throw new Error(error.message);
    //     }
    //     const data = await response.json();
    //     console.log('res: ', data)
    //     if (data) {
    //         if (typeof data === 'object') {
    //             setResData([data]);
    //         } else {
    //             setResData(data);
    //         }
    //     } else {
    //         alert('Search data not found')
    //     }
    // }

    return (
        <>
            <div className={'flex flex-col justify-center bg-blue-100 sm:px-16 mx-6 pt-40 pb-60 items-center gap-5 '}>
                <div className="flex flex-col justify-center p-5 item-center bg-blue-200" style={{ width: "80vw !important" }}>
                    <h2 className="text-black text-[20px] text-start font-bold mb-3">Store Details</h2>
                    <div className="flex flex-row">
                        <input type="text" name="search" value={searchQuery} className=" bg-white text-black" style={{ width: '300px' }} onChange={(e) => setSearchQuery(e.target.value)} />
                        <button
                            onClick={() => handleSearch(searchQuery)}
                            className="py-3 px-8 text-sm font-bold text-white  bg-teal-300 duration-300">
                            Search
                        </button>
                    </div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="text-black text-center " style={{ width: '200px', height: '50px' }}>Full Name</th>
                                    <th className="text-black text-center " style={{ width: '200px', height: '50px' }}>Store Item</th>
                                    <th className="text-black text-center " style={{ width: '200px', height: '50px' }}>Item Code</th>
                                    <th className="text-black text-center " style={{ width: '200px', height: '50px' }}>Quantity</th>
                                    <th className="text-black text-center " style={{ width: '200px', height: '50px' }}>In Date</th>
                                    <th className="text-black text-center " style={{ width: '200px', height: '50px' }}>Expire Date</th>
                                    <th className="text-black text-center " style={{ width: '200px', height: '50px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resData && resData.map((row , index) => (
                                    <tr key={index}>
                                        <td className="text-black text-center" >{row.Full_name}</td>
                                        <td className="text-black text-center">{row.Store_Item}</td>
                                        <td className="text-black text-center">{row.Item_Code}</td>
                                        <td className="text-black text-center">{row.Quantity}</td>
                                        <td className="text-black text-center">{row.InDate}</td>
                                        <td className="text-black text-center">{row.ExpireDate}</td>
                                        <td className="text-black text-center">
                                            <button className="bg-black text-white px-3 py-2 mr-3 my-2" onClick={() => handleEdit(row._id)}>Edit</button>
                                            <button className="bg-black text-white px-3 py-2 my-2" onClick={() => handleDelete(row._id)} >Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            onClick={handleGenerateReport}
                            className="py-3 mr-12 px-8 text-sm font-bold text-white  bg-teal-300 duration-300"
                            style={{ float: 'right' }}
                        >
                            Generate Report
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
export default StoreDataView;
