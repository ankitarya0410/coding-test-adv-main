import React, { useState, useEffect, useContext } from 'react';
import Arrows from './arrows/Arrows';
import { AppContext, APP_ACTIONS } from '../context';
import './Carousal.scss';

const Carousal = ({ labels, images }) => {

  const { count, dispatchAppEvent } = useContext(AppContext);

  const [ imageList, setImageList ] = useState();
  const [ buttonsEnabled, setButtonsEnabled ] = useState({});

  const failCheck = (e) => e === true;

  const toggleImageList = (label) => {
    dispatchAppEvent({
      type: APP_ACTIONS.RESET_COUNT,
    });
    if (buttonsEnabled.hasOwnProperty(label)) {
      setButtonsEnabled({ ...buttonsEnabled, [label]: !buttonsEnabled[label]})
    } else {
      setButtonsEnabled({ ...buttonsEnabled, [label]: true})
    }
  }

  useEffect(() => {
    let flatArr = [];
    const checkButtons = labels.map(label => buttonsEnabled[label]);
    if(!!buttonsEnabled && checkButtons.some(failCheck)) {
      const newList = [];
      Object.keys(buttonsEnabled).forEach(label => {
        if (!!buttonsEnabled[label]) {
          newList.push(images[label]);
          flatArr = newList.flat();
        }
      });
    } else if (!!buttonsEnabled && !checkButtons.some(failCheck)) {
      const imageArr = [];
      labels.forEach(label => {
        imageArr.push(images[label]);
        flatArr = imageArr.flat();
      });
    }
    setImageList(flatArr);
  }, [buttonsEnabled, images, labels])

  useEffect(() => {
    //just a simple re-render
  }, [imageList]);

  return (
    <div>
      <div className="button-wrapper">
        {!!labels && labels.length > 0 && labels.map(label => (
          <button
            key={label}
            className={`select-button
              ${buttonsEnabled.hasOwnProperty(label) && buttonsEnabled[label] === true ? 'selected' : ''}
              ${!!images && !images[label].length > 0 ? 'disabled' : ''}`}
            onClick={() => toggleImageList(label)}
            disabled={!!images && !images[label].length > 0}
          >
            {label}
          </button>
        ))}
        <div className="image-wrapper">
          { !!imageList && imageList.length > 0 && <img src={imageList[count]} className="image-lite" alt={imageList[count]} /> }
        </div>
        <Arrows listLength={!!imageList && imageList.length} />
      </div>
    </div>
  );
}

export default Carousal;