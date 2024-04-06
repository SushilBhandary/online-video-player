import { useRef } from 'react';
import { useNavigate, Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { useAppContext } from './FileContext';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/play" element={<VideoPlayer/>}></Route>
        <Route path="*" element={<Home />}></Route>
      </Routes>
    </Router>
  );
}

const Home = () => {

  const { selectedFile, setSelectedFile, setCurrentPlay } = useAppContext();
  const navigate = useNavigate();

  // Handler for file input change
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setSelectedFile(Array.from(files))
      setCurrentPlay(URL.createObjectURL(files[0]))
    }
  };

  // Handler for button click
  const handleSubmit = () => {
    if (selectedFile) { // Check if a file is selected
      navigate("/play");
    } else {
      alert("Please select a file first."); // Alert if no file is selected
    }
  };


  return (
    <div class='top'>
      <div class='land'>
        <label htmlFor="fileInput">Select your video to play</label>
        <div className='inputbox'>
          <input type="file" onChange={handleFileChange} webkitdirectory="true" directory="true" />
          <button type="button" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  )
}

const VideoPlayer = () => {
  
  const { selectedFile, currentPlay, setCurrentPlay } = useAppContext();
  const videoRef = useRef(null)

  const changeVideo = (file) => {
    const fileURL = URL.createObjectURL(file);
    setCurrentPlay(fileURL);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }

  return (
    <div className='content'>
      <h1 className='title'> Video Player </h1>
      <div className='videopage' >
        <div className='buttomsBar'>
          <h1 className='buttomsHeader'> List of videos </h1>
          <div className='videoButtom'>
            {selectedFile.map( (e,i) => <button key={i} onClick={() => changeVideo(e)} className='videoBtm'>{e.name}</button>) }
          </div>
        </div>
        <div className='player'>
          {/* Video Player */}
          <video className='video'   ref={videoRef} style={{ width: "70vw", height: "70vh" }} controls>
            <source src={currentPlay} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
    
  )
}

export default App;