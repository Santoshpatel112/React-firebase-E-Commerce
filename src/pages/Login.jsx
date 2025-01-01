import { Link } from 'react-router-dom'
import { useContext } from 'react'
import myContext from '../context/data/mycontext'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/Firebase'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
function Login() {
    const navigate = useNavigate();
   
    const context = useContext(myContext);
    const {loading, setLoading} = context;
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const login= async()=>{
        setLoading(true);
        try {
            setLoading(true);
            const res=await signInWithEmailAndPassword(auth,email,password);
            console.log(res);
            navigate('/');
            localStorage.setItem('user',JSON.stringify(res.user));
            toast.success("Login Successfully",{
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false);
            
            
        } catch (error) {
            setLoading(false);
            toast.error(error.message,{
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        setLoading(false);
    }

    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input type="email"
                    value={email}
                        onChange={(e) => setemail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                    value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        name='password'
                        type="password"
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        onClick={login}
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login