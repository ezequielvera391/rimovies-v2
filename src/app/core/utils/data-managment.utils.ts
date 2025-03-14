export function isObject(value: any): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }
  
export function isArray(value: any): boolean {
    return Array.isArray(value);
  }

export  function isArrayOfObjects<T extends object>(data: any[]): data is T[] {
    return data.length > 0 && typeof data[0] === 'object' && !Array.isArray(data[0]);
  }
  
export  function isArrayOfPrimitives(array: any[]): boolean {
    return array.every(item => (typeof item !== 'object' || item === null));
  }