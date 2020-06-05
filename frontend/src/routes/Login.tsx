import React, { FunctionComponent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { useLogin } from '../modules/LoginContext';

interface ILoginForm {
  email: string;
  password: string;
}

const Login: FunctionComponent = () => {
  const { user, login } = useLogin();
  const history = useHistory();
  const { register, handleSubmit, watch, errors, setError } = useForm<
    ILoginForm
  >();

  const onSubmit = async (values: ILoginForm) => {
    const user = await login(values.email, values.password);
    if (Object.prototype.hasOwnProperty.call(user, 'error')) {
      setError('password', 'wrongPassword');
    }
  };

  useEffect(() => {
    if (user !== undefined) {
      history.push('/');
    }
  }, [user]);

  return (
    <div className={'container mx-auto px-4'}>
      <section className="py-12 px-4 text-center">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-5xl leading-tight font-heading">
            <a href="https://tailwindcss.com/">Ølbowling</a>
          </h1>
          <h3 className="mt-6 mb-8 text-gray-500 leading-relaxed">
            Dommer login
          </h3>
        </div>
      </section>
      <section className="py-8">
        <div className="w-full max-w-sm mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                name={'email'}
                className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
                type="text"
                placeholder="Brugernavn"
                ref={register({ required: true })}
              />
              {errors.email && (
                <span className={'text-red-600 text-sm'}>
                  This field is required
                </span>
              )}
            </div>
            <div className="mb-4">
              <input
                name={'password'}
                className="appearance-none block w-full py-3 px-4 leading-tight text-gray-700 bg-gray-200 focus:bg-white border border-gray-200 focus:border-gray-500 rounded focus:outline-none"
                type="password"
                placeholder="Password"
                ref={register({ required: true })}
              />
              {errors.password && (
                <span className={'text-red-600 text-sm'}>
                  {errors.password?.type === 'required' &&
                    'This field is required'}
                  {errors.password?.type === 'wrongPassword' &&
                    'Wrong username/password'}
                </span>
              )}
            </div>
            <div className="mb-4">
              <button className="inline-block w-full py-4 px-8 leading-none text-white bg-indigo-500 hover:bg-indigo-600 rounded shadow">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
