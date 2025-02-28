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

  const foundItem = {
    id: 101,
    type: "found",
    title: "Blue Hydroflask Water Bottle",
    location: "Science Building",
    time: "2 hours ago",
    category: "Water Bottle",
    position: { x: 45, y: 55 },
  }

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
      if (inputValue.toLowerCase().includes("lost") && inputValue.toLowerCase().includes("water bottle")) {
        botResponse = {
          id: messages.length + 2,
          sender: "bot",
          text: "I found a potential match for your lost water bottle! Someone reported finding a blue Hydroflask in the Science Building about 2 hours ago.",
          timestamp: new Date().toISOString(),
          hasMap: true,
        }
        setShowMap(true)
      } else if (inputValue.toLowerCase().includes("lost")) {
        botResponse = {
          id: messages.length + 2,
          sender: "bot",
          text: "I'm sorry to hear you lost something. Can you provide more details about what you lost? Include color, brand, and where you last saw it.",
          timestamp: new Date().toISOString(),
        }
      } else if (inputValue.toLowerCase().includes("found")) {
        botResponse = {
          id: messages.length + 2,
          sender: "bot",
          text: "Thank you for finding an item! Please report it through our 'Report Found Item' form so we can help return it to its owner.",
          timestamp: new Date().toISOString(),
        }
      } else if (inputValue.toLowerCase().includes("help")) {
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

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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
        </Card>
      )}
    </>
  )
}
