import { Route, Routes, useLocation } from 'react-router-dom';
import Aboutpage from './pages/Aboutpage/Aboutpage';
import Homepage from './pages/Homepage/Homepage';
import Locationspage from './pages/Locationpage/Locationspage';
import Navbar from './components/Navbar/Navbar';
import ContactInfo from './components/ContactInfo/ContactInfo';
import { useState, useEffect } from 'react';
import { ILogin, IRegistration } from './types';
import { useSelector } from 'react-redux';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import './App.scss';
import Menupage from './pages/Menupage/Menupage';

function App() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isLoginOpened = useSelector(
    (state: ILogin) => state.loginForm.isOpened
  );
  const isRegistrationOpened = useSelector(
    (state: IRegistration) => state.registrationForm.isOpened
  );

  useEffect(() => {
    if (location.pathname.startsWith('/menu')) {
      setIsMenuOpen(true);
    } else {
      setIsMenuOpen(false);
    }
  }, [location]);

  return (
    <>
      <header className={isMenuOpen ? 'header-static' : 'header-sticky'}>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route index element={<Homepage />} />
          <Route
            path="locations/batumi"
            element={
              <Locationspage
                position={[41.64780334961626, 41.637785801151125]}
                locationOfTheRestaurant="batumi"
                adressOfTheRestaurant="44 Vakhtang Gorgasali St, Batumi"
              />
            }
          />
          <Route
            path="locations/tbilisi"
            element={
              <Locationspage
                position={[41.690252362708584, 44.80768211499577]}
                locationOfTheRestaurant="tbilisi"
                adressOfTheRestaurant="49 Kote Afkhazi St, T'bilisi"
              />
            }
          />
          <Route path="menu/:dishUrl" element={<Menupage />} />
          <Route path="about" element={<Aboutpage />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
        {isLoginOpened && <Login />}
        {isRegistrationOpened && <Registration />}
      </main>
      <footer>
        <ContactInfo />
      </footer>
    </>
  );
}

export default App;
