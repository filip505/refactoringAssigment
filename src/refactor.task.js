/**
 * ----------------------------------------
 * refactoring
 * ----------------------------------------
 */

/**
 * ----------------------------------------
 * refactor work function
 * - spot the code smell(s)
 * - rewrite the function until you think it's much better
 * - you are free to do ANYTHING
 * ----------------------------------------
 */
// const work = obj => {
//   if (obj.type === 'user') {
//     return userClient.get(`/users/${obj.id}`);
//   } else if (obj.type === 'record') {
//     return recordClient.post('/url/to/another/service/records', obj);
//   } else if (obj.type === 'log') {
//     if (obj.allowWrite) {
//       localStorage.write(obj);
//       remoteStorage.write(obj);
//     } else {
//       console.log(obj);
//     }
//   }
// };

const userClient = require('./clients/user.client')
const recordClient = require('./clients/record.client')
const localStorage = require('./storage/local.storage')
const remoteStorage = require('./storage/remote.storage')

const actions = {
  getUserClient: ({ id }) => {
    return userClient.get(`/users/${id}`);
  },
  recordClient: (params) => {
    return recordClient.post('/url/to/another/service/records', params);
  },
  logRecord: ({ allowWrite, obj }) => {
    if (allowWrite) {
      localStorage.write(obj);
      remoteStorage.write(obj);
    } else {
      console.log(obj);
    }
  }
}

const types = {
  user: 'getUserClient',
  record: 'recordClient',
  log: 'logRecord'
}

const work = ({ type, params }) => {
  return actions[type](params)
}

exports.work = work
exports.types = types