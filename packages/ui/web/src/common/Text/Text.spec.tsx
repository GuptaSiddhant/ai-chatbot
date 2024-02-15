import { render } from '@testing-library/react'
import { Text } from '.'

describe('Text', () => {
  it('renders Text', () => {
    const { queryAllByText } = render(<Text type="body" text="Test" />)
    expect(queryAllByText('Test')).toHaveLength(1)
  })
})
