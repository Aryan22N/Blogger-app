import './App.css';
import Sidebar from './component/Sidebar/Sidebar';
import Box from '@mui/material/Box';
import { Routes, Route ,BrowserRouter } from "react-router-dom"
import Authorpanel from './Pages/Authors/Authorpanel';
import Categoraypanel from './Pages/Categoray/Categoraypanel';
import Postpanel from './Pages/Posts/Postpanel';
import Commentpanel from './Pages/Comments/Commentpanel';
import Accountpanel from './Pages/Accounts/Accountpanel';
import Accounts from './Pages/Accounts/Accounts';

import Comments from './Pages/Comments/Comments';
import Posts from './Pages/Posts/Posts';
import Category from './Pages/Categoray/Categoray';
import Loginform from './Pages/login/Loginform';
import Logout from './Pages/Logout/Logout';
import Registerform from './Pages/login/Registerform';
import axios from 'axios';

// Add a response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config && error.config.url && error.config.url.includes('/login');
    if (error.response && (error.response.status === 401 || error.response.status === 403) && !isLoginRequest) {
      alert("login to the app to use the feature");
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
        <Box sx={{ display: 'flex', marginTop: '64px', backgroundColor: '#FFF', paddingBottom: '64px' }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
            <switch>
              <Routes>
                
                <Route path="author" element={ <Authorpanel/> } />
                <Route path="categoraypanel" element={ <Categoraypanel/> } />
                <Route path="commentpanel" element={ <Commentpanel/> } />
                <Route path="accountpanel" element={ <Accountpanel/> } />
                <Route path="postpanel" element={ <Postpanel/> } />
               
                <Route path="accounts" element={ <Accounts/> } />
               
                <Route path="comments" element={ <Comments/> } />
                <Route path="posts" element={ <Posts/> } />
                <Route path="categoraypanel/cat" element={ <Category/> } />

                <Route path="/" element={ <Loginform/> } />
                <Route path="/register" element={ <Registerform/> } />
                <Route path="logout" element={ <Logout/> } />
              </Routes> 
            </switch>
          </Box>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
