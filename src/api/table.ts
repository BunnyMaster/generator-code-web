import request from '@/api/server/request';
import type { BaseResult } from '@/types/request';

/* 所有的数据库 */
export const getDbList = () => {
  return request<any, any>({ url: '/table/getDbList', method: 'GET' });
};

/* 数据库所有的表 */
export const getDbTables = (params: any) => {
  return request<any, BaseResult<any>>({ url: '/table/getDbTables', method: 'get', params });
};

/* 获取表属性 */
export const getTableMetaData = (params: object) => {
  return request<any, BaseResult<any>>({ url: '/table/getTableMetaData', method: 'get', params });
};

/* 获取列属性 */
export const getColumnInfo = (params: object) => {
  return request<any, BaseResult<any>>({ url: '/table/getColumnInfo', method: 'get', params });
};
