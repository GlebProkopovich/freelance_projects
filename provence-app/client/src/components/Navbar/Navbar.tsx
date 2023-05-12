import { FC, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ILogin } from '../../types';
import { actionCreators } from '../../state';
import './Navbar.scss';

const Navbar: FC = () => {
  const [isOpenDropdownLocations, setIsOpenDropdownLocations] =
    useState<boolean>(false);
  const [isOpenDropdownLanguages, setIsOpenDropdownLanguages] =
    useState<boolean>(false);
  const [isOpenDropdownMenu, setIsOpenDropdownMenu] = useState<boolean>(false);
  const [isOpenPageLocations, setIsOpenPageLocations] =
    useState<boolean>(false);
  const [isOpenPageMenu, setIsOpenPageMenu] = useState<boolean>(false);
  const dropdownMenuLocationsRef = useRef<HTMLDivElement>(null);
  const dropdownButtonLocationsRef = useRef<HTMLButtonElement>(null);
  const dropdownMenuLanguagesRef = useRef<HTMLDivElement>(null);
  const dropdownButtonLanguagesRef = useRef<HTMLButtonElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const dropdownButtonMenuRef = useRef<HTMLButtonElement>(null);

  const location = useLocation();

  const dispatch = useDispatch();

  const isLoginOpened = useSelector(
    (state: ILogin) => state.loginForm.isOpened
  );

  const { setLoginOpened } = actionCreators;

  const handleClickLoginOpen = (): void => {
    dispatch(setLoginOpened());
  };

  const handleClickLocationsDropdown = (): void => {
    setIsOpenDropdownLocations(!isOpenDropdownLocations);
  };

  const handleClickLanguagesDropdown = (): void => {
    setIsOpenDropdownLanguages(!isOpenDropdownLanguages);
  };

  useEffect(() => {
    const handleClickOutsideLocations = (event: MouseEvent) => {
      if (
        dropdownMenuLocationsRef.current &&
        !dropdownButtonLocationsRef.current?.contains(event.target as Node) &&
        !dropdownMenuLocationsRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdownLocations(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideLocations);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideLocations);
    };
  }, [dropdownMenuLocationsRef]);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (isLoginOpened) {
      body.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
    }

    return () => {
      body.classList.remove('no-scroll');
    };
  }, [isLoginOpened]);

  useEffect(() => {
    const handleClickOutsideLanguages = (event: MouseEvent) => {
      if (
        dropdownMenuLanguagesRef.current &&
        !dropdownButtonLanguagesRef.current?.contains(event.target as Node) &&
        !dropdownMenuLanguagesRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdownLanguages(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideLanguages);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideLanguages);
    };
  }, [dropdownMenuLanguagesRef]);

  useEffect(() => {
    const handleClickOutsideMenu = (event: MouseEvent) => {
      if (
        dropdownMenuRef.current &&
        !dropdownButtonMenuRef.current?.contains(event.target as Node) &&
        !dropdownMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdownMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideMenu);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    };
  }, [dropdownMenuLanguagesRef]);

  useEffect(() => {
    if (location.pathname.startsWith('/locations')) {
      setIsOpenPageLocations(true);
    } else {
      setIsOpenPageLocations(false);
    }
  }, [location]);

  useEffect(() => {
    if (location.pathname.startsWith('/menu')) {
      setIsOpenPageMenu(true);
    } else {
      setIsOpenPageMenu(false);
    }
  }, [location]);

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-subcontainer">
          <NavLink to="/homepage" className="logo">
            <h5>provence</h5>
            <h6>Europian food</h6>
          </NavLink>
          <div className="navigation">
            <button
              ref={dropdownButtonLocationsRef}
              className={`dropdownNavbarBtns ${
                (isOpenDropdownLocations || isOpenPageLocations) && 'active'
              }`}
              onClick={handleClickLocationsDropdown}
            >
              <p>locations</p>
              <span
                className={`material-symbols-outlined ${
                  isOpenDropdownLocations && 'more'
                }`}
              >
                expand_more
              </span>
            </button>
            <NavLink
              to="/menu/breakfasts"
              className={`nav-link ${isOpenPageMenu && 'active'}`}
            >
              menu
            </NavLink>
            <NavLink to="/about" className="nav-link">
              about us
            </NavLink>
            <button
              className={`dropdownNavbarBtns ${
                isOpenDropdownLanguages && 'active'
              }`}
              onClick={handleClickLanguagesDropdown}
              ref={dropdownButtonLanguagesRef}
            >
              <p>language</p>
              <span
                className={`material-symbols-outlined ${
                  isOpenDropdownLanguages && 'more'
                }`}
              >
                expand_more
              </span>
            </button>
            <button className="loginBtn" onClick={handleClickLoginOpen}>
              log in
            </button>
          </div>
          {isOpenDropdownLocations && (
            <div ref={dropdownMenuLocationsRef} className="dropdown-container">
              <ul>
                <NavLink to="locations/batumi">
                  <li>batumi</li>
                </NavLink>
                <NavLink to="locations/tbilisi">
                  <li>tbilisi</li>
                </NavLink>
              </ul>
            </div>
          )}
          {isOpenDropdownLanguages && (
            <div
              className="dropdownLanguages-container"
              ref={dropdownMenuLanguagesRef}
            >
              <ul>
                <li>
                  <button>russian</button>
                </li>
                <li>
                  <button>english</button>
                </li>
                <li>
                  <button>georgian</button>
                </li>
              </ul>
            </div>
          )}
          {/* {isOpenDropdownMenu && (
            <div
              className="dropdown-container dropdownMenu"
              ref={dropdownMenuRef}
            >
              <ul>
                <NavLink to="menu/restaurants">
                  <li>restaurants</li>
                </NavLink>
                <NavLink to="menu/delivery">
                  <li>delivery</li>
                </NavLink>
              </ul>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
