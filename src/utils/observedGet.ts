import { Observable } from '@microsoft/fast-element';

export const observedGet = <T extends object>(obj: T, key: keyof T): T[keyof T] => {
  Observable.track(obj, key.toString());
  return obj[key];
};
