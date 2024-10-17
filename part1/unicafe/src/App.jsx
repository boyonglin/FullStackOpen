import { useState } from 'react'
import './App.css'

const Header = ({ name }) => (
    <h1>{name}</h1>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (
  <tr>
    <td style={{textAlign: 'left'}}>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = (props) => {
  const {good, neutral, bad} = props.feedback

  const all = good + neutral + bad
  const positive = ((good - bad) / all).toFixed(2)

  const feedbacks = [
    {
      text: 'Good',
      value: good
    },
    {
      text: 'Neutral',
      value: neutral
    },
    {
      text: 'Bad',
      value: bad
    },
    {
      text: 'All',
      value: all
    },
    {
      text: 'Positive',
      value: positive
    }
  ]


  if (all == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <table style={{ display: 'flex', justifyContent: 'center' }}>
        <tbody>
          {feedbacks.map((feedback) => (
            <StatisticLine key={feedback.text} text={feedback.text} value={feedback.value} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const feedbacks = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  return (
    <div>
      <Header name={"Give feedback"} />
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <Header name={"Statistics"} />
      <Statistics feedback={feedbacks} />
    </div>
  )
}

export default App
