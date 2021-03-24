import { get } from './ajax.js';
/**
 * @param {Object} p [请求接口所需参数]
 */

// 测试本地接口
export const apiTest = (p) => get('/api/list', p);

// 世界记录表接口
// 不传'insertuery'，为一般模式，参数直接以？&形式拼接。
// 'insertuery'，表示参数将用于url中替换对应变量。
export const apiRecord = (p) =>
  get('match/record/event/${discipline}/${eventRsc}.json', p, 'insertuery');
