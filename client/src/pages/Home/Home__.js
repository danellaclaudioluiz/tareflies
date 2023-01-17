import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { selectName, SET_LOGIN } from '../../redux/features/auth/authSlice';
import { logoutUser } from '../../services/authService';

const Home__ = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  }
  useRedirectLoggedOutUser("/login");
  return (
    <div>LOGADO
      <div>
        Seje bem venido meu caro/a {name}
      </div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default Home__