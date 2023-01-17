import React, {useState} from 'react'
import Card from '../../components/Card/Card';
import styles from './auth.module.scss';
import { TiUserAddOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';

const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
}

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { name, email, password, password2 } = formData;

  const handleInputChange = () => {

  }

  return (
    <div className={`container ${styles.auth}`}>
        <Card>
            <div className={styles.form}>
                <div className="--flex-center">
                    <TiUserAddOutline size={35} color="#999" />
                </div>
                <h2>Register</h2>
                <form>
                  <input type="text" placeholder="Name" required name="name" value={name} onChange={handleInputChange} />
                    <input type="email" placeholder="Email" required name="email" value={email} onChange={handleInputChange} />
                    <input type="password" placeholder="Password" required name="password" value={password} onChange={handleInputChange}/>
                    <input type="password" placeholder="Confirm your password" required name="password" value={password2} onChange={handleInputChange}/>
                    <button type="submit">Register</button>
                </form>

                <span className={styles.register}>
                    <Link to="/">Home</Link>
                    <p>&nbsp; Already have an account?&nbsp;</p>
                    <Link to="/login">Login</Link>
                </span>
            </div>
        </Card>
    </div>
  )
}

export default Register