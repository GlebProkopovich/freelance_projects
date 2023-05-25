import { FC } from 'react';
import './RegistrationCompleted.scss';
import { actionCreators } from '../../state';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

const RegistrationCompletedModal: FC = () => {
  const dispatch = useDispatch();

  const { setRegistrationWindowCompleted, setLoginOpened } = actionCreators;

  const handleClickOnBtn = (value: boolean) => {
    dispatch(setRegistrationWindowCompleted(value));
  };

  const openLoginWindow = () => {
    dispatch(setLoginOpened());
  };

  return (
    <div
      className="registrationCompleted-container"
      onClick={() => handleClickOnBtn(false)}
    >
      <div className="registrationCompleted-subcontainer">
        <span className="material-symbols-outlined orderDonePicture">
          task_alt
        </span>
        <h1>Great!</h1>
        <h2>
          Registration almost is finished.
          <br />
          Activation link was sent, approve your email.
        </h2>
        <NavLink to="/menu/breakfasts">Go to menu</NavLink>

        <button>
          <span
            className="material-symbols-outlined close-btn"
            onClick={() => handleClickOnBtn(false)}
          >
            close
          </span>
        </button>
      </div>
    </div>
  );
};

export default RegistrationCompletedModal;
