import React, { useState } from "react";
import Button from "../components/button";
import { useAuth } from "../hooks/useAuth";

const Home: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    signIn({ email, password })
      .catch((error: any) => {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='flex items-center justify-center min-h-screen p-8 pb-20 gap-16 md:p-12 lg:p-20 bg-gray-100'>
      <main className='flex flex-col gap-8 items-start sm:items-center w-full md:w-3/4'>
        <div className='w-full lg:w-2/4 p-6 bg-white rounded-lg shadow-md lg:p-8'>
          <p className='text-center text-4xl mb-8 text-gray-800'>Login</p>
          <form className='flex flex-col gap-6' onSubmit={handleLogin}>
            <div className='flex flex-col'>
              <label
                htmlFor='email'
                className='text-lg font-bold text-gray-700 mb-2'
              >
                Email
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Digite seu email'
                required
              />
            </div>
            <div className='flex flex-col'>
              <label
                htmlFor='password'
                className='text-lg font-bold text-gray-700 mb-2'
              >
                Senha
              </label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Digite sua senha'
                required
              />
            </div>
            <Button
              type='submit'
              loading={loading}
              className='w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
            >
              Entrar
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
