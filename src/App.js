import { CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Article from "./scenes/article_post/Article";
import CreateArticle from "./scenes/article_post/CreateArticle";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Topbar from "./scenes/global/Topbar";
import Login from "./scenes/login/Login";
import PrivateRoute from "./scenes/login/PrivateRoute";
import Contacts from "./scenes/contacts";
import { ColorModeContext, useMode } from "./theme";
import CheckLogin from "./scenes/login/CheckLogin";
import UpdateArticle from "./scenes/article_post/UpdateArticle";
import ListMembers from "./scenes/ListMember/ListMember";
import ListRecipeType from "./scenes/RecipeType/ListRecipeType";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") ? true : false);
  return (
    <>   
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
          {isLogin && <Sidebar isSidebar={isSidebar} />} 
            <main className="content">
            {isLogin && <Topbar setIsSidebar={setIsSidebar} setIsLogin={setIsLogin}/>}
              <Routes>
              <Route element={<CheckLogin />}>
                <Route path="/" element={<Login setIsLogin={setIsLogin}/>} />
              </Route>
                <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="/profile" element={<ProfilePage />} /> */}
                {/* <Route path="/team" element={<Team />} /> */}
                <Route path="/posts" element={<Article />} />
                <Route path="/createpost" element={<CreateArticle />} />
                <Route path="/updatepost/:id" element={<UpdateArticle />} />
                <Route path="/orders" element={<Contacts />} />
                <Route path="/members" element={<ListMembers />} />
                <Route path="/recipetype" element={<ListRecipeType />} />
               {/*  <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/geography" element={<Geography />} /> */}
                </Route>
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;


//--------------------------------Old version--------------------------------


// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import RegistrationForm from "./scenes/Register/Register";
// import Article from "./scenes/article_post/Article";
// import CreateArticle from "./scenes/article_post/CreateArticle";
// import Calendar from "./scenes/calendar/calendar";
// import Contacts from "./scenes/contacts";
// import Dashboard from "./scenes/dashboard";
// import FAQ from "./scenes/faq";
// import Form from "./scenes/form";
// import Sidebar from "./scenes/global/Sidebar";
// import Topbar from "./scenes/global/Topbar";
// import Invoices from "./scenes/invoices";
// import LandingPage from "./scenes/landingpage/LandingPage";
// import Login from "./scenes/login/Login";
// import ProfilePage from "./scenes/profile/Profile";
// import Team from "./scenes/team";
// import { ColorModeContext, useMode } from "./theme";
// function App() {
//   const [theme, colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);
//   const [isLogin, setIsLogin] = useState(localStorage.getItem("token"));
//   // const token = localStorage.getItem("token")
//   return (
//     <>
//     {isLogin === null ?
//     <>    
//       <Routes>
//         <Route path="/login" element={<Login setIsLogin={setIsLogin}/>} />
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/register" element={<RegistrationForm/>} />
//       </Routes>
//       </>
//       :
//       <>
//       <ColorModeContext.Provider value={colorMode}>
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           <div className="app">
//             <Sidebar isSidebar={isSidebar} />
//             <main className="content">
//               <Topbar setIsSidebar={setIsSidebar} setIsLogin={setIsLogin}/>
//               <Routes>
//                 <Route path="/dashboard" element={<Dashboard />} />
//                 <Route path="/profile" element={<ProfilePage />} />
//                 <Route path="/team" element={<Team />} />
//                 <Route path="/posts" element={<Article />} />
//                 <Route path="/createpost" element={<CreateArticle />} />
//                 <Route path="/contacts" element={<Contacts />} />
//                 <Route path="/invoices" element={<Invoices />} />
//                 <Route path="/form" element={<Form />} />             
//                 <Route path="/faq" element={<FAQ />} />
//                 <Route path="/calendar" element={<Calendar />} />               
//               </Routes>
//             </main>
//           </div>
//         </ThemeProvider>
//       </ColorModeContext.Provider>
//       </>
//       }
//     </>
//   );
// }

// export default App;
