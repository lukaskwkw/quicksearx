import { SpaceInstances } from '../searxSpace';

export interface Cache<T> {
  TTL: number;
  _time: number;
  _data: T;
  get data(): T;
  set data(value: T);
}

export const cache = (TTL: number = 3600 * 1000): Cache<string | any> => ({
  TTL,
  _time: 0,
  _data: 'REFRESH',
  get data() {
    if (this._time && Date.now() - this._time < this.TTL)
      return this._data;
    return 'REFRESH';
  },
  set data(value) {
    this._time = Date.now();
    this._data = value;
  },
});
