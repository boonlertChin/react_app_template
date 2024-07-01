import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../auth/AuthWrapper"
import { Button, Divider, Input } from "antd";
import {
    LockOutlined, UserOutlined,
    GoogleOutlined,
    FacebookOutlined,
    GithubOutlined
  } from '@ant-design/icons';

export const Login = () => {

     const navigate = useNavigate();
     const { login } = AuthData();
     const [ formData, setFormData ] = useReducer((formData, newItem) => { return ( {...formData, ...newItem} )}, {userName: "", password: ""})
     const [ errorMessage, setErrorMessage ] = useState(null)
     
     const doLogin = async () => {

          try {
               
               await login(formData.userName, formData.password)
               navigate("/account")

          } catch (error) {

               setErrorMessage(error)
               
          }
          
     }

     return (
        <div className="appBg">
                <div className="loginForm">
                        <h2>Login page</h2>
                        <div className="inputs">
                                <div className="input">
                                    <Input 
                                            prefix={<UserOutlined className="site-form-item-icon" />} 
                                            value={formData.userName} 
                                            onChange={(e) => setFormData({userName: e.target.value}) } 
                                            type="text"
                                            placeholder="Username"
                                    />
                                    {/* <input value={formData.userName} onChange={(e) => setFormData({userName: e.target.value}) } type="text"/> */}
                                </div>
                                <div className="input">
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    value={formData.password} 
                                    onChange={(e) => setFormData({password: e.target.value}) }
                                    type="password"
                                    placeholder="Password"
                                />
                                    {/* <input value={formData.password} onChange={(e) => setFormData({password: e.target.value}) } type="password"/> */}
                                </div>
                                <div className="button">
                                    <Button type="primary" htmlType="submit" block onClick={doLogin}>
                                            Login
                                    </Button>
                                    {/* <button onClick={doLogin}>Log in</button>                                    */}
                                </div>
                                
                                {errorMessage ?
                                <div className="error">{errorMessage}</div>
                                : null }
                                <Divider style={{ borderColor: "black"}}>or Login with</Divider>
                                <div className="socialLogin">
                                    <GithubOutlined className="socialIcon" />
                                    <GoogleOutlined className="socialIcon" />
                                    <FacebookOutlined className="socialIcon" />
                                </div>
                        </div>
                </div>
        </div>
     )
}