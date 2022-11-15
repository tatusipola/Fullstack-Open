import { useState } from 'react'



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  //functions for onclick event handler
  const nextAnecdote = () => setSelected(getRndInteger(0, anecdotes.length))
  const addVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    return (
      setVotes(copy)
    )
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <DisplayVotes votes={votes[selected]} />
      <Button onClick={addVote} text='vote' />
      <Button onClick={nextAnecdote} text='next anecdote' />
      <h2>Anecdote with the most votes</h2>
      <MaxVotes votes={votes} anecdotes={anecdotes}/>
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

//max votes component
const MaxVotes = ({votes, anecdotes}) => {
  const max = Math.max(...votes)
  const index = votes.indexOf(max)
  return (
    <div>
      <p>{anecdotes[index]}</p>
      has {max} votes
    </div>
  )
}

//display votes component
const DisplayVotes = ({votes}) => {
  return (
    <div>
      has {votes} votes
    </div>
  )
}

//function for getting a random int between min and max (max excluded)
const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) ) + min;
}

export default App