import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

/**
 * @param arr takes the array of objects
 * @returns returns an array with swagger api decorators
 */
export function ApiQueryArray(arr: any) {
  const finalResponse = arr.map((item: any) => ApiQuery(item));
  return applyDecorators(...finalResponse);
}
