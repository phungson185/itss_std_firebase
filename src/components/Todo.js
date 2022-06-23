import React, { useState } from 'react';

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import { useFirebaseStorage } from '../hooks/';

function Todo() {
  const [items, addTodo, updateTodo] = useFirebaseStorage();

  const handleCheck = (checked) => {
    updateTodo({ ...checked, done: !checked.done });
  };
  const handleAdd = (text) => {
    const item = {
      text,
      done: false,
    };
    addTodo(item);
  };

  return (
    <article className='panel is-danger'>
      <div className='panel-heading'>
        <span className='icon-text'>
          <span className='icon'>
            <i className='fas fa-calendar-check'></i>
          </span>
          <span> ITSS Todoアプリ</span>
        </span>
      </div>
      <Input onAdd={handleAdd} />
      <Filter items={items} handleCheck={handleCheck} />
      {/* <div className='panel-block'>
        <button className='button is-light is-fullwidth' onClick={}>
          全てのToDoを削除
        </button>
      </div> */}
    </article>
  );
}

export default Todo;
