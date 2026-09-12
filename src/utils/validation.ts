/**
 * Validation utility functions
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-+()]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

export const validatePassportNumber = (passport: string): boolean => {
  // Basic passport validation - alphanumeric, 6-9 characters
  const passportRegex = /^[A-Z0-9]{6,9}$/
  return passportRegex.test(passport.toUpperCase())
}

export const validateDateOfBirth = (dob: string): boolean => {
  const date = new Date(dob)
  const today = new Date()
  const age = today.getFullYear() - date.getFullYear()
  return age >= 0 && age <= 120
}

export const validatePassportExpiry = (expiryDate: string): boolean => {
  const expiry = new Date(expiryDate)
  const today = new Date()
  return expiry > today
}

export const validateFullName = (name: string): boolean => {
  // At least 2 words, each at least 2 characters
  const nameParts = name.trim().split(/\s+/)
  return nameParts.length >= 2 && nameParts.every((part) => part.length >= 2)
}
