import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { createNewUser, fetchUsers } from '../store/reducers/users-slice';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const usersLogged = useSelector((state) => state.users.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ name, email, password, confirmPassword }) => {
    const newUser = {
      id: uuidv4(),
      name: name,
      email: email,
      password: password,
    };

    const checkedRegisteredUsers = usersLogged.filter(
      (item) =>
        item.name !== newUser.name &&
        item.email !== newUser.email &&
        usersLogged.password !== newUser.password
    );

    if (newUser && checkedRegisteredUsers) {
      dispatch(createNewUser(newUser));
      navigate('/contacts');
    } else {
      alert('Пользователь с такими данными уже существует...');
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: '', email: '', password: '', confirmPassword: '' });
    }
  }, [formState.isSubmitSuccessful, reset]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="w-full max-w-screen-sm p-5 shadow-md rounded-lg bg-gradient-to-tr from-gray-800 via-yellow-400 to-gray-800 shadow-gray-600"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h2 className="tracking-wider mb-5">Create Account</h2>

        <div className="flex flex-col mb-5">
          <label htmlFor="name" className="text-xs text-gray-600 mb-1">
            Name
          </label>
          <input
            id="inputName"
            name="name"
            type="text"
            {...register('name', {
              required: 'Please enter name',
              minLength: { value: 2, message: 'name is more rhan 2 chars' },
              maxLength: { value: 40, message: 'name is less than 40 chars' },
            })}
          />
          {errors.name && (
            <div className="text-xs text-red-700 mt-1">
              {errors.name.message}
            </div>
          )}
        </div>

        <div className="flex flex-col mb-5">
          <label htmlFor="email" className="text-xs text-gray-600 mb-1">
            Email
          </label>
          <input
            id="inputEmail"
            type="email"
            name="email"
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
            type="password"
            name="password"
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

        <div className="flex flex-col mb-5">
          <label
            htmlFor="confirmPassword"
            className="text-xs text-gray-600 mb-1"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            {...register('confirmPassword', {
              required: 'Please enter password',
              validate: (value) => value === getValues('password'),
              minLength: { value: 6, message: 'password is more rhan 5 chars' },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-xs text-red-700 mt-1">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-xs text-red-700 mt-1">
                Password do not match
              </div>
            )}
        </div>

        <button className="btn-primary w-1/3">Register</button>
      </form>
    </div>
  );
}
