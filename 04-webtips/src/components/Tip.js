export default function Tip({ tip, onTip}) {
        

    return (
        <div>
        <p>how did you like the service ? </p>
        <select value={tip} onChange={(e) => onTip(Number(e.target.value))} >
            <option value="0">very bad (0%)</option>
            <option value="5">not bad (5%)</option>
            <option value="10">Good (10%)</option>
            <option value="20">great (20%)</option>
        </select>
        </div>
    )
}