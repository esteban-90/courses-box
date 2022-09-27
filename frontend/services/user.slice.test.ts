import { actions, reducer, initialState, login } from '@/services/user.slice'
import { mockUser } from '@/mocks'

const updatedState = {
  jwt: mockUser.jwt,
  username: mockUser.user.username,
  email: mockUser.user.email,
}

const loginData = {
  identifier: mockUser.user.email,
  password: mockUser.user.password,
}

const requestId = 'someId'

describe('User slice test cases', () => {
  describe('Update state actions', () => {
    it('should update th full state', () => {
      expect(reducer(initialState, actions.update(updatedState))).toEqual(updatedState)
    })

    it('should update only the jwt', () => {
      expect(reducer(initialState, actions.update({ jwt: updatedState.jwt }))).toEqual({
        ...initialState,
        jwt: updatedState.jwt,
      })
    })
  })

  describe('Clear state actions', () => {
    it('should clear the state', () => {
      const stateWithUpdatedValues = reducer(initialState, actions.update(updatedState))

      expect(stateWithUpdatedValues).toEqual(updatedState)
      expect(reducer(stateWithUpdatedValues, actions.clear())).toEqual(initialState)
    })
  })

  describe('Login state flow', () => {
    it('should set the request state to pending', () => {
      expect(
        reducer(
          {
            ...initialState,
            error: { message: 'Rejected' },
          },
          login.pending(requestId, loginData)
        )
      ).toEqual({
        ...initialState,
        requestState: 'pending',
      })
    })
  })
})
