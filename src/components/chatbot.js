"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, X, Maximize2, Minimize2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"
import { LocationMap } from "@/components/location-map"

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi there! I'm your Find My Stuff assistant. How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [showMap, setShowMap] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: inputValue,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, userMessage])
    setInputValue("")

    setTimeout(() => {
      let botResponse
      const lowerCaseInput = inputValue.toLowerCase()

      if (lowerCaseInput.includes("lost") && lowerCaseInput.includes("water bottle")) {
        botResponse = {
          id: messages.length + 2,
          sender: "bot",
          text: "I found a potential match for your lost water bottle! Someone reported finding a blue Hydroflask in the Science Building about 2 hours ago.",
          timestamp: new Date().toISOString(),
          hasMap: true,
        }
        setShowMap(true)
      } else if (lowerCaseInput.includes("lost")) {
        botResponse = {
          id: messages.length + 2,
          sender: "bot",
          text: "I'm sorry to hear you lost something. Can you provide more details about what you lost? Include color, brand, and where you last saw it.",
          timestamp: new Date().toISOString(),
        }
      } else if (lowerCaseInput.includes("found")) {
        botResponse = {
          id: messages.length + 2,
          sender: "bot",
          text: "Thank you for finding an item! Please report it through our 'Report Found Item' form so we can help return it to its owner.",
          timestamp: new Date().toISOString(),
        }
      } else if (lowerCaseInput.includes("help")) {
        botResponse = {
          id: messages.length + 2,
          sender: "bot",
          text: "I can help you report lost or found items, check for matches, or navigate to item locations. What would you like to do?",
          timestamp: new Date().toISOString(),
        }
      } else {
        botResponse = {
          id: messages.length + 2,
          sender: "bot",
          text: "I'm here to help with lost and found items. You can ask me about reporting items, checking for matches, or navigating to item locations.",
          timestamp: new Date().toISOString(),
        }
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const toggleChatbot = () => {
    setIsOpen(!isOpen)
    if (isMinimized) setIsMinimized(false)
  }

  const toggleMinimize = (e) => {
    e.stopPropagation()
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      <Button className="fixed bottom-4 right-4 rounded-full shadow-lg z-50" size="icon" onClick={toggleChatbot}>
        <MessageSquare className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className={`fixed bottom-20 right-4 w-80 md:w-96 shadow-xl z-50 transition-all duration-300 ${isMinimized ? "h-14" : "h-[500px]"}`}>
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between cursor-pointer" onClick={toggleMinimize}>
            <div className="flex items-center gap-2">
              <Logo size="small" />
              <Badge variant="outline" className="ml-2">Assistant</Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleMinimize}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <CardContent className="h-[400px] overflow-y-auto p-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}>
                  <div className={`p-2 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>
          )}
          {!isMinimized && (
            <CardFooter className="p-3 border-t flex items-center">
              <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type a message..." className="flex-1" />
              <Button variant="ghost" size="icon" onClick={handleSendMessage}>
                <Send className="h-5 w-5" />
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
    </>
  )
}
