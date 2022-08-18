import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactsPage from '../page/contacts-page';
import LoginPage from '../page/login-page';
import RegisterPage from '../page/register-page';
import { Spinner } from './spinner';

export default function App() {
  return (
    <Router>
      <div className="container mx-auto">
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Spinner />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="register"
            element={
              <Suspense fallback={<Spinner />}>
                <RegisterPage />
              </Suspense>
            }
          />
          <Route
            path="contacts"
            element={
              <Suspense fallback={<Spinner />}>
                <ContactsPage />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
