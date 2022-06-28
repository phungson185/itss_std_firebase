/* eslint-disable jsx-a11y/anchor-is-valid */
import TodoItem from './TodoItem';
import { useEffect, useState } from 'react';

function Filter({ items, handleCheck }) {
  const [displayItems, setDisplayItems] = useState([]);
  const [valueFilter, setValueFilter] = useState('all');

  useEffect(() => {
    if (valueFilter === 'all') setDisplayItems(items);
    if (valueFilter === 'todo') setDisplayItems(items.filter((item) => !item.done));
    if (valueFilter === 'done') setDisplayItems(items.filter((item) => item.done));
  }, [items, valueFilter]);

  const handleClick = (status) => {
    setValueFilter(status);
  };

  return (
    <>
      <div className='panel-tabs'>
        <a href='#' onClick={() => handleClick('all')} className={valueFilter === 'all' ? 'is-active' : ''}>
          全て
        </a>
        <a href='#' onClick={() => handleClick('todo')} className={valueFilter === 'todo' ? 'is-active' : ''}>
          未完了
        </a>
        <a href='#' onClick={() => handleClick('done')} className={valueFilter === 'done' ? 'is-active' : ''}>
          完了済み
        </a>
      </div>
      {displayItems.map((item) => (
        <TodoItem key={item.id} item={item} onCheck={handleCheck} />
      ))}
      <div className='panel-block'>{displayItems.length} items</div>
    </>
  );
}

export default Filter;
