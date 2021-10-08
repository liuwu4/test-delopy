import dayjs from 'dayjs';
import { useEffect, useReducer } from 'react';
import { v4 } from 'uuid';
import './App.css';
import './app.less';
import { initDb } from './db';
import { reducer, state } from './store';
function App() {
  const [data, updateReducer] = useReducer(reducer, state);
  const handleUpdate = (params = {}) => {
    updateReducer({
      payload: {
        ...params
      }
    });
  };
  useEffect(() => {
    setTimeout(() => {
      const result = initDb('customer');
      handleAll(result).then((res) => {
        handleUpdate({
          todo: res?.result
        });
      });
    }, 0);
  }, []);
  const handleAll = async (db) => {
    let count = 0;
    return new Promise((relove) => {
      let ary = [];
      db.openCursor().onsuccess = function (e) {
        var cursor = e.target.result;
        if (cursor) {
          const { value } = cursor;
          ary = [...ary, value];
          count += 1;
          cursor.continue();
        } else {
          relove({ code: 200, total: count, result: ary });
        }
      };
    });
  };
  const handleAdd = () => {
    const result = initDb('customer');
    const uniqId = v4().replace(/-/g, '');
    const currentTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    let addData = {
      id: uniqId,
      name: `tome-${uniqId}`,
      age: Math.ceil(Math.random() * 100),
      create_date: currentTime,
      update_date: currentTime
    };
    result.add(addData);
    handleAll(result).then((res) => {
      handleUpdate({
        todo: res?.result
      });
    });
  };
  console.log(data);
  return (
    <div className='App' id='app'>
      <div className='all_button'>
        <div className='button' onClick={handleAdd}>
          添加
        </div>
        <div className='button'>删除</div>
        <div className='button'>更新</div>
      </div>
      <div className='todo'>
        {data.todo.map((item) => (
          <div key={item.id}>
            <div>{item.age}</div>
            <div>{item.update_date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
