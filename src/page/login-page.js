import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, loginUser } from '../store/reducers/users-slice';

export default function LoginPage() {
  const usersLogged = useSelector((state) => state.users.users);
  const userLog = useSelector((state) => state.users.userLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (userLog) {
      const checkingRegisteredUsers = usersLogged.filter(
        (item) =>
          item.email === userLog.email && item.password === userLog.password
      );
      // eslint-disable-next-line no-lone-blocks
      {
        checkingRegisteredUsers.length > 0
          ? navigate('/contacts')
          : navigate('/register');
      }
    }
  }, [navigate, userLog, usersLogged]);

  const {
    handleSubmit,
    register,
    reset,
    formState,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ email, password }) => {
    const login = {
      email: email,
      password: password,
    };
    dispatch(loginUser(login));
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ email: '', password: '' });
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="w-full max-w-screen-sm p-5 shadow-md rounded-lg bg-gradient-to-tr from-gray-800 via-yellow-400 to-gray-800 shadow-gray-600"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h2 className="tracking-wider mb-5">Authorization</h2>

        <div className="flex flex-col mb-5">
          <label htmlFor="email" className="text-xs text-gray-600 mb-1">
            Email
          </label>
          <input
            id="inputEmail"
            name="email"
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
          />
          {errors.email && (
            <div className="text-xs text-red-700 mt-1">
              {errors.email.message}
            </div>
          )}
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="password" className="text-xs text-gray-600 mb-1">
            Password
          </label>
          <input
            id="inputPassword"
            name="password"
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: { value: 6, message: 'password is more rhan 5 chars' },
            })}
          />
          {errors.password && (
            <div className="text-xs text-red-700 mt-1">
              {errors.password.message}
            </div>
          )}
        </div>
        <div className="text-sm text-gray-300 my-5">
          Don&apos;t have an account? &nbsp;
          <a
            href="/register"
            className="font-medium hover:text-gray-600 focus:text-gray-700 transition-all"
          >
            Register
          </a>
        </div>
        <button className="btn-primary w-1/3">Login</button>
      </form>
    </div>
  );
}
