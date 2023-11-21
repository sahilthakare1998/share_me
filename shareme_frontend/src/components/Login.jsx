import React from 'react';
import GoogleLogin from  'react-google-login';
import {useNavigation, Navigate, useNavigate} from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc';
import shareVideo from  '../assets/share.mp4';
import logo from  '../assets/logowhite.png';
import { client } from '../container/client';
import { v4 as uuidv4 } from 'uuid';
import avatar from  '../assets/avatar.png';


const Login = () => {
    const navigate = useNavigate();
    const userId = uuidv4();
    const responseGoogle = (response) =>{
        
        let user = {name:`user-${userId}`, googleId:userId, imageUrl: "https://api.slingacademy.com/public/sample-photos/1.jpeg"};
        localStorage.setItem('user', JSON.stringify(user))
        
        const {name,googleId,imageUrl} = user;
        
        const doc={
            _id:googleId,
            _type:'user',
            userName:name,
            image:imageUrl
        }

        client.createIfNotExists(doc).then(()=>{
            navigate('/',{replace:true})
        })

    }

   
    return (
        <div className ="flex justify-start item-center flex-col h-screen">
           <div className="relative w-full h-full">
            <video src={shareVideo}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className="w-full h-full object-cover"
            />
  

           <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
            <div className='p-5'>
                <img src={logo} width="130px" alt="logo"/>
            </div>
            
            <div className="shadow-2x1">
                <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                render={(renderProps)=>(
                    <button type="button"
                    className="bg-mainColor flex justify-center iems-center p-3 rounded-lg cursor-pointer outline-none"
                    onClick={responseGoogle}
                    disabled={renderProps.disabled}
                    >
                        <FcGoogle className="mr-4" />
                    Sign-in with goggle
                    </button>
                )}
                cookiePolicy="single_host_origin"
                />
            </div>
           </div>
           </div>
        </div>
    )
}

export default Login
