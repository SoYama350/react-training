import Bill from "./Bill";
import Tip from "./Tip";
import { useState } from "react";



export default function App() {
  const [bill, setBill] = useState(0);
  const [tip1, setTip1] = useState(0);
  const [tip2, setTip2] = useState(0);

  const tipIS = bill * ((tip1 + tip2) / 2 / 100);

  return (
    <div className="App">
      <Bill price={bill} onPrice={setBill} />
      <Tip price={bill} tip={tip1} onTip={setTip1} />
      <Tip price={bill} tip={tip2} onTip={setTip2} />
      
      <h3>bill is {bill} the tip is {tipIS} total is {bill + tipIS}</h3>
      <button onClick={() => { setBill(0); setTip1(0); setTip2(0); }}>reset</button>
    </div>
  );
}

