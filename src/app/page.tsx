'use client';

import useLLM from 'usellm';
import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { ChevronRight } from 'lucide-react';

function HomePage() {
  const llm = useLLM({
    serviceUrl: 'https://usellm.org/api/llm',
  });
  const [location, setLocation] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState('');

  async function handleClick() {
    try {
      await llm.chat({
        messages: [
          {
            role: 'user',
            content: inputValue || 'Dame una lista de nombres de mujeres',
          },
        ],
        stream: true,
        onStream: ({ message }) => setResult(message.content),
      });
    } catch (error) {
      console.error('Something went wrong!', error);
    }
  }
  return (
    <>
      <Navbar />
      <div className='flex flex-col justify-center items-center mx-auto max-w-4xl'>
        <div className='flex pt-20 pb-10 w-full justify-center items-center'>
          <input
            placeholder='Type something...'
            className='w-full rounded border p-2 mr-2 text-black dark:text-white dark:bg-[#1a1919] border-zinc-300'
            type='text'
            autoFocus
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleClick();
              }
            }}
          />
          <button
            className='flex justify-center items-center rounded border border-black dark:border-white p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition duration-500'
            onClick={handleClick}
          >
            Submit
            <ChevronRight className='w-4 h-4 ml-2' />
          </button>
        </div>
        <div
          className={`whitespace-pre-wrap border-2 border-gray-500 p-2 rounded-md w-full ${
            result ? 'min-h-96' : 'h-96'
          } flex mb-6`}
        >
          {result}
        </div>
      </div>
    </>
  );
}

export default HomePage;
