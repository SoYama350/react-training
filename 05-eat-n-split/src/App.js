import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


function Button({children , onClick}) {
  return <button className="button" onClick={onClick}>
    {children}
  </button>;
}

export default function App() {

  const [showFriendForm, setShowFriendForm] = useState(false);
  const [freinds, setFreinds] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleAddBtn() {
    setShowFriendForm((show) => !show);
  }

    function handleAddFriend(freind) {
      setFreinds((freinds) => [...freinds, freind]);
      setShowFriendForm(false);
      
    }
  
  function handleSelection(freind) {
    setSelectedFriend(cur => (cur?.id === freind.id ? null : freind));
    setShowFriendForm(false);
    }

  function handleSplitBill(value) {
    setFreinds((friends) => friends.map((friend) =>
      friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + value } : friend));
      setSelectedFriend(null);

  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList freinds={freinds} onSelection={handleSelection} selectedFriend={selectedFriend} />
        {showFriendForm && <FormAddFriend onAddFriend={handleAddFriend} /> }
        {<Button onClick={handleAddBtn}>{showFriendForm ? "close" : "Add Friend" }</Button>}
      </div>
      {selectedFriend && <FormSpiltBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />}

    </div>
  )
}


function FriendList({freinds , onSelection , selectedFriend}) {
  return (
    <ul>
      {freinds.map((friend) =>
        <Freind friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend} />
      )}
    </ul>
  );
}

function Freind({ friend, onSelection, selectedFriend }) {
  
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.id} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && <p className="red"> You own {friend.name} {Math.abs(friend.balance)}</p>}
      {friend.balance > 0 && <p className="green">{friend.name} owns you {Math.abs(friend.balance)}</p>}
      {friend.balance === 0 && <p> You and {friend.name} are even</p>}
      <Button onClick={() => onSelection(friend)}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  );
}



function FormAddFriend({onAddFriend}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image : `${image}?=${id}`,
      balance: 0,
    }; 

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
    }
  

  return <form className="form-add-friend" onSubmit={handleSubmit}>
    <label>🧍‍♂️friend name</label>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    <label>🖼image URL</label>
    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
    <Button>add</Button>
  </form>
}

function FormSpiltBill({ selectedFriend , onSplitBill}) {
  const [bill, setBill] = useState("");
  const [userExpen, setUserExpen] = useState("");
  const paidByFriend = bill ? bill - userExpen : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmitSplit(e) {
    e.preventDefault();

    if (!bill || !userExpen) return; 
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -userExpen);

    }

  return (
    <form className="form-split-bill" onSubmit={handleSubmitSplit}>
      <h2>split a bill with {selectedFriend.name}</h2>

      <label>💵 Bill value</label>
      <input type="text" value={bill} onChange={(e) => setBill(Number(e.target.value))} />
      <label>🧍‍♂️ Your expense</label>
      <input type="text"
        value={userExpen}
        onChange={(e) =>
          setUserExpen(
            Number(e.target.value) > bill ? userExpen :
              Number(e.target.value)
          )} />
      <label>🧍 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />
      <label>🧍🧍‍♂️ who is paying the bill</label>
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}