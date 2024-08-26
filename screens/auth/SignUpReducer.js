export const initialState = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  role: '',
  phoneNumber: '',
  loading: false,
  error: '',
  snackbarVisible: false,
  nameError: '',
  emailError: '',
  passwordError: '',
  passwordConfirmError: '',
  roleError: '',
  phoneError: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload, nameError: '' };
    case 'SET_EMAIL':
      return { ...state, email: action.payload, emailError: '' };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload, passwordError: '' };
    case 'SET_PASSWORD_CONFIRM':
      return {
        ...state,
        passwordConfirm: action.payload,
        passwordConfirmError: '',
      };
    case 'SET_ROLE':
      return { ...state, role: action.payload, roleError: '' };
    case 'SET_PHONE_NUMBER':
      return { ...state, phoneNumber: action.payload, phoneError: '' };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, snackbarVisible: true };
    case 'SET_NAME_ERROR':
      return { ...state, nameError: action.payload };
    case 'SET_EMAIL_ERROR':
      return { ...state, emailError: action.payload };
    case 'SET_PASSWORD_ERROR':
      return { ...state, passwordError: action.payload };
    case 'SET_PASSWORD_CONFIRM_ERROR':
      return { ...state, passwordConfirmError: action.payload };
    case 'SET_ROLE_ERROR':
      return { ...state, roleError: action.payload };
    case 'SET_PHONE_ERROR':
      return { ...state, phoneError: action.payload };
    case 'CLOSE_SNACKBAR':
      return { ...state, snackbarVisible: false };
    default:
      return state;
  }
};
