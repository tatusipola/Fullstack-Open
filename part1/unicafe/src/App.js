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
      <h2>give feedback</h2>
      <Button onClick={incGood} text='good'/>
      <Button onClick={incNeutral} text='neutral'/>
      <Button onClick={incBad} text='bad'/>
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

//statistics component, if no feedback display message
const Statistics = ({good, bad, neutral}) => {
  if (good+bad+neutral === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text='good' value={good} />
        <StatisticsLine text='neutral' value={neutral} />
        <StatisticsLine text='bad' value={bad} />
        <StatisticsLine text='all' value={bad+good+neutral} />
        <StatisticsLine text='average' value={((good-bad)/(bad+good+neutral)).toFixed(2)} />
        <StatisticsLine text='positive' value={((good*100)/(bad+good+neutral)).toFixed(1)+' %'} />
      </tbody>
    </table>
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

//display single statistic component
const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}


export default App