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
  
  const sum = props.course.parts.reduce((s, p) =>
     (s + p.exercises), 0 )

  return (
    <p><b>Number of exercises {sum}</b></p>
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

  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (courses.map(c =>
      <div>
        <Course course = {c} key = {c.id} />
      </div>
    )
  )
}

export default App
