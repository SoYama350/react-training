import './App.css';

function App() {
  return (
    <div className="App">
      <MainBody />
    </div>
  );
}

export default App;



// this func is the main body for the tracking app
function MainBody() {
  return (
    <div>
      <ul className='days'>
        <li>sat</li>
        <li>sun</li>
        <li>mon</li>
        <li>tus</li>
        <li>wed</li>
        <li>thu</li>
        <li>fri</li>
      </ul>
      <ul className='goals'>
        <AddingGoals />
      </ul>
    </div>
  )
}

// this func is to convert the inputed goal to a jsx
function AddingGoals() {
  return (
    <li>{inputGoals}</li>
  )
}

// this func is to get the goal from the user to add it to the tracker
function GoalForm() {
  return (
    
  )
}

// this func is to toggle the goal (done or not)
function GoalToggle() {
  return (
    
  )
}