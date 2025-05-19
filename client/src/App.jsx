import { Routes, Route } from 'react-router-dom';
import WeatherPage from './pages/WeatherPage';
import Header from "./components/Header"

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<WeatherPage />} />
            </Routes>
        </div>
    );
}

export default App;
