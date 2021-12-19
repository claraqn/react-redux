import React, { useState } from 'react';

// React.memo는 리렌더링을 방지해줌
// 만약 컴포넌트가 같은 props를 받을 때 같은 결과를 렌더링한다면 React.memo를 사용하여 불필요한 컴포넌트 렌더링을 방지할 수 있다. 즉, 컴포넌트에 같은 props가 들어온다면 리액트는 컴포넌트 렌더링 과정을 스킵하고 마지막에 렌더링된 결과를 재사용한다.
// React.memo는 오직 props가 변경됐는지 아닌지만 체크한다.
const TodoItem = React.memo(function TodoItem({ todo, onToggle }) {
  return (
    <li
      style={{ textDecoration: todo.done ? 'line-through' : 'none' }}
      onClick={() => onToggle(todo.id)}
    >
      {todo.text}
    </li>
  );
});

const TodoList = React.memo(function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
});

function Todos({ todos, onCreate, onToggle }) {
  const [text, setText] = useState('');
  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    onCreate(text);
    setText('');
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={text}
          placeholder="할일을 입력하세요"
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <TodoList todos={todos} onToggle={onToggle} />
    </div>
  );
}

export default Todos;
