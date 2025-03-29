// src/store/authStore.ts
import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

type AuthView = 'sign_in' | 'sign_up' | 'forgot_password'

interface AuthState {
  authView: AuthView
  loading: boolean
  error: string | null
  successMessage: string | null
  email: string
  password: string
  fullName: string

  setAuthView: (view: AuthView) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  setFullName: (name: string) => void
  resetForm: () => void
  clearMessages: () => void

  handleSignIn: () => Promise<void>
  handleSignUp: () => Promise<void>
  handleResetPassword: () => Promise<void>
  checkSession: () => Promise<boolean>
}

const generateAvatarUrl = (fullName: string) => {
  const names = fullName.trim().split(/\s+/)
  const firstName = names[0] || ''
  const lastName = names.length > 1 ? names[names.length - 1] : ''
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    firstName
  )}+${encodeURIComponent(lastName)}&size=256&background=4f46e5&color=fff`
}

const validatePassword = (password: string) => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength)
    return 'Password must be at least 8 characters long'
  if (!hasUpperCase)
    return 'Password must contain at least one uppercase letter'
  if (!hasLowerCase)
    return 'Password must contain at least one lowercase letter'
  if (!hasNumber) return 'Password must contain at least one number'
  if (!hasSpecialChar)
    return 'Password must contain at least one special character'
  return null
}

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) ? null : 'Please enter a valid email address'
}

const createProfile = async (userId: string, fullName: string) => {
  if (!fullName.trim())
    return { success: false, error: 'Full name is required' }

  const avatarUrl = generateAvatarUrl(fullName.trim())
  const { error } = await supabase.from('profiles').upsert({
    id: userId,
    full_name: fullName.trim(),
    avatar_url: avatarUrl,
    created_at: new Date().toISOString(),
  })

  return error
    ? { success: false, error: `Failed to create profile: ${error.message}` }
    : { success: true, error: null }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  authView: 'sign_in',
  loading: false,
  error: null,
  successMessage: null,
  email: '',
  password: '',
  fullName: '',

  setAuthView: (view) => set({ authView: view }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setFullName: (fullName) => set({ fullName }),

  resetForm: () => set({ email: '', password: '', fullName: '', error: null }),
  clearMessages: () => set({ error: null, successMessage: null }),

  checkSession: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return !!session
  },

  handleSignIn: async () => {
    const { email, password } = get()
    set({ loading: true, error: null, successMessage: null })

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        set({ error: error.message, loading: false })
        return
      }
      if (!data.session) {
        set({ error: 'Failed to load session', loading: false })
        return
      }
      set({ loading: false })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'An unknown error occurred',
        loading: false,
      })
    }
  },

  handleSignUp: async () => {
    const { email, password, fullName } = get()
    set({ loading: true, error: null, successMessage: null })

    try {
      // Client-side email validation
      const emailError = validateEmail(email)
      if (emailError) {
        set({ error: emailError, loading: false })
        return
      }

      if (!fullName.trim()) {
        set({ error: 'Full name is required', loading: false })
        return
      }

      const passwordError = validatePassword(password)
      if (passwordError) {
        set({ error: passwordError, loading: false })
        return
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            avatar_url: generateAvatarUrl(fullName.trim()),
          },
          emailRedirectTo: `${window.location.origin}/login`, // Redirect after confirmation
        },
      })

      if (signUpError) {
        set({ error: signUpError.message, loading: false })
        return
      }

      if (!data.user) {
        set({ error: 'No user data returned from sign-up', loading: false })
        return
      }

      // Email confirmation is required (assuming it's enabled in Supabase settings)
      set({
        successMessage:
          'Please check your email to verify your account. Also check your spam folder if needed.',
        loading: false,
      })
      setTimeout(() => get().resetForm(), 500)
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'An unknown error occurred',
        loading: false,
      })
    }
  },

  handleResetPassword: async () => {
    const { email } = get()
    set({ loading: true, error: null, successMessage: null })

    try {
      const emailError = validateEmail(email)
      if (emailError) {
        set({ error: emailError, loading: false })
        return
      }

      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      )

      if (error) {
        set({ error: error.message, loading: false })
        return
      }

      set({
        successMessage: 'Password reset link sent! Check your email.',
        loading: false,
      })
      setTimeout(() => {
        get().resetForm()
        set({ authView: 'sign_in' })
      }, 3000)
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'An unknown error occurred',
        loading: false,
      })
    }
  },
}))
