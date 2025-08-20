import React, { useEffect, useState } from 'react'
import { createStudent, getStudent, updateStudent } from '../services/StudentService';
import { useNavigate, useParams} from 'react-router-dom';
import {Helmet} from 'react-helmet';

const StudentComponent = () => {

    const [fistName, setFistName] =  useState('')
    const [lastName, setLastName] =  useState('')
    const [email, setEmail] =  useState('')
    const [phoneNO, setPhoneNo] =  useState('')
    const [grade, setGrade] =  useState('')
    const [paymentStatus, setPaymentStatus] = useState(false);

    const {id} = useParams();
    const [errors, setErrors] = useState({
        fistName: '',
        lastName: '',
        email: '',
        phoneNO: '',
        grade: ''
        })

    const navigator = useNavigate();


    useEffect(() =>{
            if(id){
                getStudent(id).then((response) => {
                    setFistName(response.data.fistName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                    setPhoneNo(response.data.phoneNO);
                    setGrade(response.data.grade);
                    setPaymentStatus(response.data.paymentStatus);
                }).catch(error => {
                    console.error(error);
                })
            }
    },[id])

    
    function saveOrUpdateStudent(e){
        e.preventDefault();

        if(validateForm()){
            const student = {fistName,lastName,email,phoneNO,grade,paymentStatus}
            console.log(student)

            if(id){
                updateStudent(id,student).then((response) => {
                    console.log(response.data);
                    navigator('/student');
                
                }).catch(error => {
                    console.error(error);
                })
            }
            else{
                createStudent(student).then((response) => {
                    console.log(response.data);
                    navigator('/student')
                }).catch(error => {
                    console.error(error);
                })
            }
            
        }
        
    }

    function validateForm()
{
    let valid = true;

    const errorsCopy = {... errors}

    if(fistName.trim()){
        errorsCopy.fistName = '';
    }
    else{
        errorsCopy.fistName = 'First name is required';
        valid = false;
    }

    if(lastName.trim()){
        errorsCopy.lastName = '';
    }
    else{
        errorsCopy.lastName = 'Last name is required';
        valid = false;
    }

    if(email.trim()){
        errorsCopy.email = '';
    }
    else{
        errorsCopy.email = 'email is required';
        valid = false;
    }

    if(phoneNO.trim()){
        errorsCopy.phoneNO = '';
    }
    else{
        errorsCopy.phoneNO = 'phone number is required';
        valid = false;
    }

    if(grade.trim()){
        errorsCopy.grade = '';
    }
    else{
        errorsCopy.grade = 'grade is required';
        valid = false;
    }

    setErrors(errorsCopy);
    return valid;

}

function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Student</h2>
        }
        else{
            return <h2 className='text-center'>Add Student</h2>
        }
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
            <li ><a href="/list" ><i className='bx bx-group' ></i>List Of Students</a></li>
            <li className="active"><a href="/add-student"><i className='bx bx-user-plus' ></i>Add Student</a></li>
           
            <li ><a href="/settings"><i className='bx bx-cog' ></i>Settings</a></li>
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
                    <input type="search" placeholder="Search..." ></input>
                    <button className="search-btn" type="submit" ><i className='bx bx-search'></i></button>
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
                    <h1>{
                    pageTitle()
                   }</h1>
                    <ul className="breadcrumb">
                        
                        <li><a href="#" className="active">Admin</a></li>
                    </ul>
                </div>
                
            </div>

           
                <li><div className='row'>
                <div className='card col-md-6 offset-md-3 offset--md-3'>
                   
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name</label>
                                <input type='text' 
                                placeholder='Enter Student First Name' 
                                name='fistName' 
                                value={fistName} 
                                className={`form-control ${errors.fistName ? 'is-invalid': '' }`}                                
                                onChange={(e) => setFistName(e.target.value)}>
                                    </input>  
                                    {errors.fistName && <div className='invalid-feedback'>{errors.fistName}</div>}                          
                                    </div>

                                    <div className='form-group mb-2'>
                                <label className='form-label'>Last Name</label>
                                <input type='text' 
                                placeholder='Enter Student Last Name' 
                                name='lastName' 
                                value={lastName} 
                                className={`form-control ${errors.lastName ? 'is-invalid': '' }`}    
                                onChange={(e) => setLastName(e.target.value)}>
                                    </input> 
                                    {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}                           
                                    </div>
                                
                                    <div className='form-group mb-2'>
                                <label className='form-label'>Email</label>
                                <input type='text' 
                                placeholder='Enter Student Email' 
                                name='emaile' 
                                value={email} 
                                className={`form-control ${errors.email ? 'is-invalid': '' }`}    
                                onChange={(e) => setEmail(e.target.value)}>
                                    </input> 
                                    {errors.email && <div className='invalid-feedback'>{errors.email}</div>}                           
                                    </div>

                                    <div className='form-group mb-2'>
                                <label className='form-label'>Phone Number</label>
                                <input type='text' 
                                placeholder='Enter Student Phone Number' 
                                name='phoneNo' 
                                value={phoneNO} 
                                className={`form-control ${errors.phoneNO ? 'is-invalid': '' }`}    
                                onChange={(e) => setPhoneNo(e.target.value)}>
                                    </input>    
                                    {errors.phoneNO && <div className='invalid-feedback'>{errors.phoneNO}</div>}                        
                                    </div>

                                    <div className='form-group mb-2'>
    <label className='form-label'>Grade</label>
    <select
        name='grade'
        value={grade}
        className={`form-control ${errors.grade ? 'is-invalid': '' }`}
        onChange={(e) => setGrade(e.target.value)}
    >
        <option value="">Select Grade</option>
        <option value="Grade 6">Grade 6</option>
        <option value="Grade 7">Grade 7</option>
        <option value="Grade 8">Grade 8</option>
        <option value="Grade 9">Grade 9</option>
        <option value="Grade 10">Grade 10</option>
        <option value="O/L">O/L</option>
    </select>
    {errors.grade && <div className='invalid-feedback'>{errors.grade}</div>}
</div>

                                    <div className='form-group mb-2'>
                                <label className='form-label'>Payment Status</label>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckIndeterminate" checked={paymentStatus}
                                            onChange={(e) => setPaymentStatus(e.target.checked)}></input>
                                    <label className="form-check-label" >
                                    Paid
                                    </label>
                                </div>
                               
                            </div>
                            
                                    <button className='btn btn-success' onClick={saveOrUpdateStudent} >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
                </li>
                
               
            
            


</main>

</div>

<script src="../src/index.js"></script>
</>


);
  
}

export default StudentComponent