import React from "react";
import IndexContent from "./pages/IndexContent";
import Users from "./pages/Users";
import AddTrans from "./pages/AddTrans";
import Profiles from "./pages/profiles";
import Charts from "./pages/charts";
import Tables from "./pages/tables";
 import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  return(

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexContent />} />
      <Route path="/Users" element={<Users />} />
      <Route path="/AddTrans" element={<AddTrans/>} />
      <Route path="/profiles" element={<Profiles/>} />
      <Route path="/charts" element={<Charts/>} />
      <Route path="/tables" element={<Tables/>} />

    </Routes>
     </BrowserRouter>
  )
}

export default App;
