import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: () => ({ key: 'errors.validation.required' }),
    oneOf: () => ({ key: 'errors.validation.passwordMatch' }),
    notOneOf: () => ({ key: 'errors.validation.channelExists' }),
  },
  string: {
    min: ({ min }) => ({
      key: min === 6 ? 'errors.validation.passwordMin' : 'errors.validation.stringMin',
      values: { min }
    }),
    max: ({ max }) => ({ key: 'errors.validation.stringMax', values: { max } }),
  },
})

const validationChannelsSchema = (channelsNames) => {
  return yup.object().shape({
    name: yup.string().trim().required().min(3).max(20).notOneOf(channelsNames),
  })
}

const validationSignupSchema = () => {
  return yup.object().shape({
    username: yup.string()
    .required()
    .min(3)
    .max(20),
    password: yup.string()
    .required()
    .min(6),
    confirmPassword: yup.string()
    .required()
    .oneOf([yup.ref('password')])
  })
}

export { validationChannelsSchema, validationSignupSchema }