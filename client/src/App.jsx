import './App.css';
import { Route, Routes } from 'react-router';
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NoticeBoard from "./pages/NoticeBoard";

function App() {
  return (
    <>
    <Navbar/>

    <Routes>
      <Route path="/" element ={ <MainPage /> }/>
      <Route path="/noticeBoard" element ={ <NoticeBoard/>}/>
      <Route path="/signUp" element ={ <SignUpPage /> }/>
      <Route path="/Login" element={ <LoginPage /> }/>
    </Routes>
    </>
  );
}

export default App;
