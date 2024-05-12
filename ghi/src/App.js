import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
