import './App.css';
import { Route, Routes } from 'react-router';
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NoticeBoard from "./pages/NoticeBoard";
import MyPage from './pages/MyPage';

function App() {
  return (
    <>
    <Navbar/>

    <Routes>
      <Route path="/" element ={ <MainPage /> }/>
      <Route path="/noticeBoard" element ={ <NoticeBoard/>}/>
      <Route path="/myPage" element ={<MyPage/>}/>
      <Route path="/Login" element={ <LoginPage /> }/>
      <Route path="/signUp" element ={ <SignUpPage /> }/>
    </Routes>
    </>
  );
}

export default App;
