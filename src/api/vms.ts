import request from '@/api/server/request';
import type { BaseResult } from '@/types/request'; /* 获取所有数据表 */

/* 获取所有数据表 */
export const generator = (data: any) => {
  return request<any, BaseResult<any>>({ url: '/vms/generator', method: 'post', data });
};
