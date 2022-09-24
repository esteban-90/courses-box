import styled from '@emotion/styled'
import { Icon as _Icon } from '@/components/Icon'
import { makeShadow } from '@/styles/helpers'
import { InputWrapperProps } from '@/types'

export const Label = styled.span`
  grid-area: label;
  padding-left: 1.4rem;
`

export const Feedback = styled(Label)`
  grid-area: feedback;
`

export const Icon = styled(_Icon)`
  position: absolute;
  right: 1.4rem;
  opacity: 0.7;
  color: ${({ theme }) => theme.font.placeholder};
`

export const InnerWrapper = styled.div`
  grid-area: input;
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
`

export const Input = styled.input`
  all: unset;
  border-radius: 1rem;
  font-size: 1.4rem;
  padding: 0 1.4rem;

  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.font.regular};

  box-shadow: ${({ theme }) => {
    const { shadow1, shadow2 } = theme.components
    const $shadow = makeShadow(shadow1, shadow2, true)
    return $shadow
  }};

  &:focus {
    box-shadow: ${({ theme }) => {
      const { shadow1, shadow2 } = theme.components
      const $shadow = makeShadow(shadow1, shadow2)
      return $shadow
    }};
  }

  &::placeholder {
    opacity: 0.7;
    color: ${({ theme }) => theme.font.placeholder};
  }

  &:not(:placeholder-shown) {
    & ~ svg {
      display: none;
    }
  }

  &:hover {
    cursor: text;
  }
`

export const OuterWrapper = styled.label<InputWrapperProps>`
  font-size: 1rem;
  display: grid;
  gap: 0.1rem;
  grid-template-areas:
    'label'
    'input'
    'feedback';

  grid-template-rows: ${({ isLabelVisible, isFeedbackVisible }) => {
    if (isLabelVisible && isFeedbackVisible) return '1fr 3fr 1fr'
    if (isLabelVisible) return '1fr 4fr 0fr'
    if (isFeedbackVisible) return '0fr 4fr 1fr'
    return '0fr 1fr 0fr'
  }};

  height: ${({ height }) => height}rem;
  width: ${({ width }) => width}rem;
  color: ${({ theme }) => theme.font.regular};
`
