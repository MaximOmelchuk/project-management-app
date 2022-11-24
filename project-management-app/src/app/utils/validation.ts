export const FORM_VALIDATORS = {
  PASSWORD: {
      REGEXP: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      ERROR_MESSAGE: "Password must contain 0 - 9 and uppercase and lowercase symbols",
  },
  LETTERS_NUMBERS_ONLY: {
      REGEXP:
          /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,. 0-9'-]+$/u,
      ERROR_MESSAGE: `The field shall contain only letters and numbers`,
  },
  REQUIRED: {
      ERROR_MESSAGE: `This is required`,
  },
};

export const VALIDATORS = {
  PASSWORD: {
      required: FORM_VALIDATORS.REQUIRED.ERROR_MESSAGE,
      minLength: {
          value: 6,
          message: "Minimum Required length is 6",
      },
      maxLength: {
          value: 20,
          message: "Maximum Required length is 20",
      },
      pattern: {
          value: new RegExp(FORM_VALIDATORS.PASSWORD.REGEXP),
          message: FORM_VALIDATORS.PASSWORD.ERROR_MESSAGE,
      },
  },
  TEXT: {
      required: FORM_VALIDATORS.REQUIRED.ERROR_MESSAGE,
      minLength: {
          value: 4,
          message: "Minimum Required length is 4",
      },
      maxLength: {
          value: 20,
          message: "Maximum Required length is 20",
      },
      pattern: {
          value: new RegExp(FORM_VALIDATORS.LETTERS_NUMBERS_ONLY.REGEXP),
          message: FORM_VALIDATORS.LETTERS_NUMBERS_ONLY.ERROR_MESSAGE,
      },
  },
};
