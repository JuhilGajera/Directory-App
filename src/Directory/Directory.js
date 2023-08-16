import React, { useState, useEffect } from 'react'
import './style.css'

export default function Directory() {

    const [data, setData] = useState([]);
    const [com, setCom] = useState(0);
    const [searchAadhar, setSearchAadhar] = useState([]);
    const [searchedData, setSearchedData] = useState(null)

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem('tableData')) || [];
        setData(savedData);
    }, []);

    const handleAddRow = () => {
        setData([...data, { "Name": '', "Date of Birth": '', "Aadhar Number": '', "Mobile Number": '', "Age": '' }]);
    };

    const handleDeleteRow = (index) => {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
        updateLocalStorage(newData);
    };

    const handleSaveRow = () => {
        updateLocalStorage(data);
    };

    const handleInputChange = (index, field, value) => {
        const newData = [...data];
        newData[index][field] = value;

        if (field === 'Date of Birth') {
            const birthDate = new Date(value);
            const currentDate = new Date();
            const age = Math.floor((currentDate - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
            newData[index]['Age'] = `${age}`;
        }

        setData(newData);
    };

    const updateLocalStorage = (updatedData) => {
        localStorage.setItem('tableData', JSON.stringify(updatedData));
    };

    const handleSearch = () => {
        const result = data.find(entry => entry['Aadhar Number'] === searchAadhar);
        if (result) {
            console.log('Found:', result);
            setSearchedData(result)
        } else {
            console.log('No match found.');
        }
    };

    return (
        <div className='mainContainer'>
            <div className='Header'>
                Juhil's Directory App
            </div>
            <div className='btnContainer'>
                <button className='mainBtn' onClick={() => setCom(0)}>Add New Person</button>
                <button className='mainBtn' onClick={() => setCom(1)}>Retrive information</button>
            </div>
            <div className='Container'>
                {com === 0 ?
                    <div className='page'>
                        Add New Person
                    </div> :
                    <div className='page'>
                        Retrive information
                    </div>}
                <div>
                    {com === 0 ? <table className='data-table'>
                        <thead>
                            <tr>
                                <th style={{ width: '16%' }}>Name</th>
                                <th style={{ width: '16%' }}>Date of Birth</th>
                                <th style={{ width: '16%' }}>Aadhar Number</th>
                                <th style={{ width: '16%' }}>Mobile Number</th>
                                <th style={{ width: '16%' }}>Age</th>
                                <th style={{ width: '16%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td><input value={row.Name} onChange={(e) => handleInputChange(index, 'Name', e.target.value)} /></td>
                                    <td><input type="date" value={row['Date of Birth']} onChange={(e) => handleInputChange(index, 'Date of Birth', e.target.value)} /></td>
                                    <td><input value={row['Aadhar Number']} onChange={(e) => handleInputChange(index, 'Aadhar Number', e.target.value)} /></td>
                                    <td><input value={row['Mobile Number']} onChange={(e) => handleInputChange(index, 'Mobile Number', e.target.value)} /></td>
                                    <td style={{ color: 'black' }}>{row['Age']}</td>
                                    <td className='actions'>
                                        <button onClick={handleSaveRow}>Save</button>
                                        <button onClick={() => handleDeleteRow(index)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> :
                        <div>
                            <input
                                type="text"
                                placeholder="Search by Aadhar Number"
                                value={searchAadhar}
                                onChange={(e) => { setSearchAadhar(e.target.value) }}
                                style={{ marginLeft: '2%', height: 40, width: 400, fontSize: 16 }}
                            />
                            <button onClick={handleSearch} style={{ marginLeft: '2%', height: 45 }} className='mainBtn'>Search</button>
                            {searchedData ?
                                <div className='box'>
                                    <p className='boxData'> Name:<span className='TXT'> {searchedData.Name}</span> </p>
                                    <p className='boxData'> Date of Birth:<span className='TXT'> {searchedData['Date of Birth']}</span> </p>
                                    <p className='boxData'> Aadhar Number:<span className='TXT'> {searchedData['Aadhar Number']}</span> </p>
                                    <p className='boxData'> Mobile Number:<span className='TXT'> {searchedData['Mobile Number']}</span> </p>
                                    <p className='boxData'> Age:<span className='TXT'> {searchedData['Age']}</span> </p>
                                </div>
                                : null
                            }
                        </div>
                    }
                    <div className='footer'>
                        <button onClick={handleAddRow} className='mainBtn'>Add Row</button>
                    </div>
                </div>

            </div>

        </div>
    )
}
