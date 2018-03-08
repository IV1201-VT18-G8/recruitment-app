export const API_HOST_ADDRESS = 'https://localhost:8002';    // Docker backend server
// export const API_HOST_ADDRESS = 'http://localhost:8000';  // Django dev server
export const API_VERSION = 1;
export const API_ROOT_URL = API_HOST_ADDRESS + '/api/v' + API_VERSION;
export const LOCAL_STORAGE_AUTH_TOKEN_NAME = 'auth_token';
export const LOCAL_STORAGE_USER_ID_NAME = 'user_id';
export const LOCAL_STORAGE_IS_RECRUITER_NAME = 'is_recruiter';
export const LOCAL_STORAGE_IS_APPLICANT_NAME = 'is_applicant';

export const inputStyle = {
  border: '1px solid black',
  borderRadius: '3px'
};
export const invalidInputStyle = {
  border: '1px solid #ce1717',
  boxShadow: '0px 0px 5px 0px rgba(206,23,23,0.66)'
};
