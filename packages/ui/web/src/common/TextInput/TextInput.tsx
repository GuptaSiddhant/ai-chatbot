export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const TextInput = (props: TextInputProps) => {
  return (
    <input
      type="text"
      className={'border rounded p-2 dark:[color-scheme:dark] w-full'}
      {...props}
    />
  )
}
