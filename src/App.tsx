import "./App.css";
import Tzolkin from "./Tzolkin";

function App() {
  const date = new Date();

  // date.setDate(25);
  return (
    <>
      <h1>일기장</h1>
      <div>
        {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일
        <br />
        <Tzolkin date={date} />
      </div>
      <div>
        <textarea
          placeholder="오늘의 일기를 적어 봅시다."
          rows={10}
          cols={50}
        />
        <br />
        <button title="저장">kkkkkk</button>
      </div>
    </>
  );
}

export default App;
