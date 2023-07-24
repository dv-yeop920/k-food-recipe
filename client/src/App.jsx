import './App.css';
import { Route, Routes } from 'react-router';
import Navbar from "./layout/Navbar";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NoticeBoard from "./pages/NoticeBoard";

function App() {
  return (
    <>
    <Navbar/>

    <Routes>
      <Route exact path="/" element ={ <MainPage /> }/>
      <Route exact path="/noticeBoard" element ={ <NoticeBoard/>}/>
      <Route exact path="/signUp" element ={ <SignUpPage /> }/>
      <Route exact path="/Login" element={ <LoginPage /> }/>
    </Routes>
    </>
  );
}

export default App;
