import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="w-32 h-32 hover:drop-shadow-[0_0_2em_#646cffaa] transition-all" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-32 h-32 hover:drop-shadow-[0_0_2em_#61dafbaa] transition-all animate-[spin_20s_linear_infinite]" alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Vite + React + Tailwind
      </h1>
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 text-center">
        <button 
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors mb-4"
        >
          count is {count}
        </button>
        <p className="text-gray-400">
          Edit <code className="text-blue-400 font-mono">src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="mt-8 text-gray-500">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
