import { Button, TextInput } from '../../common'

export interface IChatInputProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  children?: React.ReactNode
}

export function ChatInput({ isLoading, onSubmit, children }: IChatInputProps) {
  return (
    <form onSubmit={onSubmit} className={'flex gap-2'}>
      {children}
      <TextInput
        label={''}
        name="message"
        placeholder={'Chat with AI'}
        required
        minLength={2}
        autoFocus={true}
        autoComplete={'off'}
        disabled={isLoading}
      />

      <Button type={'submit'} disabled={isLoading}>
        Send
      </Button>
    </form>
  )
}
