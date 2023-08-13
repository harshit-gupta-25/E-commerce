import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import { loginUser } from '../../api/UserApi';
import AuthContext from '../../store/auth-context';
import './Login.css';


const Login = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const onlogin = (login) => {
        //alert(JSON.stringify(login, null, 2));
        loginUser(login.email, login.password)
            .then(data => {
                if (data.length > 0) {
                    auth.login(data[data.length - 1].id);
                    navigate("/", { replace: true });
                }
            })
        return false;
    }


    return (
        <div className="outer-container">
            <div className="login-container">
                <LoginForm onlogin={onlogin} />
            </div>
        </div>
    )
}

export default Login;