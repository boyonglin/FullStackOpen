import './App.css'

const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  )
}

const Content = (props) => {
  const parts = props.course.parts
  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} name={part.name} exercises={part.exercises} />
      ))}
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name}: {props.exercises}
    </p>
  )
}

const Total = (props) => {
  const parts = props.course.parts
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises
  return (
    <>
      <p>Number of exercises: {total}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
