import { useState } from 'react'

const StatitisticLine = ({text, value}) => {
    return (<tr><td>{text}</td><td>{value}</td></tr>)
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {

    const all=good+neutral+bad;

    if(all>0){
        return(           
          <table>
            <tbody>
              <StatitisticLine text={"good"} value={good} />
              <StatitisticLine text={"neutral"} value={neutral} />
              <StatitisticLine text={"bad"} value={bad} />
              <StatitisticLine text={"all"} value={all} />
              <StatitisticLine text={"average"} value={(good-bad)/all} />
              <StatitisticLine text={"positive"} value={good/all*100 + "%"} />
            </tbody>
          </table>
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
      <Button handleClick={() => setGood(good+1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="Neutral" />
      <Button handleClick={() => setBad(bad+1)} text="Bad" />
    </div>
    <h1>statistic</h1>
    <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
