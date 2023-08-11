import "./App.css";
import { Route, Routes } from "react-router";
import MainPage from "./pages/MainPage";
import NoticeBoards from "./pages/NoticeBoards";
import MyPage from "./pages/MyPage";
import RecipePage from "./pages/RecipePage";
import WritingPage from "./pages/WritingPage";
import PostsDetail from "./pages/PostsDetail";
import PostsUpdatePage from "./pages/PostsUpdatePage";


function App() {
  return (
    <>
    <Routes>
      <Route path ="/" element ={ <MainPage/> }/>
      <Route path ="/recipe" element ={<RecipePage/>} />
      <Route path ="/noticeBoards" element ={ <NoticeBoards/>}/>
      <Route path ="/myPage" element ={<MyPage/>}/>
      <Route path ="/writing" element ={<WritingPage/>} />
      <Route path ="/postsDetail/:id" element ={<PostsDetail/>}/>
      <Route path="/postsUpdate/:id" element ={<PostsUpdatePage/>} />
    </Routes>
    </>
  );
}

export default App;
