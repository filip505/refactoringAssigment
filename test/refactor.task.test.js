
const userClient = require('./mock/user.client')
const recordClient = require('./mock/record.client')
const remoteStorage = require('./mock/remote.storage')
const localStorage = require('./mock/local.storage')
const { work, types } = require('../src/refactor.task')

describe('refector task actions', () => {

  afterEach(() => {
    remoteStorage.write.mockClear();
    localStorage.write.mockClear();
  });

  test('test getUserClient action', () => {
    const obj = { type: types.user, params: { id: '123', name: 'test' } }
    const user = work(obj)
    expect(userClient.get.mock.calls.length).toBe(1);
    expect(userClient.get.mock.calls[0][0]).toBe(`/users/${obj.params.id}`)
    expect(user).not.toBeNull();
    expect(user.name).toBe(obj.params.name)
  });

  test('test postRecordClient action', () => {
    const obj = { type: types.record, params: { id: '123', name: 'test' } }
    const record = work(obj)
    expect(recordClient.post.mock.calls.length).toBe(1);
    expect(recordClient.post.mock.calls[0][0]).toBe('/url/to/another/service/records')
    expect(recordClient.post.mock.calls[0][1]).toBe(obj.params)
    expect(record).not.toBeNull();
    expect(record.name).toBe(obj.params.name)
    expect(record.id).toBe(obj.params.id)
  });

  test('test logRecord action with allowWrite: "true', () => {
    const obj = { type: types.log, params: { allowWrite: true, obj: { id: '123', name: 'test' } } }
    work(obj)
    expect(remoteStorage.write.mock.calls.length).toBe(1);
    expect(localStorage.write.mock.calls.length).toBe(1);
  });

  test('test logRecord action with allowWrite: "false', () => {
    const obj = { type: types.log, params: { allowWrite: false, obj: { id: '123', name: 'test' } } }
    work(obj)
    expect(remoteStorage.write.mock.calls.length).toBe(0);
    expect(localStorage.write.mock.calls.length).toBe(0);
  });

  test('test calling action with invalid type', () => {
    const obj = { type: 'pam' }
    let error = null
    try {
      work(obj)
    } catch (err) {
      console.log('tu', err)
      error = err
    }
    expect(error).not.toBeNull()
    expect(error.name).toBe('TypeError')
  });

})