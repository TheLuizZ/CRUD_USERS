import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config.js';

// Field Validation
export const nameField = (value) => {
  if (validate.onlyLetters(value) || value.trim().length > 4) {
    return true;
  }
  return false;
};

export const passwordField = (value) => {
  if (validate.password(value) && value.trim().length >= 8) {
    return true;
  }
  return false;
};

export const idField = (value) => {
  if (Number.isInteger(value) && value > 0) {
    return true;
  }
  return false;
};

export const validate = {
  // Regex Validations
  onlyLetters: (value) => {
    return typeof value === 'string' &&
      value.trim().length > 0 &&
      /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(value.trim());
  },

  onlyNumbers: (value) => {
    return typeof value === 'string' && /^[0-9]+$/.test(value.trim());
  },

  password: (value) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;
    return typeof value === 'string' && passwordRegex.test(value.trim());
  },

  email: (value) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return typeof value === 'string' && emailRegex.test(value.trim());
  },

  // Response validation
  responseObjectEmpty: (response) => {
    if (!response || response.length <= 0) {
      return true;
    }
    return false;
  },

};

// JWT Validation
export const AuthUser = (access_token) => {
  let userInfo = '';
  try {
    const auth = jwt.verify(access_token, SECRET_JWT_KEY);
    console.log('[AuthUser] Token verified:', auth.userInfo);
    userInfo = auth.userInfo;
    if (!auth) {
      return { status: false, message: 'Token not valid', data: '' };
    }
  } catch (error) {
    let errorMessage = '';
    if (error.name === 'JsonWebTokenError') {
      console.error(`[AuthUser] JWT Error: ${error.message}`);
      errorMessage = error.message;
    } else if (error.name === 'TokenExpiredError') {
      console.error(`[AuthUser] Token expired at: ${error.expiredAt}`);
      errorMessage = error.expiredAt;
    } else if (error.name === 'NotBeforeError') {
      console.error(`[AuthUser] Token not active until: ${error.date}`);
      errorMessage = error.date;
    } else {
      console.error('[AuthUser] Unknown error:', error);
      errorMessage = error;
    }
    return { status: false, message: errorMessage, data: '' };
  }
  return { status: true, message: 'Token valid', data: userInfo };
};
