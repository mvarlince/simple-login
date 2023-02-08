import  {Button, Input, Form} from 'antd'
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { initializeApp } from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyBNhIorA4fxb_jeyXZu9XWcKVT8T1YV-VM",
    authDomain: "simple-login-vm.firebaseapp.com",
    projectId: "simple-login-vm",
    storageBucket: "simple-login-vm.appspot.com",
    messagingSenderId: "654798392190",
    appId: "1:654798392190:web:cd622594bdeb3d1a9b412f"
  };
  
export default function Login({setUser, setIsUser}){
    const loginWithGoogle = async () => {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider()
        const _user = await signInWithPopup(auth, provider)
            .catch()
        setUser(_user.user)
    }

    const handleSubmit = async ({email, password}) => {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app)
        const _user = await signInWithEmailAndPassword(auth, email, password)
            .catch(alert)
        setUser(_user.user)
    }

    return (
        <section>
            <h1>Login</h1>
            <Form onFinish={handleSubmit} labelCol={{span:8}} wrapperCol={{span: 16}}>
                <Form.Item label="Email" name="email">
                    <Input type="email"/>
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input.Password/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType='submit'> Login </Button>
                </Form.Item>
            </Form>

            <Button onClick={loginWithGoogle}>Login with Google</Button>
            <p>NOT A USER? <Button onClick={()=> setIsUser(false)}>Sign Up</Button></p>
        </section>
    )
}