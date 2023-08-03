import "./App.css";
import { Route, Routes } from "react-router";
import MainPage from "./pages/MainPage";
import NoticeBoards from "./pages/NoticeBoards";
import MyPage from "./pages/MyPage";
import RecipePage from "./pages/RecipePage";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element ={ <MainPage/> }/>
      <Route path="/recipe" element ={<RecipePage/>} />
      <Route path="/noticeBoards" element ={ <NoticeBoards/>}/>
      <Route path="/myPage" element ={<MyPage/>}/>
    </Routes>
    </>
  );
}

export default App;
