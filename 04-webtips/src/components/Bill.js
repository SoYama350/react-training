export default function Bill({ price, onPrice }) {
    return (
        <div>
            <p>how much was the bill ? </p>
            <input
                type="text" placeholder="bill is ?"
                value={price}
                onChange={(e) => onPrice(Number(e.target.value))}
            />
        </div>
    )
}