import React, { useEffect, useState } from 'react';
import { listStudent } from '../services/StudentService';
import { useNavigate } from 'react-router-dom';
import {Helmet} from 'react-helmet';


const DashboardComponent = () => {
    const [students, setStudents] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0);
    const [paidStudents, setPaidStudents] = useState(0);
    const [unpaidStudents, setUnpaidStudents] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    const navigator = useNavigate();
    

    useEffect(() => {
        getAllStudentCounts();
        
        getAllStudent();

        return () => {
            
        };
    }, []);

    function getAllStudent() {
        listStudent().then((response) => {
            setStudents(response.data);
        }).catch(error => {
            console.error(error);
        });
        
    }

    const getAllStudentCounts = () => {
        listStudent().then((response) => {
            const students = response.data;
            setTotalStudents(students.length);
            const paidCount = students.filter(student => student.paymentStatus).length;
            const unpaidCount = students.length - paidCount;
            setPaidStudents(paidCount);
            setUnpaidStudents(unpaidCount);
        }).catch(error => {
            console.error(error);
        });
    }

       


    const handleSearch = () => {
        if (!searchTerm) {
            getAllStudent();
        } else {
            const filteredStudents = students.filter(student =>
                (student.fistName && student.fistName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (student.lastName && student.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setStudents(filteredStudents);
        }
    };

   

    return (

   

<>
<link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
    <link rel="stylesheet" href="../src/style.css"></link>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>
   
    <Helmet><script src = "../src/index.js" type='text/javascript'/></Helmet>
    <div className="sidebar">
        <a href="#" className="logo">
            <i className='bx bxl-deezer'></i>
            <div className="logo-name"><span>Music</span>Class</div>
        </a>
        <ul className="side-menu">
            <li className="active"><a href="/dashboard"><i className='bx bxs-dashboard' ></i>Dashboard</a></li>
            <li ><a href="/list" ><i className='bx bx-group' ></i>List Of Students</a></li>
            <li ><a href="/add-student"><i className='bx bx-user-plus' ></i>Add Student</a></li>
            <li><a href="/settings"><i className='bx bx-cog' ></i>Settings</a></li>
        </ul>
        <div>
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </div>
        <ul className="side-menu">
            <li >
                <a href="/" className="logout" >
                    <i className='bx bx-log-out-circle'></i>
                    Logout
                </a>
            </li>
        </ul>
    </div>
    

    
    <div className="content">
        
        <nav>
            <i className='bx bx-menu'></i>
            <form action="#">
                <div className="form-input">
                    <input type="search" placeholder="Search..."value={searchTerm} onChange={e => setSearchTerm(e.target.value)} ></input>
                    <button className="search-btn" type="submit" onClick={handleSearch}><i className='bx bx-search'></i></button>
                </div>
                
            </form>
            <input type="checkbox" id="theme-toggle" hidden/>
            <label for="theme-toggle" class="theme-toggle"></label>
           
            <a href="#" className="profile">
                <img src="../src/account.png"></img>
            </a>
        </nav>

        

        <main>
            <div className="header">
                <div className="left">
                    <h1>Dashboard</h1>
                    <ul className="breadcrumb">
                        
                        <li><a href="#" className="active">Admin</a></li>
                    </ul>
                </div>
                
            </div>

            
            <ul className="insights">
                <li>
                <i className='bx bx-user' ></i>
                    <span className="info">
                        <h3>
                        {totalStudents}
                        </h3>
                        <p>Total Students</p>
                    </span>
                </li>
                <li><i className='bx bx-user-check' ></i>
                    <span className="info">
                        <h3>
                        {paidStudents}
                        </h3>
                        <p>Students Paid</p>
                    </span>
                </li>
                <li><i className='bx bx-user-x' ></i>
                    <span className="info">
                        <h3>
                        {unpaidStudents}
                        </h3>
                        <p>Students Not Paid</p>
                    </span>
                </li>
                
            </ul>
            

            <div className="bottom-data">
                <div className="orders">
                    <div className="header">
                        <i className='bx bx-receipt'></i>
                        <h3>List Of Students</h3>
                        <i className='bx bx-filter'></i>
                       
                    </div>
                    {students.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                            <th>Student ID</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th>Phone Number</th>
                                            <th>Grade</th>
                                            <th>Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                                        {students.map(student => (
                                            <tr key={student.id}>
                                                <td>{student.id}</td>
                                                <td>{student.fistName}</td>
                                                <td>{student.lastName}</td>
                                                <td>{student.email}</td>
                                                <td>{student.phoneNO}</td>
                                                <td>{student.grade}</td>
                                                <td>
                                                {student.paymentStatus ? (
                                                    <span className="status completed">Paid</span>
                                                ) : (
                                                    <span className="status pending">Not Paid</span>
                                                )}
                                                 </td>
                                            </tr>
                                        ))}
                                    </tbody>
                    </table>
                    ) : (
                        <div>No students found</div>
                    )}
                </div>


            </div>

        </main>

    </div>

    <script src="../src/index.js"></script>
</>

    );
                }
export default DashboardComponent;
