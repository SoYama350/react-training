import { useState } from 'react';
const initialGoals = [{
  id: 15515131,
  name: "catch",
  check: false,
},
{
  id: 4464,
  name: "hit the gym",
  check: false,
},
{
  id: 565555,
  name: "read a book ",
  check: true,
},
{
  id: 59952,
  name: "quit manga",
  check: true,
},
{
  id: 6511,
  name: "analize your week",
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
      <TableTest goal={inputGoal} />
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
      <GoalList goals={inputGoal} />
    </div>
  )
}
  
  
function Task({ goal }) {
  const [check, setCheck] = useState(false);

  function handleCheckClick() {
    setCheck(!check);
  }


  function handleCheckBox(e) {
    setCheck(e.target.checked);
  }
  return (
    <li>
    <div>
      <h2>{goal}</h2><input type='checkbox' checked={check} onChange={handleCheckBox} />
      <p>have you done this today ? </p>
      <button onClick={handleCheckClick}>{check ? "close" : "done"}</button>

  
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

function AddedTh({goal}) {
  return (
    <>
      {goal.map((go) => 
        <th key={go.id} scope="col"> {go.name} </th>)}
    </>
  )  
}
function TableTest({goal}) {
  return (
<table>
  <thead>
    <tr className='days'>
      <th></th>
      <AddedTh goal={goal} />
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">sat</th>
      <td>Data 1A</td>
      <td>Data 1B</td>
      <td>Data 1C</td>
    </tr>
    <tr>
      <th scope="row">sun</th>
      <td>Data 2A</td>
      <td>Data 2B</td>
      <td>Data 2C</td>
    </tr>
    <tr>
      <th scope="row">mon</th>
      <td>Data 3A</td>
      <td>Data 3B</td>
      <td>Data 3C</td>
    </tr>
    <tr>
      <th scope="row">tus</th>
      <td>Data 1A</td>
      <td>Data 1B</td>
      <td>Data 1C</td>
    </tr>
    <tr>
      <th scope="row">wed</th>
      <td>Data 2A</td>
      <td>Data 2B</td>
      <td>Data 2C</td>
    </tr>
    <tr>
      <th scope="row">thu</th>
      <td>Data 3A</td>
      <td>Data 3B</td>
      <td>Data 3C</td>
    </tr>
    <tr>
      <th scope="row">fri</th>
      <td>Data 3A</td>
      <td>Data 3B</td>
      <td>Data 3C</td>
    </tr>
  </tbody>
</table>
  )
}



//next look into how to add the <td> for every day to tasks and how to change the checkbox and table style 