import { render, fireEvent, screen } from '@testing-library/react'
import { Button } from '.'

describe('Button', () => {
  it('renders', () => {
    const { queryAllByText } = render(<Button>Test</Button>)
    expect(queryAllByText('Test')).toHaveLength(1)
  })
  it('clicks', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    fireEvent.click(screen.getByText(/click me/i))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
