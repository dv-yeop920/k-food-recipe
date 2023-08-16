import "./App.css";
import { Route, Routes } from "react-router";
import MainPage from "./pages/MainPage";
import NoticeBoard from "./pages/NoticeBoard";
import MyPage from "./pages/MyPage";
import RecipePage from "./pages/RecipePage";
import WritingPage from "./pages/WritingPage";
import PostDetail from "./pages/PostDetail";
import PostUpdatePage from "./pages/PostUpdatePage";


function App() {
  return (
    <>
    <Routes>
      <Route path ="/" element ={ <MainPage/> }/>
      <Route path ="/recipe" element ={<RecipePage/>} />
      <Route path ="/noticeBoard" element ={<NoticeBoard/>}/>
      <Route path ="/myPage" element ={<MyPage/>}/>
      <Route path ="/writing" element ={<WritingPage/>} />
      <Route path ="/postDetail/:id" element ={<PostDetail/>}/>
      <Route path="/postUpdate/:id" element ={<PostUpdatePage/>} />
    </Routes>
    </>
  );
}

export default App;
