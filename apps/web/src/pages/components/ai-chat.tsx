import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { ChatCircle, X, PaperPlaneRight, Terminal } from "@phosphor-icons/react";


export function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  
  const siteUrl = import.meta.env.VITE_CONVEX_URL?.replace(".cloud", ".site") || "";
  
  const [input, setInput] = useState("");
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: `${siteUrl}/api/chat` }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isOpen) {
    return (
      <Button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-none bg-black/60 backdrop-blur-md border border-cyan-500/50 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 font-mono text-xs tracking-[0.2em] px-4 py-6 transition-all group shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)]"
      >
        <Terminal size={18} className="mr-2 group-hover:text-white transition-colors" weight="duotone" />
        SYS_LINK()
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-[32rem] max-h-[85vh] flex flex-col bg-black/90 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] overflow-hidden">
      {/* Header */}
      <div className="flex-none flex items-center justify-between border-b border-cyan-500/30 p-4 bg-cyan-950/20">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-cyan-500" weight="duotone" />
          <span className="font-mono text-[0.65rem] tracking-[0.2em] text-cyan-400 uppercase">SYS_AI_OPERATIVE</span>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-cyan-400 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 relative scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent"
      >
         <div className="absolute inset-0 bg-blueprint opacity-5 pointer-events-none" />
        
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-50 relative z-10">
            <ChatCircle size={32} className="mb-4 text-cyan-500/50" weight="thin" />
            <p className="font-mono text-xs text-muted-foreground tracking-widest">
              AWAITING_INPUT<span className="animate-pulse">_</span>
            </p>
          </div>
        )}

        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`flex flex-col relative z-10 ${m.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`
              max-w-[85%] p-3 font-mono text-xs leading-relaxed border
              ${m.role === 'user' 
                ? 'bg-cyan-950/30 border-cyan-500/30 text-cyan-50' 
                : 'bg-black/40 border-border/40 text-muted-foreground'
              }
            `}>
              <div className="text-[0.55rem] tracking-[0.2em] uppercase text-cyan-500/60 mb-2 border-b border-cyan-500/20 pb-1">
                {m.role === 'user' ? '// OPERATOR' : '// AI_UNIT'}
              </div>
              <div className="whitespace-pre-wrap">
                {m.parts.map(p => p.type === "text" ? p.text : "").join("\n")}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex flex-col items-start relative z-10">
            <div className="bg-black/40 border border-border/40 p-3 font-mono text-xs text-muted-foreground flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-500/50 animate-ping" />
              PROCESSING...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleFormSubmit} className="flex-none p-4 border-t border-cyan-500/30 bg-black/60 relative">
         <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="flex items-center gap-2">
          <Input 
            value={input}
            onChange={handleInputChange}
            placeholder="ENTER_QUERY..." 
            className="rounded-none bg-transparent border-border/40 focus-visible:border-cyan-500 focus-visible:ring-0 font-mono text-xs placeholder:text-muted-foreground/30 h-10 tracking-widest text-cyan-50"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            variant="ghost" 
            size="icon"
            className="rounded-none h-10 w-10 border border-border/40 hover:border-cyan-500 hover:bg-cyan-500/10 text-cyan-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-border/40 transition-colors"
          >
            <PaperPlaneRight size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
}
