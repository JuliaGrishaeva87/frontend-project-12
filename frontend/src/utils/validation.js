import * as yup from "yup"

const validationChannelsShema = (channelsNames) => {
  return yup.object().shape({
    name: yup.string().trim().required().min(3).max(20).notOneOf(channelsNames, 'Канал с таким названием уже существует'),
  })
}

export { validationChannelsShema }