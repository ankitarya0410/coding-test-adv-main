import React, { useEffect, useState } from 'react';
import { AppProvider } from './context';
import './App.css';
import axios from 'axios';
import Carousal from './carousal/Carousal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const App = () => {

  const [ data, setData ] = useState({});
  const [ labels, setLabels ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const getImages = async (token) => {
    setLoading(true);
    const url = 'http://localhost:3000/auth/images';
    const config = {
      headers: { 'Authorization': `Basic ${token}`}
    }
    const images = await axios.get(url, config);
    setData(images.data);
  }

  useEffect(() => {
    if (!!data) {
      const keys = Object.keys(data);
      setLabels(keys);
    }
  }, [data])

  const authenticateMe = async () => {
    const url = 'http://localhost:3000/auth/';
    const tokenData = await axios.get(url);
    sessionStorage.setItem('accessToken', tokenData.data);
    await getImages(tokenData.data);
    setLoading(false);
  }

  const logMeOut = async () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.clear();
    window.location.reload(false);
  }

  return (
    <AppProvider>
      <div className="App">
        {!!loading ? (
          <div className="loading">
            <FontAwesomeIcon className="loading-icon" icon={faSpinner} />
          </div>
        ) : (
          <React.Fragment>
            {!!data && !!labels && labels.length > 0 ? (
              <React.Fragment>
                <button className="user-action-button" onClick={() => logMeOut()}>Logout</button>
                <Carousal labels={labels} images={data} />
              </React.Fragment>
            ) : ( <button className="user-action-button" onClick={() => authenticateMe()}>Authenticate me!</button> )}
          </React.Fragment>
        )}
      </div>
    </AppProvider>
  );
}

export default App;
