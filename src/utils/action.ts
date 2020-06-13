import { createAction } from 'redux-actions';
import { Dispatch } from 'redux';

export default (id: string, request: (...args: any[]) => Promise<any>) =>
  (dispatch: Dispatch) =>
    (...args: any[]) =>
      request(...args).then((data: any) => {
        dispatch(createAction(id)(data));
        return data;
      });
