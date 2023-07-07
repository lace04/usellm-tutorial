import { useState } from 'react';
import useLLM from 'usellm';
import { PulseLoader } from 'react-spinners';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const llm = useLLM({
    serviceUrl: 'https://usellm.org/api/llm',
  });

  const handleSend = async () => {
    setLoading(true);
    const data = await llm.chat({
      messages: [
        {
          role: 'user',
          content:
            inputValue || 'Dame una lista de nombre de mujeres en español',
        },
      ],
      stream: true,
      onStream: (data) => {
        setMessages(data.message.content);
        setLoading(false);
      },
    });
  };

  return (
    <div className='container mx-auto justify-center items-center'>
      <div className='flex flex-col items-center'>
        <a
          href='https://usellm.org/'
          className='text-4xl mt-8 mb-8 flex p-4 rounded-lg hover:bg-zinc-900'
        >
          useLLM <p className='text-sm self-end'>docs</p>
        </a>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
          className='border-2 border-gray-500 p-2 rounded-md w-full mb-6 text-black'
        />
        <div className='mb-4'>{loading && <PulseLoader color='gray' />}</div>

        <button
          onClick={handleSend}
          className='bg-blue-500 text-white p-2 rounded-md block w-28 hover:bg-blue-400 hover:font-semibold'
        >
          Send
        </button>

        <div
          className='
            whitespace-pre-wrap
            border-2 border-gray-500
            p-2
            rounded-md
            w-full
            mt-6
            h-96
            overflow-y-scroll
            flex
          '
        >
          {messages}
        </div>
      </div>
    </div>
  );
}

export default App;
