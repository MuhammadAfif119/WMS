import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SplitScreen from '../component/Login';
import SignupCard from '../component/SignUp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import ThreeTierPricing from '../component/Tambah';
import Nav1 from '../views/DataProduct';
import Nav2 from '../views/DataStok';
import Nav3 from '../views/Persediaan';
import Nav4 from '../views/Keluar';
import Nav5 from '../views/Masuk';
import Nav from '../views/HomePage';

const Router = () => {
  const [userCondition, setUserCondition] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserCondition(true);
      } else {
        setUserCondition(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return (
    <Routes>
      {userCondition ? (
        <>
          <Route path="/" element={<Navigate to="/homepage" replace />} />
          <Route path="/login" element={<Navigate to="/homepage" replace />} />
          <Route path="/homepage" element={<Nav />} />
          <Route path="/pp" element={<ThreeTierPricing />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/homepage" element={<Navigate to="/login" replace />} />
          <Route path="/pp" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<SplitScreen />} />
          <Route path="/sign-up" element={<SignupCard />} />
        </>
      )}
    </Routes>
  );
};

export default Router;
