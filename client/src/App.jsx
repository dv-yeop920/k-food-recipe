import "./App.css";
import { Route, Routes } from "react-router";
import MainPage from "./pages/MainPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import NoticeBoard from "./pages/NoticeBoard";
import MyPage from "./pages/myPage/MyPage";
import MyInfomation from "./pages/myPage/MyInfomation";
import RecipePage from "./pages/RecipePage";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element ={ <MainPage /> }/>
      <Route path="/recipe" element ={<RecipePage/>} />
      <Route path="/noticeBoard" element ={ <NoticeBoard/>}/>
      <Route path="/myPage" element ={<MyPage/>}/>
      <Route path="/myInfo" element ={<MyInfomation/>} />
      <Route path="/Login" element={ <LoginPage /> }/>
      <Route path="/signUp" element ={ <SignUpPage /> }/>
    </Routes>
    </>
  );
}

export default App;
