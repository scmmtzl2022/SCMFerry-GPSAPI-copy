import * as moment from 'moment';
let GMTstyle = moment().utc();
let current = GMTstyle.format('YYYY-MM-DD HH:mm:ss');
export const apiURL = 'https://hk-open.tracksolidpro.com/route/rest';
export const commonParam = {
  timestamp: current,
  app_key: '8FB345B8693CCD00E97951CC35B1045A',
  sign_method: 'md5',
  v: 0.9,
  format: 'json',
};
export const tokenParam = {
  method: 'jimi.oauth.token.get',
  user_id: 'cityapiuser',
  user_pwd_md5: '21218cca77804d2ba1922c33e0151105',
  expires_in: '7200',
};
export const getLocationParam = {
  method: 'jimi.device.location.get',
  imeis: '865784052487926,865784052827931',
  map_type: 'GOOGLE',
};
export const headers = {
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
};
