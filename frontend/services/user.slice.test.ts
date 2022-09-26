import { actions, reducer, initialState } from '@/services/user.slice'
import { mockUser } from '@/mocks'

const updatedState = {
  jwt: mockUser.jwt,
  username: mockUser.user.username,
  email: mockUser.user.email,
}

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
})
