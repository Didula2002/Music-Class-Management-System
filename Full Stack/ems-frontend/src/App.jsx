
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListStudentComponent from './components/ListStudentComponent'
import { BrowserRouter, Routes , Route} from 'react-router-dom'
import StudentComponent from './components/StudentComponent'
import DashboardComponent from './components/Dashboard'
import SettingsComponent from './components/SettingsComponent'
import LoginComponent from './components/LoginComponent'
import Home from './Home';

function App() {


  return (
    <>
    <BrowserRouter>
    <HeaderComponent/>
    <Routes>
      
      <Route path='/list' element = {<ListStudentComponent/>}></Route>
      <Route path='/student' element = {<ListStudentComponent/>}></Route>
      <Route path='/add-student' element = {<StudentComponent/>}></Route>
      <Route path='/edit-student/:id' element = {<StudentComponent/>}></Route>
      <Route path='/dashboard' element = {<DashboardComponent/>}></Route>
      <Route path='/settings' element = {<SettingsComponent/>}></Route>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<LoginComponent />} />


    </Routes>
    
    <FooterComponent/>
    </BrowserRouter>
    </>
  )
}

export default App
