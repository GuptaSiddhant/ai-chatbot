export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const TextInput = (props: TextInputProps) => {
  return <input type="text" className={'border rounded-sm p-2'} {...props} />
}
