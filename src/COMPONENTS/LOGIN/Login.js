import { useState } from 'react';
import Message from '../AVISOS/Message';
import styles from './Login.module.css';







export default function Login() {

    const [token, setToken] = useState();
    const [user, setUser] = useState({});
    const [showMsg, setShowMsg] = useState([false]);
    const [pass, setPass] = useState(false);

    function HandleChange(e) {
        setUser(val => ({ ...val, [e.target.name]: e.target.value.toUpperCase() }))

    }
    //  console.log(user.login)




    function HandleLogin(e) {
        e.preventDefault();
        fetch(`http://localhost:5000/usuarios?login=${user.login}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((resp) => resp.json())
            .then((data) => {
                data.forEach(element => {
                    if (user.senha === element.senha) {
                        setUser(element);
                        setPass(true);

                    } else {
                        setShowMsg([true, 'error', 'USUARIO OU SENHA INVÁLIDOS']);
                        setTimeout(() => {
                            setShowMsg([false]);
                            setPass(false);
                        }, 3000);
                    };
                });
            });
    };



    if (pass) {
        authToken();
    }




    function authToken() {

        fetch(`http://localhost:5000/token`, {
            method: "GET",
            headers: { "Content-Type": "applicaation/json" },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setToken(data[0].token);
                console.log(data[0].token);
            })
    };

    if (token) {
        sessionStorage.setItem('token', token);
        window.location.reload()
    };





    return (
        <div className={styles.wrapper_login}>
            {
                showMsg[0] && <Message type={showMsg[1]} msg={showMsg[2]} />
            }
            <div className={styles.loginForm} >

                <h2>ENTRAR NA CONTA</h2>
                <form onSubmit={HandleLogin}>
                    <label htmlFor='login'>Login</label><br />
                    <input type={'text'} name={'login'} id={'login'} onChange={HandleChange} required /><br />
                    <label htmlFor='login'>Senha</label><br />
                    <input type={'text'} name={'senha'} id={'senha'} onChange={HandleChange} required /><br />
                    <input type={'submit'} value={'ENTRAR'} />

                </form>

            </div>

        </div>
    )
}




