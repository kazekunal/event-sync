"use client"
import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Search, CheckCircle, Clock, CalendarDays } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const EventsDashboard = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Meeting",
      date: new Date(2024, 2, 26),
      time: "14:00",
      description: "Weekly team sync-up",
      completed: false,
      priority: "medium",
    },
    {
      id: 2,
      title: "Client Presentation",
      date: new Date(2024, 2, 28),
      time: "10:30",
      description: "Q1 project review",
      completed: false,
      priority: "high",
    },
    {
      id: 3,
      title: "Project Deadline",
      date: new Date(2024, 3, 5),
      time: "18:00",
      description: "Final submission for Q1 project",
      completed: false,
      priority: "high",
    },
    {
      id: 4,
      title: "Training Session",
      date: new Date(2024, 2, 24),
      time: "09:00",
      description: "New tools onboarding",
      completed: true,
      priority: "low",
    },
  ])

  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("calendar")
  const [priorityFilter, setPriorityFilter] = useState("all")

  // Sort events by date (nearest to furthest)
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date.toDateString()} ${a.time}`)
    const dateB = new Date(`${b.date.toDateString()} ${b.time}`)
    return dateA - dateB
  })

  // Filter events based on search query
  const filteredEvents = sortedEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter events based on priority
  const priorityFilteredEvents =
    priorityFilter === "all" ? filteredEvents : filteredEvents.filter((event) => event.priority === priorityFilter)

  // Separate upcoming and completed events
  const upcomingEvents = priorityFilteredEvents.filter((event) => !event.completed)
  const completedEvents = priorityFilteredEvents.filter((event) => event.completed)

  const handleAddEvent = () => {
    setCurrentEvent(null)
    setIsEventModalOpen(true)
  }

  const handleEditEvent = (event) => {
    setCurrentEvent(event)
    setIsEventModalOpen(true)
  }

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const handleSaveEvent = (eventData) => {
    // Ensure date is a Date object
    const processedEventData = {
      ...eventData,
      date: eventData.date instanceof Date ? eventData.date : new Date(eventData.date),
    }

    if (currentEvent) {
      // Edit existing event
      setEvents(
        events.map((event) => (event.id === currentEvent.id ? { ...processedEventData, id: currentEvent.id } : event)),
      )
    } else {
      // Add new event
      const newEvent = {
        ...processedEventData,
        id: Date.now(), // Use timestamp for unique ID
        completed: false,
      }
      setEvents([...events, newEvent])
    }
    setIsEventModalOpen(false)
  }

  const toggleEventCompletion = (id) => {
    setEvents(events.map((event) => (event.id === id ? { ...event, completed: !event.completed } : event)))
  }

  const getEventsForSelectedDate = () => {
    // Ensure selectedDate is always a Date object
    const safeSelectedDate = selectedDate instanceof Date ? selectedDate : new Date()

    return events.filter((event) => event.date.toDateString() === safeSelectedDate.toDateString())
  }

  // Get dates with events for calendar highlighting
  const datesWithEvents = events.map((event) => event.date)

  // Priority badge color mapping
  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100">
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <h1 className="text-4xl font-extrabold text-indigo-800 flex items-center">
          <CalendarDays className="mr-3 text-indigo-600" size={40} />
          Events Dashboard
        </h1>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-8 bg-white shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleAddEvent} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Event
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="calendar" 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-6 bg-white shadow-md">
          <TabsTrigger 
            value="calendar" 
            className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-800"
          >
            Calendar View
          </TabsTrigger>
          <TabsTrigger 
            value="upcoming" 
            className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-800"
          >
            Upcoming Events
          </TabsTrigger>
          <TabsTrigger 
            value="completed" 
            className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-800"
          >
            Completed Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="md:col-span-1 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo-800 flex items-center">
                  <CalendarDays className="mr-2 text-indigo-600" />
                  Event Calendar
                </CardTitle>
                <CardDescription>Select a date to view events</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date || new Date())}
                  className="rounded-lg border-2 border-indigo-100 w-full max-w-[350px]"
                  classNames={{
                    root: "w-full",
                    month: "w-full",
                    caption: "flex justify-center items-center relative",
                    nav: "space-x-1 flex items-center",
                    table: "w-full border-collapse",
                    cell: "text-center p-0 relative focus-within:relative focus-within:z-20",
                    day: "h-10 w-10 p-0 font-normal aria-selected:opacity-100 hover:bg-indigo-100 rounded-full",
                    day_selected: "bg-indigo-600 text-white hover:bg-indigo-700",
                    day_today: "bg-indigo-50 text-indigo-900",
                  }}
                  modifiers={{
                    events: datesWithEvents,
                  }}
                  modifiersClassNames={{
                    events: "bg-indigo-200 font-bold text-indigo-800",
                  }}
                />
              </CardContent>
            </Card>

            <Card className="md:col-span-2 bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-indigo-800">
                  Events on {(selectedDate || new Date()).toLocaleDateString()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getEventsForSelectedDate().length === 0 ? (
                  <div className="text-center text-muted-foreground py-8">
                    No events scheduled for this date
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getEventsForSelectedDate().map((event) => (
                      <EventCard
                        key={event.id}
                        event={event}
                        onEdit={() => handleEditEvent(event)}
                        onDelete={() => handleDeleteEvent(event.id)}
                        onToggleComplete={() => toggleEventCompletion(event.id)}
                        priorityColors={priorityColors}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          <Card className="bg-white shadow-lg">
            <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div>
                <CardTitle className="text-indigo-800">Upcoming Events</CardTitle>
                <CardDescription>Events sorted from nearest to furthest</CardDescription>
              </div>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-[180px] mt-4 md:mt-0">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              {upcomingEvents.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No upcoming events found
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onEdit={() => handleEditEvent(event)}
                      onDelete={() => handleDeleteEvent(event.id)}
                      onToggleComplete={() => toggleEventCompletion(event.id)}
                      priorityColors={priorityColors}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-indigo-800">Completed Events</CardTitle>
              <CardDescription>Events you've already completed</CardDescription>
            </CardHeader>
            <CardContent>
              {completedEvents.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  No completed events found
                </div>
              ) : (
                <div className="space-y-4">
                  {completedEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onEdit={() => handleEditEvent(event)}
                      onDelete={() => handleDeleteEvent(event.id)}
                      onToggleComplete={() => toggleEventCompletion(event.id)}
                      priorityColors={priorityColors}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSave={handleSaveEvent}
        initialEvent={currentEvent}
      />
    </div>
    </div>
  )
}

// Event Card Component
const EventCard = ({ event, onEdit, onDelete, onToggleComplete, priorityColors }) => {
  // Calculate time remaining
  const now = new Date()
  const eventDate = new Date(`${event.date.toDateString()} ${event.time}`)
  const isUpcoming = eventDate > now

  // Format date and time for display
  const formattedDate = event.date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  // Format time for display
  const formattedTime = event.time

  return (
    <Card className={`overflow-hidden transition-all ${event.completed ? "bg-muted/50" : "hover:shadow-md"}`}>
      <div
        className={`h-1 ${event.priority === "high" ? "bg-red-500" : event.priority === "medium" ? "bg-yellow-500" : "bg-blue-500"}`}
      />
      <CardContent className="p-0">
        <div className="flex items-stretch">
          <div className="p-4 flex flex-col justify-center items-center border-r min-w-[100px] bg-muted/30">
            <span className="text-sm font-medium">{formattedDate}</span>
            <span className="text-lg font-bold">{formattedTime}</span>
          </div>

          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className={`font-semibold text-lg ${event.completed ? "line-through text-muted-foreground" : ""}`}>
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={priorityColors[event.priority]}>
                    {event.priority.charAt(0).toUpperCase() + event.priority.slice(1)}
                  </Badge>
                  {isUpcoming && !event.completed && (
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      <Clock className="h-3 w-3 mr-1" />
                      Upcoming
                    </Badge>
                  )}
                  {event.completed && (
                    <Badge variant="outline" className="bg-gray-100 text-gray-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onToggleComplete}
                  className={event.completed ? "bg-primary/10" : ""}
                >
                  <CheckCircle className={`h-4 w-4 ${event.completed ? "text-primary" : ""}`} />
                </Button>
                <Button variant="outline" size="sm" onClick={onEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="sm" onClick={onDelete}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {event.description && (
              <p className={`text-sm ${event.completed ? "text-muted-foreground" : "text-foreground/80"}`}>
                {event.description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Event Modal Component
const EventModal = ({ isOpen, onClose, onSave, initialEvent }) => {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    date: new Date(),
    time: "",
    description: "",
    priority: "medium",
    completed: false,
  })

  // Update form when initialEvent changes
  useEffect(() => {
    if (initialEvent) {
      setEventDetails({
        title: initialEvent.title,
        date: initialEvent.date,
        time: initialEvent.time,
        description: initialEvent.description,
        priority: initialEvent.priority || "medium",
        completed: initialEvent.completed || false,
      })
    } else {
      // Reset form for new event
      setEventDetails({
        title: "",
        date: new Date(),
        time: "",
        description: "",
        priority: "medium",
        completed: false,
      })
    }
  }, [initialEvent, isOpen])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEventDetails((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setEventDetails((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(eventDetails)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-indigo-800">
            {initialEvent ? "Edit Event" : "Create New Event"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              name="title"
              value={eventDetails.title}
              onChange={handleInputChange}
              placeholder="Enter event title"
              required
              className="focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                name="date"
                value={
                  eventDetails.date instanceof Date ? eventDetails.date.toISOString().split("T")[0] : eventDetails.date
                }
                onChange={handleInputChange}
                required
                className="focus:border-indigo-500"
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                name="time"
                value={eventDetails.time}
                onChange={handleInputChange}
                required
                className="focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              name="priority"
              value={eventDetails.priority}
              onValueChange={(value) => setEventDetails((prev) => ({ ...prev, priority: value }))}
            >
              <SelectTrigger className="focus:border-indigo-500">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              name="description"
              value={eventDetails.description}
              onChange={handleInputChange}
              placeholder="Add event details"
              className="focus:border-indigo-500"
            />
          </div>

          {initialEvent && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="completed"
                name="completed"
                checked={eventDetails.completed}
                onCheckedChange={(checked) => setEventDetails((prev) => ({ ...prev, completed: checked }))}
              />
              <Label htmlFor="completed">Mark as completed</Label>
            </div>
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
              {initialEvent ? "Update Event" : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EventsDashboard