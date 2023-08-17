import "./App.css";
import { Route, Routes } from "react-router";
import MainPage from "./pages/MainPage";
import NoticeBoardPage from "./pages/NoticeBoardPage";
import MyPage from "./pages/MyPage";
import RecipePage from "./pages/RecipePage";
import WritingPage from "./pages/WritingPage";
import PostDetail from "./pages/PostDetail";
import PostUpdatePage from "./pages/PostUpdatePage";
import Navbar from "./layout/Navbar/Navbar";
import ScrollToTopButton from "./layout/ScrollToTopButton";


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path ="/" element ={ <MainPage/> }/>
      <Route path ="/recipe" element ={ <RecipePage/> }/>
      <Route path ="/noticeBoard" element ={ <NoticeBoardPage/> }/>
      <Route path ="/myPage" element ={ <MyPage/> }/>
      <Route path ="/writing" element ={ <WritingPage/> }/>
      <Route path ="/postDetail/:id" element ={ <PostDetail/> }/>
      <Route path ="/postUpdate/:id" element ={ <PostUpdatePage/> }/>
    </Routes>
    <ScrollToTopButton/>
    </>
  );
}

export default App;
