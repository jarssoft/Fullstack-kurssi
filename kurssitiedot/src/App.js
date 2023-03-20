const Header = (props) => {
  return (
    <h1>
      {props.course}
    </h1>
  )//
}

const Content = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Total = (props) => {
  let sum=0;
  for(let i=0;i<props.part.length;i++){
    sum=sum+props.part[i].exercises
  }
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {

  const course = 'Half Stack application development'

  const parts = [
    { name: 'Fundamentals of React',    exercises: 10 },
    { name: 'Using props to pass data', exercises:  7 },
    { name: 'State of a component',     exercises: 14 },
  ]

  return (
    <div>
      <Header course={course} />
      <Content part={parts[0]} />
      <Content part={parts[1]} />
      <Content part={parts[2]} />
      <Total part={parts} />
    </div>
  )

}

export default App
