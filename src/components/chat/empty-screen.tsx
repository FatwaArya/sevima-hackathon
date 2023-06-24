import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useInstructorStore } from '@/store/instructor-store';

const exampleMessages = [
    {
        heading: 'Solving Challenging Equations',
        message: `Hi Professor Max Mathis, I'm struggling to solve complex equations involving logarithms. Could you please guide me through the process? Thank you!`,
        instructor: 'Max Mathis'
    },
    {
        heading: 'Understanding Quantum Mechanics',
        message: `Hi Professor Max Mathis, I find quantum mechanics quite perplexing. Can you explain the basic principles behind it and how they differ from classical mechanics? Your insights would be greatly appreciated!`,
        instructor: 'Max Mathis'
    },
    {
        heading: 'Understanding Energy Transformation',
        message: `Hi Profesora Ana Morales, I'm having difficulty understanding the concept of energy transformation. Could you provide some examples and explain the different forms of energy and how they convert from one form to another? Thank you in advance for your guidance!`,
        instructor: 'Ana Morales'
    },
    {
        heading: 'Investigating Cells and Microorganisms',
        message: `Hi Profesora Ana Morales, I'm fascinated by cells and microorganisms. Can you provide an overview of their structures, functions, and their impact on living organisms? Your expertise in this area would be greatly valued!`,
        instructor: 'Ana Morales'
    },
];

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
    const setInstructor = useInstructorStore(state => state.setInstructor)

    return (
        <div className="mx-auto max-w-2xl px-4">
            <div className="rounded-lg border bg-background p-8">
                <h1 className="mb-2 text-lg font-semibold">
                    Welcome to Sage Inc.
                </h1>
                <p className="mb-2 leading-normal text-muted-foreground">
                    Ask our Instructor to help you with your questions.
                    Currently, we have 2 instructors available: Max Mathis and Ana Morales.
                </p>
                <p className="leading-normal text-muted-foreground">
                    You can start a conversation here or try the following examples:
                </p>
                <div className="mt-4 flex flex-col items-start space-y-2">
                    {exampleMessages.map((message, index) => (
                        <Button
                            key={index}
                            variant="link"
                            className="h-auto p-0 text-base"
                            onClick={() => { setInput(message.message); setInstructor(message.instructor) }}
                        >
                            <ArrowRight className="mr-2 text-muted-foreground" />
                            {message.heading} - {message.instructor}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}
