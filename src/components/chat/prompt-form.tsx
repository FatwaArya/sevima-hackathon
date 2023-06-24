import * as React from 'react'
import Link from 'next/link'
import Textarea from 'react-textarea-autosize'
import { UseChatHelpers } from 'ai/react'

import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger, TooltipProvider
} from '@/components/ui/tooltip'
// import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import { PlusIcon, CornerDownLeft } from 'lucide-react'
import { useInstructorStore } from '@/store/instructor-store'

export interface PromptProps
    extends Pick<UseChatHelpers, 'input' | 'setInput'> {
    onSubmit: (value: string) => Promise<void>
    isLoading: boolean
}

export function PromptForm({
    onSubmit,
    input,
    setInput,
    isLoading
}: PromptProps) {
    const { formRef, onKeyDown } = useEnterSubmit()
    const inputRef = React.useRef<HTMLTextAreaElement>(null)
    const instructor = useInstructorStore(state => state.instructor)

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={async (e) => {
                e.preventDefault()
                if (!input?.trim()) {
                    return
                }
                setInput('')
                await onSubmit(input)
            }}
            ref={formRef}
        >
            <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                href="/home"
                                className={cn(
                                    buttonVariants({ size: 'sm', variant: 'outline' }),
                                    'absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4'
                                )}
                            >
                                <PlusIcon />
                                <span className="sr-only">New Chat</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>New Chat</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Textarea
                    ref={inputRef}
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    rows={1}
                    value={input}
                    disabled={
                        !instructor
                    }
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask a question"
                    spellCheck={false}
                    className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                />
                <div className="absolute right-0 top-4 sm:right-4">
                    <TooltipProvider>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={
                                        !instructor || !input || isLoading
                                    }
                                >
                                    <CornerDownLeft className='h-4 w-4' />
                                    <span className="sr-only">Send message</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Send message</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </form>
    )
}