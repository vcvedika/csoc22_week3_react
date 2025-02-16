import React, { useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import { no_auth_required } from '../middlewares/no_auth_required'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterForm() {

  no_auth_required()

  const { setToken } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginFieldsAreValid = (username,password) => {
    if (username == '' || password == '') {
        toast.warning('Please fill all the fields correctly.',{position: toast.POSITION.TOP_CENTER})
        return false
    }
    else return true
  }

  const login = (e) => {
    e.preventDefault()

     if (loginFieldsAreValid(username, password)) {
      toast.info('Please wait...',{position: toast.POSITION.TOP_CENTER})

       const dataForApiRequest = {
         username: username,
         password: password,
       }

       axios.post(
         'auth/login/',
         dataForApiRequest,
       )
       .then(function({data,status}) {

         setToken(data.token)
         router.push("LOGIN","/")
       })
       .catch(function(err) {
        toast.error('Invalid credentials! Try again...',{position: toast.POSITION.TOP_CENTER})
       })
     }

  }

  return (
  
    <div className='bg-grey-lighter min-h-screen flex flex-col'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full' id='box'>
          <h1 className='mb-8 text-3xl text-center'><strong><u>Login</u></strong></h1>
          <input
            type='text'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputUsername'
            id='inputUsername'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />

          <input
            type='password'
            className='block border border-grey-light w-full p-3 rounded mb-4'
            name='inputPassword'
            id='inputPassword'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />

          <button
            type='submit'
            id='loginButton'
            className='w-full text-center py-3 rounded bg-transparent text-green-500 hover:text-white hover:bg-green-500 border border-green-500 hover:border-transparent focus:outline-none my-1'
            onClick={login}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}
