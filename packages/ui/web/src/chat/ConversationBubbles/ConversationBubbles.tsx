import { IConversation } from '@ddp-bot/types'

export function ConversationBubbles({
  conversation,
}: {
  conversation: IConversation
}) {
  return (
    <section className="relative flex flex-col gap-2">
      <div className="relative min-w-[160px] max-w-[80%] self-end text-right rounded-lg rounded-br-none px-4 py-2 bg-slate-200 dark:bg-slate-800">
        <small className="absolute opacity-70 -top-5 right-4">
          <time dateTime={conversation.created}>
            {formatAsLocalDateTime(conversation.created)}
          </time>
        </small>
        <p>{conversation.userMessage}</p>
      </div>
      <div className="relative w-auto max-w-[80%] self-start rounded-lg rounded-bl-none px-4 py-2 bg-slate-100 dark:bg-slate-700">
        <small className="absolute opacity-70 -top-5 left-4">AI Bot</small>
        <pre className="font-sans whitespace-pre-wrap">
          {conversation.botMessage}
        </pre>
      </div>
    </section>
  )
}

export function formatAsLocalDateTime(date: Date | number | string): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
