import { render } from '@testing-library/react'
import { TextButton } from '.'

describe('TextButton', () => {
  it('renders', () => {
    const { queryAllByText } = render(
      <TextButton onClick={() => {}}>Test</TextButton>,
    )
    expect(queryAllByText('Test')).toHaveLength(1)
  })
})
