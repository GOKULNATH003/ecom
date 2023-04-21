import logo from './logo.svg';
import './App.css';
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Component/Home/Home';
import ViewProduct from './Component/viewProduct/ViewProduct';
import DisplayProduct from './Component/DisplayProduct/DisplayProduct';
import Overlay from './Component/overlay/Overlay';
import Header from './Component/Header/Header';
import HomeContent from './Component/Home/Homecontent';

export const NewContext = createContext();

function App() {
  const [data, setData] = useState();
  const [viewCategory, setViewCategory] = useState()

  return (
    <div className="App">
      <NewContext.Provider value={{ data, setData, viewCategory, setViewCategory }}>
        <Router>
          <Header />
          <Routes>
            <Route path='/' element={<HomeContent />} />
            <Route exact path="/products" element={<Home />} />
            <Route exact path="/viewprod" element={<ViewProduct />} />
            <Route exact path="/displayproduct" element={<DisplayProduct />} />
            <Route exact path="/layer" element={<Overlay />} />
          </Routes>
        </Router>
      </NewContext.Provider>
    </div>
  );
}

export default App;