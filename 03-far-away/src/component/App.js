import { useState } from "react";
import Logo from "./Logo";
import Form  from "./Form";
import PackingList  from "./PackingList";
import Status from "./Status";

export default function App() {
    const [items, setItems] = useState([]);


    function handleItems(item) {
    setItems(items => [...items, item]);
  }

    function handleDeleteItem(id) {
    setItems(items => items.filter((item) => item.id !== id));
  }

    function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed }
          : item
      )
    );
  }
  
  function handleClearList(items) {

    const confirmed = window.confirm("Are you sure you want to delete all items ? ")
    if(confirmed) setItems([]);
  }
  return (
    < div className="app">
      <Logo />
      <Form OnAddItems={handleItems} />
      <PackingList items={items} OnDeleteItems={handleDeleteItem} OnToggleItem={handleToggleItem} OnClearList={handleClearList} />
      <Status items={items}/>
    </div>
  );
}



