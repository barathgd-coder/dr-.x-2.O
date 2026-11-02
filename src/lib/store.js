import { useEffect, useState } from 'react'

// Everything is stored on this device only (localStorage) so the app works fully offline.
export function useStored(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage full or blocked */ }
  }, [key, value])
  return [value, setValue]
}

export const CLINIC_WHATSAPP = '919894480430'
export const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM'
]
export const PROFILE_FIELDS = [
  { key: 'name', label: 'Full name', type: 'text' },
  { key: 'dob', label: 'Date of birth', type: 'date' },
  { key: 'age', label: 'Age', type: 'number' },
  { key: 'gender', label: 'Gender', type: 'select', options: ['Female', 'Male', 'Other', 'Prefer not to say'] },
  { key: 'bloodGroup', label: 'Blood group', type: 'select', options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Not sure'] },
  { key: 'phone', label: 'Phone number', type: 'tel' },
  { key: 'email', label: 'Email address', type: 'email' },
  { key: 'address', label: 'Address', type: 'text' }
]
