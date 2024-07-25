import { Routes, Route, BrowserRouter } from 'react-router-dom';
import "./App.css";

import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Home } from "./pages/home";
import { SignIn } from "./pages/signIn";
import { User } from "./pages/user";
import { Error404 } from "./pages/error404";
import { PrivateRoute } from './services/PrivateRoute';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signIn' element={<SignIn />} />
          <Route 
            path='user' 
            element={<PrivateRoute element={<User />} />} 
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
