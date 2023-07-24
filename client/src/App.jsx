import './App.css';
import { Route, Routes } from 'react-router';
import Navbar from "./layout/Navbar";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
    <Navbar/>

    <Routes>
      <Route path="/" element ={ <MainPage /> }/>
      <Route path="/signUp" element ={ <SignUpPage /> }/>
      <Route path="/Login" element={ <LoginPage /> }/>
    </Routes>
    </>
  );
}

export default App;
