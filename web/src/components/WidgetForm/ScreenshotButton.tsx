import { Camera, Trash } from 'phosphor-react'
import html2canvas from 'html2canvas'
import { useCallback, useState } from 'react'
import { Loading } from '../Loading'

interface ScreenshotButtonProps {
  screenshot: string | null
  onScreenshotTool: (screenshot: string | null) => void
}

export function ScreenshotButton ({
  onScreenshotTool,
  screenshot
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  const handleTakeScreenshot = useCallback(async () => {
    setIsTakingScreenshot(true)

    const canvas = await html2canvas(document.querySelector('html')!)
    const base64image = canvas.toDataURL('image/png')

    onScreenshotTool(base64image)
    setIsTakingScreenshot(false)
  }, [])

  if (screenshot) {
    return (
      <button
        type='button'
        onClick={() => onScreenshotTool(null)}
        className='p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 dark:text-zinc-500 hover:text-zinc-100 dark:hover:text-zinc-800 transition-colors'
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        }}>
          <Trash weight='fill' />
      </button>
    )
  }

  return (
    <button
      onClick={handleTakeScreenshot}
      type='button'
      className='dark:text-zinc-800 p-2 bg-zinc-800 dark:bg-zinc-100 rounded-md border-transparent hover:bg-zinc-700 dark:hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 dark:focus:ring-offset-white focus:ring-brand-500 transition-colors'
    >
      { isTakingScreenshot ? <Loading /> : <Camera className='w-6 h-6 text-zinc-100 dark:text-zinc-800' /> }
    </button>
  )
}
