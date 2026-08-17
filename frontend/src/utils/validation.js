import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: () => ({ key: 'validation.required' }),
    oneOf: () => ({ key: 'validation.passwordMatch' }),
    notOneOf: () => ({ key: 'validation.channelExists' }),
  },
  string: {
    min: ({ min }) => ({
      key: min === 6 ? 'validation.passwordMin' : 'validation.stringMin',
      values: { min }
    }),
    max: ({ max }) => ({ key: 'validation.stringMax', values: { max } }),
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