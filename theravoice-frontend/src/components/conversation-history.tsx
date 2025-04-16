import { CalendarClock } from "lucide-react"

// Mock data for conversation history
const conversations = [
  {
    id: 1,
    title: "Dealing with work anxiety",
    date: "Today, 2:30 PM",
    preview: "I've been feeling overwhelmed at work lately...",
    isActive: true,
  },
  {
    id: 2,
    title: "Sleep issues",
    date: "Yesterday, 9:15 PM",
    preview: "I've been having trouble falling asleep...",
    isActive: false,
  },
  {
    id: 3,
    title: "Family relationships",
    date: "May 12, 4:45 PM",
    preview: "I want to improve communication with my parents...",
    isActive: false,
  },
  {
    id: 4,
    title: "Self-care routine",
    date: "May 10, 11:20 AM",
    preview: "I need help establishing a better self-care routine...",
    isActive: false,
  },
  {
    id: 5,
    title: "Career transition",
    date: "May 5, 3:00 PM",
    preview: "I'm thinking about changing careers but I'm scared...",
    isActive: false,
  },
]

interface Message {
  text: string;
  isUser: boolean;
}

interface ConversationHistoryProps {
  messages: Message[];
}

export function ConversationHistory({ messages }: ConversationHistoryProps) {
  return (
    <div className="h-[400px] overflow-y-auto space-y-4 p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-4 ${
              message.isUser
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
}
