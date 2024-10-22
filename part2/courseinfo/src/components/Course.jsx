import React from 'react'

const Header = ({ name }) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.name}: {props.exercises}
    </p>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <p>Number of exercises: {total}</p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course