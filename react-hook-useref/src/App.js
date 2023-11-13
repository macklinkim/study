import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [renderer, setRenderer] = useState(0);
  const countRef = useRef(0);
  const inputRef = useRef();
  let countVar = 0;
  /**useRef는 랜더링을 강제하지 않지만 내부적으로 값 연산을 계속하고 있다.
   * 값이 자주 변하는 변수를 숨겨서 사용할때 적합하다.
   * useState변수가 변할때 같이 랜더링된다.
   * component 의 onClick에 함수 쓰고 {}안에 count++ 형태는 안먹힌다.
   * renderer 변수를 만들어 랜더링 전용으로 만들 수 있다.
   * let 타입 변수는 랜더링 한번 될때마다 다시 선언, 할당되는 변수이기 떄문에 0이 뜬다.
   * useEffect안에 랜더링을 하는 함수(useState등)를 넣지마라, 무한루프 빠짐.
   * 이럴때 useRef변수 사용하면 좋다.
   */
  //초기 focus 줄때Ref쓰는 방법
  useEffect(()=>{
    inputRef.current.focus();
  },[]);
  return (
    <div className="App">
      <h3>React Hook 연습장</h3>
      <p>Do Render count: {renderer}</p>
      <button onClick={e=>{setRenderer(renderer+1); console.log(`count(State): ${count},  count(Ref): ${countRef.current}, countVar(let): ${countVar}, renderCount : ${renderer}`)}}>Do Render</button>
      <br/>
      <p> state : {count}</p>
      <button onClick={e=>{setCount(count+1);}} > plus 1 at useState variable</button>
      <p> state : {countRef.current}</p>
      <button onClick={e=>{countRef.current = countRef.current+1;
      console.log('ref:', countRef.current)}} > plus 1 at useRef variable</button>
      <p>Var : {countVar}</p>
      <button onClick={e=>{countVar = countVar+1; console.log(countVar)}}> plus 1 at let Var</button>
      <p> auto focus by useRef</p>
      <input ref={inputRef} type="text" placeholder='username'/>
      <button onClick={e=>{
        alert(`welcome! : ${inputRef.current.value}`);
        inputRef.current.focus();
        //invalid ID, password 이런거 경고할때 사용하면 편할듯
      }}>Login</button>
    </div>
  );
}

export default App;
