// ThemeProviderWrapper.tsx

import React, { ReactNode, useEffect, useState } from 'react';
import { verifyAsync } from '../../features/auth/authThunk';
import * as tokenHandler from '../../utils/token/index';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verify } from '../../features/auth/authSlice';
import Loading from '../../components/Loading/Loading';

interface AuthenticationHOCProps {
  children: ReactNode;
}

const AuthenticationHOC: React.FC<AuthenticationHOCProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verifyDone, setVerifyDone] = useState(false);

  useEffect(() => {
    let token = tokenHandler.getToken();
    if (token) {
      (dispatch as any)(verifyAsync({ token }))
        .unwrap()
        .then((response: any) => {
          dispatch(verify());
          tokenHandler.setToken(response.token);
          // navigate('/dashboard');
        })
        .catch((error: any) => {
          console.log('error: ', error);
          // navigate('/login');
        })
        .finally(() => {
          setVerifyDone(true);
        });
    } else {
    }
  }, []);
  return <>{children}</>;
};
// return <>{!verifyDone ? <Loading /> : { children }}</>;

export default AuthenticationHOC;
