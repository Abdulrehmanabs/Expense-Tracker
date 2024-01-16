import "./App.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function App() {
  let { register, handleSubmit } = useForm();
  let [arr, setArr] = useState([]);
  function saveData(data) {
    data.num = +data.price;
    arr.unshift(data);
    setArr([...arr]);
    console.log(arr);
  }
  //   function delItem(index) {
  //     arr.splice(index, 1);
  //     setArr([...arr]);
  //     console.log(arr);
  //   }
  let plus = 0;
  let minus = 0;
  arr.forEach((item) => {
    if (item.num >= 0) {
      plus = plus + item.num;
    } else {
      minus = minus + item.num;
    }
  });
  return (
    <div className="body-Container">
      <h1>Expense Tracker by ABS</h1>
      <h2 className="current-balance">
        Current Balance
        <h1>${plus + minus}.00</h1>
      </h2>
      <div className="bal-dif-container">
        <h2>
          Income
          <h3 style={{ color: "#b6960a" }}>{plus}.00</h3>
        </h2>
        <div style={{ border: "1px solid #dedede" }}></div>
        <h2>
          Expenses
          <h3 style={{ color: "#2da3ad" }}>{minus}.00</h3>
        </h2>
      </div>
      {/* Transaction History */}
      <h2 className="tran-history">Transaction History</h2>
      <ul>
        {!arr[0] ? (
          <h4 style={{ color: "red" }}>
            (-.-) (-.-) (-.-) (-.-) (-.-) (_-.-_) (-.-) (-.-) (-.-) (-.-) (-.-)
          </h4>
        ) : null}
        {arr.map((item, index) => {
          if (item.num >= 0) {
            return (
              <li className="plus">
                <button
                  onClick={() => {
                    arr.splice(index, 1);
                    setArr([...arr]);
                  }}
                >
                  X
                </button>
                {item.name}
                <span>${item.price} </span>
              </li>
            );
          } else {
            return (
              <li className="minus">
                <button
                  onClick={() => {
                    arr.splice(index, 1);
                    setArr([...arr]);
                  }}
                >
                  X
                </button>
                {item.name}
                <span>${item.price} </span>
              </li>
            );
          }
        })}
      </ul>
      {/* Add New Transaction */}
      <h2 className="tran-history">Add New Transaction</h2>
      <form className="form" onSubmit={handleSubmit(saveData)}>
        <div>Description</div>
        <input
          {...register("name", { required: true, minLength: 3 })}
          type="text"
          placeholder="Detail of Transaction"
        />
        <div>Transaction Amount</div>
        <input
          {...register("price", { required: true })}
          type="number"
          placeholder="Dollar Value of Transaction"
        />
        <button>Add Transaction</button>
      </form>
    </div>
  );
}
