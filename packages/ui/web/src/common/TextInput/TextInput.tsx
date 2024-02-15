export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const TextInput = ({ label, ...props }: TextInputProps) => {
  return (
    <label className={'w-full'}>
      <span>{label}</span>
      <input
        type="text"
        className={'border rounded p-2 dark:[color-scheme:dark] w-full'}
        {...props}
      />
    </label>
  )
}
