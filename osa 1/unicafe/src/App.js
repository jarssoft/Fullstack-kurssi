import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
    <h1>gife feedback</h1>
    <div>
      <button onClick={()=> setGood(good+1)}>
        Good
      </button>
      <button onClick={()=> setNeutral(neutral+1)}>
        Neutral
      </button>
      <button onClick={()=> setBad(bad+1)}>
        Bad
      </button>
    </div>
    <h1>statistic</h1>
      <ul>
        <li>good {good}</li>
        <li>neutral {neutral}</li>
        <li>bad {bad}</li>
      </ul>
    </>
  )
}

export default App
