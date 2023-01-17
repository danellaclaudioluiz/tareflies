import React from 'react'
import { Link } from 'react-router-dom'
import { ShowOnLogin, ShowOnLogout } from "../../components/Protect/hiddenLink";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectName, SET_LOGIN } from '../../redux/features/auth/authSlice';
import { logoutUser } from '../../services/authService';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useSelector(selectName);

  const logout = async () => {
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  }
  return (
    <div>
      <ShowOnLogin>
        Salve usuário {name}
        <div>
        <button onClick={logout}>Logout</button>
      </div>
      </ShowOnLogin>
      <ShowOnLogout>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </ShowOnLogout>

    </div>
  )
}

export default Home