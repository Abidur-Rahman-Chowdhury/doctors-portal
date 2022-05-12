import React from 'react';
import auth from '../../firebase.init';
import { useForm } from 'react-hook-form';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Loading from '../Shared/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [
    signInWithEmailAndPassword,
    user1,
    loading1,
    error1,
  ] = useSignInWithEmailAndPassword(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    console.log(data.email);
    signInWithEmailAndPassword(data.email, data.password);
  };
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";
  let signInError;

  if ( loading || loading1) {
     return <Loading></Loading>
  }
  if (error1 || error) {
    signInError = <p className='text-red-500'>{ error1?.message || error?.message }</p>
  }
  
  if (user || user1) {
    navigate(from, { replace: true });
    console.log(user);
  }
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full max-w-xs"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is required'
                  },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: 'Provide a valid Email' // JS only: <p>error message</p> TS only support string
                    }
                  })}
              />
              <label className="label">
                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{ errors.email.message}</span>}
                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{ errors.email.message}</span>}
               
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Your Password"
                className="input input-bordered w-full max-w-xs"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required'
                  },
                    minLength: {
                      value: 6,
                      message: 'Must be 6 character or longer' // JS only: <p>error message</p> TS only support string
                    }
                  })}
              />
              <label className="label">
                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{ errors.password.message}</span>}
                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{ errors.password.message}</span>}
               
              </label>
            </div>

           {signInError}
            <input className='btn w-full max-w-xs uppercase text-white' type="submit" value='Login'  />
          </form>
          <p><small>New to Doctors Portal <Link className='text-secondary' to='/signup'>Create New Account</Link></small></p>
          <div className="divider">OR</div>
          <button
            className="btn btn-outline"
            onClick={() => signInWithGoogle()}
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
