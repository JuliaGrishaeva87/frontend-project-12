import * as yup from 'yup'

const validationChannelsShema = (channelsNames) => {
  return yup.object().shape({
    name: yup.string().trim().required().min(3).max(20).notOneOf(channelsNames, 'Канал с таким названием уже существует'),
  })
}

const validationSignupShema = () => {
  return yup.object().shape({
    username: yup.string()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
    password: yup.string()
    .required('Обязательное поле')
    .min(6, 'Не менее 6 символов'),
    confirmPassword: yup.string()
    .required('Пароли должны совпадать')
    .oneOf([yup.ref('password')],'Пароли должны совпадать')
  })
}

export { validationChannelsShema, validationSignupShema }