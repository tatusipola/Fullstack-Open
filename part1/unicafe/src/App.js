import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  //handle incrementing states
  const incGood = () => setGood(good + 1)
  const incNeutral = () => setNeutral(neutral + 1)
  const incBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={incGood} text='good'/>
      <Button onClick={incNeutral} text='neutral'/>
      <Button onClick={incBad} text='bad'/>
      <h2>statistics</h2>
      <Display counter={good} />
      <Display counter={neutral} />
      <Display counter={bad} />
      <Display counter={bad+good+neutral} />
      <Display counter={(good-bad)/(bad+good+neutral)} />
      <Displayp counter={(good)/(bad+good+neutral)} />
    </div>
  )
}

//button component
const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

//display component
const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}
//display percentage component
const Displayp = ({counter}) => {
  return (
    <div>{counter*100}%</div>
  )
}

export default App