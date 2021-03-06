import Filter from './Filter';
import Input from './Input';

import { useFirebaseStorage } from 'hooks';

function Todo() {
  const [items, addTodo, updateTodo, deleteAllTodo] = useFirebaseStorage();

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

  const handleDeleteAll = () => {
    items.forEach((item) => deleteAllTodo(item));
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
      <div className='panel-block'>
        <button className='button is-light is-fullwidth' onClick={handleDeleteAll}>
          全てのToDoを削除
        </button>
      </div>
    </article>
  );
}

export default Todo;
