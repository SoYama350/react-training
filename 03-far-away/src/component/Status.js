export default function Status({ items }) {

  if (!items.length)
    return (
      <p className="stats">
        <em>start adding some items to your packing list 📃</em>
      </p>
    );

  const itemLength = items.length;
  const itemPacked = items.filter((item) => item.packed).length;
  const packedPercentage = Math.round(itemPacked / itemLength * 100);

  return (
    <footer className="stats" itemLen>

      {packedPercentage === 100 ? "you got everything ready to go ✈" :
        `you have ${itemLength} items on your list , and you have already packed ${itemPacked} item (${packedPercentage}%)`}
    </footer>
  );
}
