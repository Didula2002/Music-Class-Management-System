import React, {useEffect,useState} from 'react'
import { deleteStudent, listStudent } from '../services/StudentService'
import { useNavigate } from 'react-router-dom'
import {Helmet} from 'react-helmet';


const ListStudentComponent = () => {
    const [students, setStudents] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0);
    const [paidStudents, setPaidStudents] = useState(0);
    const [unpaidStudents, setUnpaidStudents] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    

    const navigator = useNavigate();
    useEffect(() => {

        
        const fetchStudents = async () => {
            try {
                const response = await listStudent(); // Fetch students data from your service
                setStudents(response.data); // Assuming your API returns data in the form of an array
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
        const handleSideLinks = () => {
            const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
            sideLinks.forEach(item => {
                const li = item.parentElement;
                item.addEventListener('click', () => {
                    sideLinks.forEach(i => {
                        i.parentElement.classList.remove('active');
                    });
                    li.classList.add('active');
                });
            });
        };
        const handleSidebarToggle = () => {
            const menuBar = document.querySelector('.content nav .bx.bx-menu');
            const sideBar = document.querySelector('.sidebar');

            menuBar.addEventListener('click', () => {
                sideBar.classList.toggle('close');
            });
        };

        handleSidebarToggle();


        const handleMenuBar = () => {
            const menuBar = document.querySelector('.content nav .bx.bx-menu');
            const sideBar = document.querySelector('.sidebar');
            menuBar.addEventListener('click', () => {
                sideBar.classList.toggle('close');
            });
        };

        const handleSearchBtn = () => {
            const searchBtn = document.querySelector('.content nav form .form-input button');
            const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
            const searchForm = document.querySelector('.content nav form');
            searchBtn.addEventListener('click', function (e) {
                if (window.innerWidth < 576) {
                    e.preventDefault();
                    searchForm.classList.toggle('show');
                    if (searchForm.classList.contains('show')) {
                        searchBtnIcon.classList.replace('bx-search', 'bx-x');
                    } else {
                        searchBtnIcon.classList.replace('bx-x', 'bx-search');
                    }
                }
            });
        };

        const handleResize = () => {
            const sideBar = document.querySelector('.sidebar');
            const searchBtnIcon = document.querySelector('.content nav form .form-input button .bx');
            const searchForm = document.querySelector('.content nav form');
            if (window.innerWidth < 768) {
                sideBar.classList.add('close');
            } else {
                sideBar.classList.remove('close');
            }
            if (window.innerWidth > 576) {
                searchBtnIcon.classList.replace('bx-x', 'bx-search');
                searchForm.classList.remove('show');
            }
        };

        const handleThemeToggle = () => {
            const toggler = document.getElementById('theme-toggle');
            toggler.addEventListener('change', function () {
                if (this.checked) {
                    document.body.classList.add('dark');
                } else {
                    document.body.classList.remove('dark');
                }
            });
        };
        

    

        // Call the functions to initialize event listeners
        handleSideLinks();
        handleMenuBar();
        handleSearchBtn();
        handleResize();
        handleThemeToggle();
        
        // Cleanup functions (remove event listeners)
        return () => {
            const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
            sideLinks.forEach(item => {
                item.removeEventListener('click', () => {});
            });
            const menuBar = document.querySelector('.content nav .bx.bx-menu');
            menuBar.removeEventListener('click', () => {});
            const searchBtn = document.querySelector('.content nav form .form-input button');
            searchBtn.removeEventListener('click', () => {});
            window.removeEventListener('resize', handleResize);
            const toggler = document.getElementById('theme-toggle');
            toggler.removeEventListener('change', () => {});
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
    function updateStudent(id){
        navigator(`/edit-student/${id}`)

    }


   
    function removeStudent(id){
        console.log(id);

        deleteStudent(id).then((response) => {
            getAllStudent();
        }).catch(error => {
            console.error(error);
        })
    }


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
            <li ><a href="/dashboard"><i className='bx bxs-dashboard' ></i>Dashboard</a></li>
            <li className="active"><a href="/list" ><i className='bx bx-group' ></i>List Of Students</a></li>
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
                    <h1>List Of Students</h1>
                    <ul className="breadcrumb">
                        
                        <li><a href="#" className="active">Admin</a></li>
                    </ul>
                </div>
                
            </div>

            

            <div className="bottom-data">
                <div className="orders">
                    <div className="header">
                        <i className='bx bx-receipt'></i>
                        <h3></h3>
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
                                            <th>Actions</th>
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
                                                 <td>
                    
                        <button className='btn btn-info' onClick={() => updateStudent(student.id)}><i className="fa fa-pencil" aria-hidden="true"></i></button>  
                        <button className='btn btn-danger' onClick={() => removeStudent(student.id)} style={{marginLeft: '10px'}}><i className="fa fa-trash" aria-hidden="true"></i></button>

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

export default ListStudentComponent