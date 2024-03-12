# K-food-recipe

## 프로젝트 소개

```
k-food-recipe는 우리나라 식재료로 만든 1000여가지의 다양한 요리 레시피들을 검색할 수 있고 게시판으로 유저들이 레시피를 공유할 수 있는 서비스입니다.
```

🔗 배포링크 : https://k-food-recipe-fe.vercel.app/

</br>

## 목차

1. [기술 및 개발 환경](#기술-및-개발-환경)
2. [폴더 구조](#폴더-구조)
3. [주요 기능](#주요-기능)
4. [아키텍처](#아키텍처)

</br>

## 기술 및 개발 환경

#### ✔️ 사용 기술

<img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white"/> <img src="https://img.shields.io/badge/Redux Toolkit-764ABC?style=for-the-badge&logo=Redux&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>
<img src="https://img.shields.io/badge/AWS S3-569A31?style=for-the-badge&logo=AmazonS3&logoColor=white"/>
<img src="https://img.shields.io/badge/Html-E34F26?style=for-the-badge&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/>

#### ✔️ 배포 및 환경

<img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"/> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"/> <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white"/>

<br>

## 아키텍처

![architcture](https://github.com/dv-yeop920/k-food-recipe-FE/assets/104065347/cf5c1d6e-fc16-43b4-89fa-8265b025afab)
<br>

## 폴더 구조

<details>
<summary>📁</summary>
<div>

```
📦src
 ┣ 📂asset
 ┃ ┣ 📜placeholder-src-dark.png
 ┃ ┗ 📜placeholder-src-light.png
 ┣ 📂components
 ┃ ┣ 📂FooterNavbar
 ┃ ┃ ┣ 📜FooterNavbar.jsx
 ┃ ┃ ┗ 📜FooterNavbar.module.scss
 ┃ ┣ 📂InfiniteObserver
 ┃ ┃ ┗ 📜InfiniteScrollObserver.jsx
 ┃ ┣ 📂Loading
 ┃ ┃ ┣ 📂skeleton
 ┃ ┃ ┃ ┣ 📜RecipeSkeleton.jsx
 ┃ ┃ ┃ ┗ 📜TabSkeleton.jsx
 ┃ ┃ ┣ 📜DeferredComponent.jsx
 ┃ ┃ ┣ 📜Loading.jsx
 ┃ ┃ ┣ 📜Loading.module.scss
 ┃ ┃ ┗ 📜ScrollLoading.jsx
 ┃ ┣ 📂MainPage
 ┃ ┃ ┣ 📜Recipe.module.scss
 ┃ ┃ ┣ 📜RecipeCard.jsx
 ┃ ┃ ┣ 📜RecipeList.jsx
 ┃ ┃ ┗ 📜RecipeTab.jsx
 ┃ ┣ 📂Modal
 ┃ ┃ ┣ 📂Menu
 ┃ ┃ ┃ ┣ 📜MenuModal.jsx
 ┃ ┃ ┃ ┗ 📜MenuModal.module.scss
 ┃ ┃ ┣ 📂Search
 ┃ ┃ ┃ ┣ 📜SearchModal.jsx
 ┃ ┃ ┃ ┗ 📜SearchModal.module.scss
 ┃ ┃ ┣ 📂Sign
 ┃ ┃ ┃ ┣ 📜LoginModal.jsx
 ┃ ┃ ┃ ┣ 📜SignModal.module.scss
 ┃ ┃ ┃ ┗ 📜SignUpModal.jsx
 ┃ ┃ ┣ 📜.DS_Store
 ┃ ┃ ┗ 📜ModalContainer.jsx
 ┃ ┣ 📂MyPage
 ┃ ┃ ┣ 📜LikedPost.jsx
 ┃ ┃ ┣ 📜LikedRecipe.jsx
 ┃ ┃ ┣ 📜MyInfomation.jsx
 ┃ ┃ ┣ 📜MyPage.module.css
 ┃ ┃ ┣ 📜MyPost.jsx
 ┃ ┃ ┣ 📜ViewedPost.jsx
 ┃ ┃ ┗ 📜ViewedRecipes.jsx
 ┃ ┣ 📂NotFound
 ┃ ┃ ┗ 📜NotFound.jsx
 ┃ ┣ 📂PagiNation
 ┃ ┃ ┣ 📜Pagenate.jsx
 ┃ ┃ ┣ 📜PagiNation.module.scss
 ┃ ┃ ┗ 📜Pagination.jsx
 ┃ ┣ 📂PostDetail
 ┃ ┃ ┣ 📂Comment
 ┃ ┃ ┃ ┣ 📜Comment.jsx
 ┃ ┃ ┃ ┣ 📜Comment.module.scss
 ┃ ┃ ┃ ┣ 📜CommentButton.jsx
 ┃ ┃ ┃ ┣ 📜CommentContent.jsx
 ┃ ┃ ┃ ┣ 📜CommentDate.jsx
 ┃ ┃ ┃ ┣ 📜CommentInput.jsx
 ┃ ┃ ┃ ┗ 📜CommentList.jsx
 ┃ ┃ ┣ 📜.DS_Store
 ┃ ┃ ┗ 📜PostDetail.module.scss
 ┃ ┣ 📂PostList
 ┃ ┃ ┣ 📜.DS_Store
 ┃ ┃ ┣ 📜Post.jsx
 ┃ ┃ ┣ 📜PostList.jsx
 ┃ ┃ ┗ 📜PostList.module.scss
 ┃ ┣ 📂RecipeDetail
 ┃ ┃ ┣ 📜RecipeDetail.module.scss
 ┃ ┃ ┣ 📜RecipeInfo.jsx
 ┃ ┃ ┣ 📜RecipeIngredient.jsx
 ┃ ┃ ┣ 📜RecipeMenual.jsx
 ┃ ┃ ┗ 📜RecipeTip.jsx
 ┃ ┣ 📂Writing
 ┃ ┃ ┣ 📜Content.jsx
 ┃ ┃ ┣ 📜ImageUploader.jsx
 ┃ ┃ ┣ 📜UpdateContent.jsx
 ┃ ┃ ┣ 📜UpdateImageUploader.jsx
 ┃ ┃ ┣ 📜Writing.module.scss
 ┃ ┃ ┣ 📜WritingButton.jsx
 ┃ ┃ ┗ 📜WritingHeader.jsx
 ┃ ┗ 📜.DS_Store
 ┣ 📂hooks
 ┃ ┣ 📜useAuth.js
 ┃ ┣ 📜useInfiniteScroll.js
 ┃ ┣ 📜useInput.js
 ┃ ┣ 📜useLazyLoadImage.js
 ┃ ┣ 📜useMutation.js
 ┃ ┗ 📜useQuill.js
 ┣ 📂layout
 ┃ ┣ 📂Navbar
 ┃ ┃ ┣ 📜Navbar.jsx
 ┃ ┃ ┗ 📜Navbar.module.scss
 ┃ ┣ 📂ScrollUp
 ┃ ┃ ┣ 📜ScrollUpButton.jsx
 ┃ ┃ ┗ 📜ScrollUpButton.module.scss
 ┃ ┗ 📜.DS_Store
 ┣ 📂pages
 ┃ ┣ 📜MainPage.jsx
 ┃ ┣ 📜MyPage.jsx
 ┃ ┣ 📜NoticeBoardPage.jsx
 ┃ ┣ 📜PostDetailPage.jsx
 ┃ ┣ 📜PostListPage.jsx
 ┃ ┣ 📜PostUpdatePage.jsx
 ┃ ┣ 📜RecipeDetailPage.jsx
 ┃ ┗ 📜WritingPage.jsx
 ┣ 📂services
 ┃ ┣ 📜comment.services.js
 ┃ ┣ 📜post.services.js
 ┃ ┗ 📜recipe.services.js
 ┣ 📂store
 ┃ ┣ 📂slice
 ┃ ┃ ┣ 📜modalSlice.js
 ┃ ┃ ┣ 📜themeSlice.js
 ┃ ┃ ┗ 📜userSlice.js
 ┃ ┣ 📜.DS_Store
 ┃ ┗ 📜store.js
 ┣ 📂styles
 ┃ ┣ 📜Button.module.scss
 ┃ ┣ 📜dark-mode.scss
 ┃ ┣ 📜quill.scss
 ┃ ┗ 📜reset.scss
 ┣ 📂utils
 ┃ ┣ 📜awsS3Setting.js
 ┃ ┣ 📜imageUploader.js
 ┃ ┣ 📜postDate.js
 ┃ ┣ 📜quillEditor.js
 ┃ ┣ 📜recipeData.js
 ┃ ┣ 📜scrollTop.js
 ┃ ┗ 📜toast.js
 ┣ 📜.DS_Store
 ┣ 📜App.css
 ┣ 📜App.jsx
 ┣ 📜index.js
 ┣ 📜index.scss
 ┣ 📜setupProxy.js
```

</div>
</details>

- `asset` : 이미지 파일
- `pages` : 페이지 컴포넌트
- `components` : 페이지에 대한 컴포넌트
- `hooks` : 커스텀 훅
- `layout` : 레이아웃
- `services` : api요청 로직
- `store` : redux 상태관리
- `styles` : 재사용 스타일
- `utils` : 재사용 로직

<br>

## 주요 기능

### ⭐️ 공통

- 다크모드
- 로그인, 회원가입, 메뉴, 검색 모달
- lazyLoading으로 이미지 최적화
- 무한스크롤
- toast 알림

### 📃 메인 페이지

- 전체 레시피 조회 (무한스크롤)
- 카테고리별 레시피 조회 (탭)
- 레시피 검색
- 클릭시 레시피 상세 페이지 이동

### 🫕 레시피 상세 페이지

- 레시피 상세 정보 조회

### 👩‍👩‍👧‍👦 레시피 공유 게시판 페이지

- 게시물 전체 조회
- 게시물 검색
- 게시판 페이지네이션
- 클릭시 게시판 상세 페이지 이동
- 글작성 페이지 이동

### 📜 게시물 상세 페이지

- 게시물 상세 정보 조회
- 게시물 수정 페이지로 이동
- 게시물 삭제
- 댓글 CRUD (무한스크롤)

### 📝 게시물 작성&수정 페이지

- 미리 보기 이미지 업로드 (AWS S3)
- react-quill 에디터를 사용한 이미지포함 게시글 작성 (AWS S3)

### 🔒 로그인 / 회원가입

- 로그인
- 회원가입
- 유효성 검사
- JWT 토큰 인증
  <br>
