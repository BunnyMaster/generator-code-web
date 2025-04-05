import request from '@/api/server/request';
import type { BaseResult } from '@/types/request';

/* 获取所有数据表 */
export const getAllTableMetaData = () => {
  return request<any, BaseResult<any>>({ url: '/table/getAllTableMetaData', method: 'get' });
};

/* 获取表属性 */
export const getTableMetaData = (params: object) => {
  return request<any, BaseResult<any>>({ url: '/table/getTableMetaData', method: 'get', params });
};

/* 获取列属性 */
export const getColumnInfo = (params: object) => {
  return request<any, BaseResult<any>>({ url: '/table/getColumnInfo', method: 'get', params });
};
