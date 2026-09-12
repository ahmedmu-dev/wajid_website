/**
 * Date utility functions
 */

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatTime = (timeString: string): string => {
  return timeString
}

export const getTodayDate = (): string => {
  const today = new Date()
  return today.toISOString().split('T')[0]
}

export const getFutureDate = (days: number): string => {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

export const isDateValid = (dateString: string): boolean => {
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

export const isDateInFuture = (dateString: string): boolean => {
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date >= today
}
