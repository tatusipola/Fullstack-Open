
import Course from './components/Course'

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

  return (
    <>
      {courses.map(course => 
          <Course key={course.id} course={course} />)}
    </>
  )
}

/* const Course = ({course}) => {
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

  
//display all content with map method
const Content = ({parts}) => {
  return(
    parts.map(part => <p key={part.id}>
      {part.name} {part.exercises}
      </p>)
  )
} */



export default App