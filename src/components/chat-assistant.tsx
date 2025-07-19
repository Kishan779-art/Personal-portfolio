'use client'

import { useState } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatAssistant, ChatAssistantOutput } from '@/ai/flows/chat-assistant';

type Message = {
    sender: 'user' | 'bot';
    text: string;
};

export default function ChatAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const { answer }: ChatAssistantOutput = await chatAssistant({ query: input });
            const botMessage: Message = { sender: 'bot', text: answer };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            const errorMessage: Message = { sender: 'bot', text: "Sorry, I'm having trouble connecting. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-8 right-8 z-50">
                <Button
                    size="icon"
                    className="rounded-full w-16 h-16 bg-primary text-primary-foreground shadow-lg animate-glow-pulse"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-8 h-8" /> : <Bot className="w-8 h-8" />}
                </Button>
            </div>
            {isOpen && (
                <div className="fixed bottom-28 right-8 z-50 w-full max-w-sm">
                    <Card className="bg-card/80 backdrop-blur-lg border-primary/30">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-primary font-headline">AI Assistant</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-72 pr-4">
                                <div className="space-y-4">
                                {messages.map((msg, index) => (
                                    <div key={index} className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.sender === 'bot' && <Bot className="w-6 h-6 text-primary flex-shrink-0" />}
                                        <div className={`rounded-lg px-4 py-2 max-w-[80%] ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex gap-2 justify-start">
                                        <Bot className="w-6 h-6 text-primary flex-shrink-0" />
                                        <div className="rounded-lg px-4 py-2 bg-muted">...</div>
                                    </div>
                                )}
                                </div>
                            </ScrollArea>
                        </CardContent>
                        <CardFooter>
                            <div className="flex w-full items-center space-x-2">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask a question..."
                                    disabled={loading}
                                    className="bg-background/50 focus:ring-primary"
                                />
                                <Button onClick={handleSend} disabled={loading}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </>
    );
}
