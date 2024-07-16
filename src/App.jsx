import { Routes, Route, BrowserRouter} from 'react-router-dom';
import "./App.css";

import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Home } from "./pages/home";
import { SignIn } from "./pages/signIn";
import { User } from "./pages/user";
import { Error } from "./pages/error";


const App = () => {
  return (
    <BrowserRouter>
       <div className="App">
        <Header/>
        <Routes>
          <Route path ='/' element={<Home/>} />
          <Route path ='SignIn' element={<SignIn/>} />
          <Route path ='User' element={<User/>} />
          <Route path ="*" element={<Error/>} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
   
  )
}

export default App;