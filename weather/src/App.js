import CheckWeather from "./components/CheckWeather";
import Home from "./components/Home";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  	return (
		<>
			<Router>
				{/*<Navbar title="Weather & Forecasting "/>*/}
				<Routes>
					<Route path="/" element={<Home/>}/>
					<Route path="/checkweather" element={<CheckWeather/>}/>
				</Routes>
			</Router>
		</>
  	);
}

export default App;
