import { useState } from "react";
import  Item  from "./Item";

export default function PackingList({ items, OnDeleteItems, OnToggleItem, OnClearList }) {

  const [sort, setSort] = useState("input");

  let sortedItems;

  if (sort === "input") sortedItems = items;

  if (sort === "descreption") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  if (sort === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));


  return (
    <div className='list'>
      <ul>
        {sortedItems.map((item) => (<Item item={item} OnDeleteItems={OnDeleteItems} OnToggleItem={OnToggleItem} key={item.id} />))}
      </ul>

      <div className="actions">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="input">sort by input order</option>
          <option value="descreption">sort by descreption</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={OnClearList}>Clear List</button>
      </div>
    </div>
  );
}
