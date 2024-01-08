import "./App.css";
import { Route, Routes } from "react-router";
import MainPage from "./pages/MainPage";
import NoticeBoardPage from "./pages/NoticeBoardPage";
import MyPage from "./pages/MyPage";
import WritingPage from "./pages/WritingPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostUpdatePage from "./pages/PostUpdatePage";
import ScrollUpButton from "./layout/ScrollUp/ScrollUpButton";
import Navbar from "./layout/Navbar/Navbar";
import ModalContainer from "./components/Modal/ModalContainer";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";
import Loading from "./components/Loading/Loading";

function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <ModalContainer />

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/recipe/:id"
            element={<RecipeDetailPage />}
          />
          <Route
            path="/noticeBoard"
            element={<NoticeBoardPage />}
          />
          <Route path="/myPage" element={<MyPage />} />
          <Route
            path="/writing"
            element={<WritingPage />}
          />
          <Route
            path="/postDetail/:id"
            element={<PostDetailPage />}
          />
          <Route
            path="/postUpdate/:id"
            element={<PostUpdatePage />}
          />
        </Routes>
      </Suspense>

      <ScrollUpButton />
    </>
  );
}

export default App;
