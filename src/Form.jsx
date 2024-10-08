import React, { useState } from 'react';
import axios from 'axios';

function Form({ onAddUser }) {  // Receive the callback function as a prop
  const url = "https://the-iron-bank-backend.vercel.app/users"; 
  const [data, setData] = useState({
    date: "",
    description: "",
    category: "",
    amount: ""
  });

  function submit(e) {
    e.preventDefault();
    axios.post(url, {
      date: data.date,
      description: data.description,
      category: data.category,
      amount: parseInt(data.amount)
    })
      .then(res => {
        console.log(res.data);
        onAddUser(res.data); // Call the callback with the new data
      })
      .catch(err => {
        console.error('Error:', err);
      });
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  return (
    <div className='Odin'>
      <form onSubmit={submit}>
          <section>
                  <input onChange={handle} id='date' value={data.date} type="date"  className='btn' />
                <input onChange={handle} id='description' value={data.description} type="text" className='btn' placeholder='Description'/>
                <input onChange={handle} id='category' value={data.category} type="text" className='btn' placeholder='Category' />
              
                
                <div className="input-wrapper">
                <input onChange={handle} id='amount' value={data.amount} type="number" placeholder='Amount' className='Btn'/>
                </div>
          </section>

      <button type="submit" className='bts'>
        Add Transaction
      </button>

      </form>
    </div>
  );
}

export default Form;
