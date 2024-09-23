import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { SplashPage } from './pages/SplashPage';
import { ActivationPage } from './pages/ActivationPage';
import { DashboardPage } from './pages/DashboardPage';
import { WebviewPage } from './pages/WebviewPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path='/activation' element={<ActivationPage />} />
        <Route path='/dashboard' element={<DashboardPage />} />
        <Route path='/webview' element={<WebviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
