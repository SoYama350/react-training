// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useState , useEffect } from "react";

export default function App() {
  const [input, setInput] = useState(10);
  const [curr1, setCurr1] = useState("EUR");
  const [curr2, setCurr2] = useState("USD");
  const [output, setOutput] = useState(0);

  
  useEffect(function () {
    async function fetcher() {
      try {
        const res = await fetch(`https://api.frankfurter.app/latest?amount=${input}&from=${curr1}&to=${curr2}`);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();

        const convertedAmount = data.rates && data.rates[curr2]
          ? Number(data.rates[curr2]).toFixed(2)
          : '0.00';
        setOutput(convertedAmount);
      } catch (err) {
        console.log(err);
        setOutput('Error');
      }
    }
    fetcher();
  }, [curr1, curr2, input]);
return (
    <div>
    <input type="text" value={input} onChange={(e) => setInput(Number(e.target.value) || 0)} />
    <select value={curr1} onChange={(e) => setCurr1(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
    </select>
    <select value={curr2} onChange={(e) => setCurr2(e.target.value)}>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
    </select>
    <p>OUTPUT Is {output}</p>
    </div>
);
}
