import React, { useState } from 'react'
import Card from '../../components/Card/Card';
import styles from './auth.module.scss';
import { MdPassword } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../services/authService';

const initialState = {
  password: "",
  password2: "",
}

const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;

  const { resettoken } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData , [name] : value });
  }

  const reset = async(e) => {
    e.preventDefault();

    if (!password || !password2) {
      return toast.error("All fields are required.");
    }

    if (password.length < 6) {
      return toast.error("Passwords must up to 6.")
    }

    if (password !== password2) {
      return toast.error("The password do not match.");
    }

    const userData = {
      password,
      password2
    }

    try {
      const data = await resetPassword(userData, resettoken);
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className={`container ${styles.auth}`}>
        <Card>
            <div className={styles.form}>
                <div className="--flex-center">
                    <MdPassword size={35} color="#999" />
                </div>
                <h2>Reset Password</h2>

                <form onSubmit={reset}>
                  <input type="password" placeholder="New Password" required name="password" value={password} onChange={handleInputChange}/>
                  <input type="password" placeholder="Confirm New Password" required name="password2" value={password2} onChange={handleInputChange}/>
                  <button type="submit">Reset Password</button>

                  <div className={styles.links}>
                      <p><Link to="/">- Home</Link></p>
                      <p><Link to="/login">-  Login</Link></p>
                  </div>
                </form>
  
            </div>
        </Card>
    </div>
  )
}

export default Reset