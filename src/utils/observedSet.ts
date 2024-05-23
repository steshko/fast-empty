import { Observable } from '@microsoft/fast-element';

export const observedSet = <T extends object>(obj: T, key: keyof T, value: T[keyof T]): void => {
  Observable.notify(obj, key.toString());
  obj[key] = value;
};
