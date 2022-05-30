import React, { useContext } from 'react';
import { AppContext, APP_ACTIONS } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './Arrows.scss';

const Arrows = ({ listLength }) => {

  const { count, dispatchAppEvent } = useContext(AppContext);

  const setCount = (value) => {
    if (value === 'increment') {
      if (count < listLength - 1) {
        dispatchAppEvent({
          type: APP_ACTIONS.SET_COUNT,
          count: count + 1
        })
      }
    } else if (value === 'decrement' && count > 0 ) {
      dispatchAppEvent({
        type: APP_ACTIONS.SET_COUNT,
        count: count - 1
      })
    }
  }

  return (
    <div className="arrows-wrapper">
      <button className={`arrow-button ${count === 0 ? 'disabled' : ''}`} onClick={() => setCount('decrement')}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button className={`arrow-button ${listLength && count === listLength - 1 ? 'disabled' : ''}`} onClick={() => setCount('increment')}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  )
}

export default Arrows;