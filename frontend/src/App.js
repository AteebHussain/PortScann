/** @format */

import React, { useState, useEffect  } from "react";
import "./App.css";
import "./PortScanner.css";
import lanImage from "./lan.png";
import Loading from './Loading';

const App = () => {
	const [targetHost, setTargetHost] = useState("");
	const [startPort, setStartPort] = useState("");
	const [endPort, setEndPort] = useState("");
	const [openPorts, setOpenPorts] = useState([]);
	const [darkMode, setDarkMode] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const handleScanPorts = () => {
		setLoading(true);

		fetch("http://localhost:5000/scan_ports", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				target_host: targetHost,
				start_port: startPort,
				end_port: endPort,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setOpenPorts(data.open_ports);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error:", error);
				setLoading(false);
			});
	};

	const handleToggleDarkMode = () => {
		setDarkMode(!darkMode);
		document.body.classList.toggle("dark-mode");
	};

	useEffect(() => {
		// Simulate a delay for demonstration purposes
		const delay = setTimeout(() => {
		  setIsLoading(false);
		}, 2000); // Adjust the delay time as needed
	
		// Clear the delay timer when the component unmounts (cleanup)
		return () => clearTimeout(delay);
	  }, []);


	return (
		<div className={`App ${darkMode ? "dark" : ""}`}>
			<div className="toggle-switch" onClick={handleToggleDarkMode} style={{ color: darkMode ? '#fff' : '#333' }}>
        		<label htmlFor="darkModeToggle">Dark Mode:</label>
        			<input
          				type="checkbox"
         				id="darkModeToggle"
         				checked={darkMode}
						 onChange={() => {}}
        			/>
        		<div className="slider"></div>
      		</div>

			{isLoading && <Loading />}

			{/* <h1>PortScann </h1> */}

			<div className="heading-container">
        		<h1>PortScann</h1>
        		<img src={lanImage} alt="LAN" />
      		</div>

			<div className='input-container'>
				<label id="one">Target Host (IP address or domain):</label>
				<input
					type='text'
					value={targetHost}
					onChange={(e) => setTargetHost(e.target.value)}
				/>
				<label id="two">Starting Port:</label>
				<input
					type='number'
					value={startPort}
					onChange={(e) => setStartPort(e.target.value)}
				/>
				<label id="three">Ending Port:</label>
				<input
					type='number'
					value={endPort}
					onChange={(e) => setEndPort(e.target.value)}
				/>
				<button onClick={handleScanPorts}>Scan Ports</button>
			</div>

			<div className='results-container'>
				{loading ? (
					<div className='loader-container'>
						<div className='loader'></div>
						<p>Scanning Ports...</p>
					</div>
				) : (
					<React.Fragment>
						{" "}
						{}
						<h2 id="four">Open Ports:</h2>
						{openPorts.length > 0 ? (
							<ul>
								{openPorts.map((port) => (
									<li key={port}>{port}</li>
								))}
							</ul>
						) : (
							<p id="five">No open ports found.</p>
						)}
					</React.Fragment>
				)}
			</div>

			{/* <button className='dark-mode-toggle' onClick={handleToggleDarkMode}>
				{darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
			</button> */}

			<footer className="footer">
        		<hr />
        			<p className="name">Made by Syed Ateeb</p>
  					<div className="links">
                        <div id="instagram"><a href="http://www.instagram.com/ateeeeeeeb_" target="_blank"> <img src="img/instagram-removebg-preview.png" alt="Instagram"/></a></div>
                        <div id="linked"><a href="https://www.linkedin.com/in/syed-ateeb-359867225/" target="_blank"> <img src="img/linkedin-removebg-preview.png" alt="LinkedIn"/></a></div>
                        <div id="gmail"><a href="mailto:syedateebhussain123@gmail.com" target="_blank"> <img src="img/gmail-removebg-preview.png" alt="Gmail"/></a></div>
            		</div>
      		</footer>
		</div>
	);
};

export default App;
