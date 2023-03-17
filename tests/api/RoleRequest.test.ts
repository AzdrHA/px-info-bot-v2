import roleRequest from '../../src/api/RoleRequest'
describe('RoleRequest', () => {
  it('should get the role setting', function () {
    void roleRequest.get().then((data) => {
      expect(data).toStrictEqual({
        administrator: expect.any(String),
        member: expect.any(String),
        support: expect.any(String)
      })
    })
  })
})
