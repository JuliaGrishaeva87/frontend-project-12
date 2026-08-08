const apiPath = '/api/v1'

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  getAddChannelsPath: () => [apiPath, 'channels'].join('/'),
  editRemoveChannelsPath: (id) => [apiPath, 'channels', `${id}`].join('/'),
  getAddMessagesPath: () => [apiPath, 'messages'].join('/'),
  editRemoveMessagesPath: (id) => [apiPath, 'messages', `${id}`].join('/'),
}