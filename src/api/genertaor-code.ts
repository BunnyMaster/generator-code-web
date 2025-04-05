import request from '@/api/server/requestMock';
import type { BaseResult } from '@/types/request'; /* 获取所有数据表 */

/* 获取所有数据表 */
export const getAllTableMetaData = () => {
  return request<any, BaseResult<any>>({ url: '/table/getAllTableMetaData', method: 'get' });
};
