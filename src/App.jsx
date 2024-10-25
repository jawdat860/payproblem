import { useIntegration } from '@telegram-apps/react-router-integration';
import { initNavigator, useBackButton } from '@telegram-apps/sdk-react';
import { useEffect, useMemo } from 'react';
import {
  Navigate,
  Route,
  Router,
  Routes,
  useNavigate,
} from 'react-router-dom';
import Services from './components/Services/Services';

import CartProvider from './components/store/s.jsx';
import LandingPages from './components/LandingPages.jsx';
import Order from './components/Order/Order.jsx';
import PaymentForm from './components/FormServices/PaymentForm.jsx';
import ServicesFa from './components/Favourite/ServicesFa.jsx';
import WebApp from "@twa-dev/sdk";

function App() {
  // Initialize the navigator for Telegram integration
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Attach navigator to control browser history and the Telegram back button
  useEffect(() => {
    navigator.attach();
    WebApp.BackButton.show();
     // Navigate back one step in history
      
    return () => {navigator.detach()

     
    };
  }, [navigator]);

  // useEffect(() => {
  //   // Show the Telegram back button
  //   WebApp.BackButton.show();

  //   // Add an event listener for back button click
  //   WebApp.onEvent("backButtonClicked", () => {
  //   navigator.goTo(-1); // Navigate back one step in history
  //   })});

  return (
    <CartProvider>
  
      <Router location={location} navigator={reactNavigator}>
        <Routes>
          <Route path="/" element={
            <>
              <LandingPages />
              
              <Services />
            </>
          }/>
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<ServicesFa />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Corrected Navigate usage */}
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
