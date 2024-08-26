// reducer.js
const initialState = {
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
  loading: false,
  error: '',
  snackbarVisible: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload, emailError: '' };
    case 'SET_PASSWORD':
      return { ...state, password: action.payload, passwordError: '' };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, snackbarVisible: true };
    case 'SET_EMAIL_ERROR':
      return { ...state, emailError: action.payload };
    case 'SET_PASSWORD_ERROR':
      return { ...state, passwordError: action.payload };
    case 'CLOSE_SNACKBAR':
      return { ...state, snackbarVisible: false };
    default:
      return state;
  }
};

export { initialState, reducer };
