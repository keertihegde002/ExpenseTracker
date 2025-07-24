import React, {useState, useContext} from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/Inputs/Input';
import { useNavigate, Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePicture, setProfilePicture]=useState(null);
  const [fullName, setFullName] = useState("");
  const [ email, setEmail ] = useState("");
  const [password, setPassword]=useState("");
  const [error, setError] = useState(null);

  const navigate=useNavigate();
  const { updateUser } = useContext(UserContext);

  const handleSignUp = async (e) => {
      e.preventDefault();

      let profileImageUrl="";
      if(!fullName){
        setError("Please enter your name");
        return;
      }

      if(!validateEmail(email)){
        setError("Please enter a valid email");
        return ;
      }

      if(!password){
        setError("Please enter password");
        return;
      }

      setError("");

      try {

        if(profilePicture) {
          const uploadImageResponse = await uploadImage(profilePicture);
          profileImageUrl = uploadImageResponse.imageUrl || "";
        }
        const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, {
          fullName,
          email,
          password,
          profileImageUrl
      });
      const { token, user } = response.data;
      if(token){
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message || "An error occurred during signup");
      } else {
        setError("Network error, please try again later");
      }
    }
      
  };

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
      {/* <div className='w-full max-w-md mx-auto h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'> */}
    
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below
        </p>
        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePicture} setImage={setProfilePicture} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
            value={fullName}
            label="Full Name"
            onChange={(event) => setFullName(event.target.value)}
            placeholder="John"
            type="text"
            />
             <Input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="name@example.com"
          type="text" 
          />
          <Input 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder=""
          type="password" 
          />
          </div>
          
                    {error && <p className='text-red-500 text-xs mt-2'>{error}</p>}
                    <button type='submit' className='btn-primary'>
                      Sign Up
                    </button>
                    <p className='text-[13px] text-slate-800 mt-3'>
                     Already have an account?{" "} <Link className='font-medium text-primary underline' to='/login'>Login</Link>
                    </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
