import React, { FC, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

const Navbar: FC = () => {
  const [isOpenLocations, setIsOpenLocations] = useState<boolean>(false);
  const [isOpenLanguages, setIsOpenLanguages] = useState<boolean>(false);
  const dropdownMenuLocationsRef = useRef<HTMLDivElement>(null);
  const dropdownButtonLocationsRef = useRef<HTMLButtonElement>(null);
  const dropdownMenuLanguagesRef = useRef<HTMLDivElement>(null);
  const dropdownButtonLanguagesRef = useRef<HTMLButtonElement>(null);

  const handleClickLocationsDropdown = (): void => {
    setIsOpenLocations(!isOpenLocations);
  };

  const handleClickLanguagesDropdown = (): void => {
    setIsOpenLanguages(!isOpenLanguages);
  };

  useEffect(() => {
    const handleClickOutsideLocations = (event: MouseEvent) => {
      if (
        dropdownMenuLocationsRef.current &&
        !dropdownButtonLocationsRef.current?.contains(event.target as Node) &&
        !dropdownMenuLocationsRef.current.contains(event.target as Node)
      ) {
        setIsOpenLocations(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideLocations);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideLocations);
    };
  }, [dropdownMenuLocationsRef]);

  useEffect(() => {
    const handleClickOutsideLanguages = (event: MouseEvent) => {
      if (
        dropdownMenuLanguagesRef.current &&
        !dropdownButtonLanguagesRef.current?.contains(event.target as Node) &&
        !dropdownMenuLanguagesRef.current.contains(event.target as Node)
      ) {
        setIsOpenLanguages(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideLanguages);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideLanguages);
    };
  }, [dropdownMenuLanguagesRef]);

  return (
    <>
      <div className="navbar-container">
        <NavLink to="/homepage" className="logo">
          <h5>provence</h5>
          <h6>Europian food</h6>
        </NavLink>
        <div className="navigation">
          <button
            onClick={handleClickLocationsDropdown}
            ref={dropdownButtonLocationsRef}
            className={`dropdownNavbarBtns ${isOpenLocations && 'active'}`}
          >
            <p>locations</p>
            <span
              className={`material-symbols-outlined ${
                isOpenLocations && 'more'
              }`}
            >
              expand_more
            </span>
          </button>
          <NavLink to="/menu" className="nav-link">
            menu
          </NavLink>
          <NavLink to="/about" className="nav-link">
            about us
          </NavLink>
          <button
            className={`dropdownNavbarBtns ${isOpenLanguages && 'active'}`}
            onClick={handleClickLanguagesDropdown}
            ref={dropdownButtonLanguagesRef}
          >
            <p>language</p>
            <span
              className={`material-symbols-outlined ${
                isOpenLanguages && 'more'
              }`}
            >
              expand_more
            </span>
          </button>
          <NavLink to="/login" className="loginBtn">
            <p>log in</p>
          </NavLink>
        </div>
        {isOpenLocations && (
          <div
            ref={dropdownMenuLocationsRef}
            className="dropdownLocations-container"
          >
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
        {isOpenLanguages && (
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
      </div>
    </>
  );
};

export default Navbar;
