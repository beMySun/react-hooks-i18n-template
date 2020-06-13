import moment from 'moment';

export const role = {
  1: 'Admin',
  2: 'Employee',
};
export const status = {
  1: 'Active',
  2: 'Inactive',
};
export const oppositeStatus = (type, val) => {
  switch (type) {
    case 'role': return val === 1 ? 2 : 1;
    case 'status': return val === 1 ? 2 : 1;
    default: return 1;
  }
};
export const emailRex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
export const phoneRex = /\d{5,20}/;
export const nameRex = /^[\S][\s\S]{4,29}$/;
export const passwordRex = /(^[0-9A-Za-z+=_]{5,15}$)/;
export const timeRender = time => moment(time * 1000).format('HH:mm DD/MM/YYYY');
export const StockType = {
  StockAddType: [1, 2],
  StockDecreaseType: [11, 12, 13, 14, 15, 16],
};
export const pageSizeOptions = ['10', '20', '50', '100'];
