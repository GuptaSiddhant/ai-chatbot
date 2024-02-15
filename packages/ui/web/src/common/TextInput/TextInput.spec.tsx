import { render } from '@testing-library/react'
import { TextInput } from '.'

describe('TextInput', () => {
  it('renders', () => {
    const { queryAllByText } = render(<TextInput label={'Label'} />)
    expect(queryAllByText('Label')).toHaveLength(1)
  })
})
