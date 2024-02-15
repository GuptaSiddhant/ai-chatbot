import { Button, TextInput } from '../../common'

export interface IChatInputProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  cancel: () => void
  isLoading: boolean
  isPending: boolean
}

export function ChatInput({
  cancel,
  isLoading,
  isPending,
  onSubmit,
}: IChatInputProps) {
  return (
    <form onSubmit={onSubmit} className={'flex gap-2'}>
      <TextInput
        label={''}
        name="message"
        placeholder={'Chat with AI'}
        required
        minLength={2}
        autoFocus={true}
        autoComplete={'off'}
        disabled={isPending || isLoading}
      />
      {isPending ? (
        <Button type={'button'} onClick={cancel}>
          Cancel
        </Button>
      ) : (
        <Button type={'submit'} disabled={isLoading}>
          Send
        </Button>
      )}
    </form>
  )
}
