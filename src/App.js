import './App.css';
import Navbar from './Pages/Shared/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Login from './Pages/Login/Login';
import Appointment from './Pages/Appointment/Appointment';
import SignUp from './Pages/Login/SignUp';
import RequiredAuth from './Pages/Login/RequiredAuth';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyAppointments from './Pages/Dashboard/MyAppointments';
import MyReview from './Pages/Dashboard/MyReview';
import MyHistory from './Pages/Dashboard/MyHistory';
import Users from './Pages/Dashboard/Users';
import RequiredAdmin from './Pages/Login/RequiredAdmin';
import AddDoctor from './Pages/Dashboard/AddDoctor';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route
          path="/appointment"
          element={
            <RequiredAuth>
              <Appointment></Appointment>
            </RequiredAuth>
          }
        ></Route>
        <Route
          path="dashboard"
          element={
            <RequiredAuth>
              <Dashboard></Dashboard>
            </RequiredAuth>
          }
        >
          <Route index element={<MyAppointments></MyAppointments>}></Route>
          <Route path="review" element={<MyReview></MyReview>}></Route>
          <Route path="history" element={<MyHistory></MyHistory>}></Route>
          <Route path="users" element={<RequiredAdmin>
            <Users></Users>
          </RequiredAdmin>}></Route>
          <Route path="addDoctor" element={<RequiredAdmin>
           <AddDoctor></AddDoctor>
          </RequiredAdmin>}></Route>
        </Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
