import { useState } from 'react'


function App() {
  const [transactions, setTransactions] = useState([])

  function formHandler(e) {
    e.preventDefault()

    //const target = e.target;
    const { target } = e;

    const t = {
      type: target.income_type.value.toLowerCase(),
      desc: target.income_desc.value,
      amount: Number(target.income_amount.value)
    }


    if (t.type != "debit" && t.type != "credit") {
      alert("Invalid Type")
    } else if (t.desc == '' || t.amount <= 0) {
      alert("Invalid Input")
    } else {
      setTransactions([...transactions, t])
    }

    target.income_type.value = ''
    target.income_desc.value = ''
    target.income_amount.value = ''
  }

  function clearAll() {
    setTransactions([])
  }

  let bal = 0;
  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i]
    bal += t.type == 'debit' ? -t.amount : t.amount
  }

  //const tt = transactions.reduce((prev, t) => prev + (t.type == 'debit' ? -t.amount : t.amount), 0)

  return (
    <>
      <h1 className='mainBal'> Main Bal : {bal}</h1>
      <div className='formButton'>
        
        <form className='mainForm' action="" onSubmit={formHandler}>
          <div className='labelsInputs'>
            <div className='form_labels'>
              <label className='label' htmlFor="">Income Type </label><br />
              <label className='label' htmlFor="">Income Description</label><br />
              <label className='label' htmlFor="">Income Amount </label><br />
            </div>

            <div className='form_inputs'>
              <input className='input' type="text" name="income" id="income_type" placeholder='Type' /><br />
              <input className='input' type="text" name="income" id="income_desc" placeholder='Description' /><br />
              <input className='input' type="number" name="income" id="income_amount" placeholder='Amount' /><br />
            </div>
          </div>

          <button className='SubmitBtn'>Submit</button>

        </form>

        <button onClick={clearAll} className='clearBtn'>Clear</button>

        {
          transactions.map(item => (
            <div className={item.type.toLowerCase()} key={item.desc}>
              <h1>
                {item.type} <span className='pipes'>||</span>
                {item.desc} <span className='pipes'>||</span>
                ${item.amount}
              </h1>

            </div>
          ))
        }

      </div>

    </>
  )
}

export default App