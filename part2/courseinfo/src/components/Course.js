const Course = ({course}) => {
    return(
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  
  }
  
  const Header = (props) => (
      <h1>{props.course}</h1>
    )
  
  const Total = ({parts}) => {
    const sum = parts.reduce((sum, part) =>
    sum + part.exercises, 0)
    return (
      <p>
        <b>Total of {sum} exercises</b>
      </p>
    )
  }
  
  /* const Part = (props) => (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  ) */
    
  //display all content with map method
  const Content = ({parts}) => {
    return(
      parts.map(part => <p key={part.id}>
        {part.name} {part.exercises}
        </p>)
    )
  }

  export default Course