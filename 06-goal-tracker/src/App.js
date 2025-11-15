import { useState } from 'react';
const initialGoals = [{
  id: 15515131,
  name: "catch",
  check: false,
},
{
  id: 4464,
  name: "dasda",
  check: false,
},
{
  id: 565555,
  name: "sdasdas",
  check: true,
},
{
  id: 59952,
  name: "caasdasdtch",
  check: true,
},
{
  id: 6511,
  name: "asdasdac",
  check: false,
}];
export default function App() {
  const [inputGoal, setInputGoal] = useState(initialGoals); // lefting state from GoalForm


  function handleAddGoal(goal) {
    setInputGoal((goals) => [...goals, goal]);
  }



  return (
    <div className="App">
      <MainBody inputGoal={inputGoal} />
      <FormAddGoal onAddGoal={handleAddGoal} />
    </div>
  );
}


    function GoalList({goals}) {
    return (
      <ul className='goals'>
        {goals.map((goal) =>
          <Task key={goal.id} goal={goal.name} />)}
      </ul>
    )
  }
// this func is the main body for the tracking app
function MainBody({inputGoal}) {

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
      <GoalList goals={inputGoal} />
      
    </div>
  )
}
  
  
function Task({ goal }) {
  const [check, setCheck] = useState(false);

  return (
    <li>
    <div>
      <h2>{goal}</h2><input type='checkbox' value={check} onChange={(e) => setCheck(e.target.value)}/>
      <p>have you done this today ? </p>
      <button onClick={() => setCheck(true)}>close</button>

  
    </div>
    </li>
  )
}

function FormAddGoal({ onAddGoal }) {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    
    e.preventDefault();

    let id = crypto.randomUUID();
    const newGoal = {
      id,
      name,
    };

    onAddGoal(newGoal);

    setName("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Enter Your Goal : </label>
      <input type='text' placeholder='hit the gym' value={name} onChange={(e) => setName(e.target.value)} />
      <button>Add</button>
    </form>
  )
}


