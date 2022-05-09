import { FeedbackType, feedbackTypes } from '..'
import { CloseButton } from '../../CloseButton'

interface FeedbackTypeStepProps {
  onFeedbackTypeChange: (feedback: FeedbackType) => void
}

export function FeedbackTypeStep ({ onFeedbackTypeChange }: FeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className='text-xl leading-6'>Deixe seu feedback</span>
        <CloseButton />
      </header>
      <div className='flex w-full py-8 gap-2'>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <button
            key={key}
            onClick={() => onFeedbackTypeChange(key as FeedbackType)}
            className='w-24 flex flex-1 flex-col items-center gap-2 bg-zinc-800 py-5 rounded-lg border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none'
          >
            <img src={value.image.source} alt={value.image.alt} />
            <span>{value.title}</span>
          </button>
        ))}
      </div>
    </>
  )
}
