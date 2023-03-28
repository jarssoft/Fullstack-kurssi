
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

export default Course