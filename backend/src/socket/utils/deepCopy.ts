/**
 * Creates a deep copy of the provided object or array.
 *
 * Recursively copies all nested objects and arrays, ensuring that the returned value is a completely new structure with no shared references to the original.
 *
 * @typeParam T - The type of the object or array to copy.
 * @param obj - The object or array to deep copy.
 * @returns A deep copy of the input object or array.
 *
 * @remarks
 * This function only works correctly for plain objects and arrays.
 * It does not handle special object types such as Date, Map, Set, RegExp, functions, class instances, or objects with circular references.
 * Using this function with such types may result in incorrect copies or errors.
 */
export function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item)) as unknown as T;
  }

  const result: any = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = deepCopy((obj as any)[key]);
    }
  }
  return result;
}
