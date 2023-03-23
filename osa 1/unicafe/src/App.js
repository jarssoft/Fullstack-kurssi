import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {

    const all=good+neutral+bad;

    if(all>0){
        return(           
            <ul>
              <li>good {good}</li>
              <li>neutral {neutral}</li>
              <li>bad {bad}</li>
              <li>all {all}</li>
              <li>average {(good-bad)/all}</li>
              <li>positive {good/all*100} %</li>
            </ul>
        )//
    }else{
        return(
            <p>No feedback given</p>
        )
    }
}//

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <>
    <h1>give feedback</h1>
    <div>
      <button onClick={() => setGood(good+1)}>
        Good
      </button>
      <button onClick={() => setNeutral(neutral+1)}>
        Neutral
      </button>
      <button onClick={() => setBad(bad+1)}>
        Bad
      </button>
    </div>
    <h1>statistic</h1>
    <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
