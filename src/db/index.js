const DB = {
  version: 1.0,
  name: 'cache_data'
};
let IndexDB = null;
let db = null;
export const runDb = () => {
  IndexDB = indexedDB.open(DB.name, DB.version);
  IndexDB.onerror = function () {
    alert('本地存储异常');
  };
  IndexDB.onsuccess = function (e) {
    db = e.target.result;
    console.log('初始化成功');
  };
  IndexDB.onupgradeneeded = function (e) {
    console.log('更新数据', e);
    db = e.target.result;
    db.createObjectStore('customer', { keyPath: 'id' });
  };
};

/**
 * 获取IndexDB实例
 * @param {*} tableName  表名
 * @param {*} type readwrite（读写）| readonly（只读）
 * @returns
 */
export const initDb = (tableName, type = 'readwrite') => {
  if (tableName) {
    new Error('请输入表名');
  }
  const transaction = db.transaction(tableName, type);
  const result = transaction.objectStore(tableName);
  return result;
};
