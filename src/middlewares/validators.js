import { validate, nameField, passwordField, idField, AuthUser } from "../utils/validators.js";

const MSJ_INVALID_PARAMS = 'Parametros inválido';
const defaultSMSValidate = false;

export const validateJSON = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('JSON inválido recibido:', err.message);
    return res.status(400).json({ error: (defaultSMSValidate ? MSJ_INVALID_PARAMS : 'JSON inválido' ) });
  }
  next(err);
};

export const validateId = (req, res, next) => {
  const { id } = req.body;
  if (!idField(id)) {
    return res.status(400).json({ success: false, message: (defaultSMSValidate ? MSJ_INVALID_PARAMS : 'ID inválido') });
  }
  next();
};

export const tokenAuth = (req, res, next) => {
  const { access_token } = req.cookies;
  const { status, message, data} = AuthUser(access_token);
  console.log('[validator.js] tokenAuth data: ', data);
  if (!status) {
    return res.status(400).json({ success: false, message: (defaultSMSValidate ? MSJ_INVALID_PARAMS : message) });
  }
  next();
}

// Validations for User
export const validateCreateUser = (req, res, next) => {
  const { name, password, email, rol_id } = req.body;
  if (!nameField(name) || !passwordField(password) || !validate.email(email) || !idField(rol_id)) {
    return res.status(400).json({ success: false, message: (defaultSMSValidate ? MSJ_INVALID_PARAMS : 'Datos inválidos') });
  }
  next();
}

export const validateUpdateUser = (req, res, next) => {
  const { id, name, password, email, rol_id } = req.body;
  if (!idField(id) || !nameField(name) || !passwordField(password) || !validate.email(email) || !idField(rol_id)) {
    return res.status(400).json({ success: false, message: (defaultSMSValidate ? MSJ_INVALID_PARAMS : 'Datos inválidos') });
  }

  next();
};

export const validateDeleteUser = (req, res, next) => {
  const { id } = req.body;
  if (!idField(id)) {
    return res.status(400).json({ success: false, message: (defaultSMSValidate ? MSJ_INVALID_PARAMS : 'Datos inválidos') });
  }

  next();
};

export const validateLoginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!validate.email(email) || !passwordField(password)) {
    return res.status(400).json({ success: false, message: (defaultSMSValidate ? MSJ_INVALID_PARAMS : 'Datos inválidos') });
  }
  next();
};
