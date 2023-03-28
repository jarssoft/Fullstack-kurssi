const Header = (props) => {
  return (
    <h1>
      {props.course.name}
    </h1>
  )//
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({course}) => {
  return (course.parts.map(note =>
    <Part key={note.id} part={note} />
  ))
}

const Total = (props) => {
  let sum=0;
  for(let i=0; i<props.course.parts.length; i++){
    sum=sum+props.course.parts[i].exercises
  }
  return (
    <p>Number of exercises {sum}</p>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
