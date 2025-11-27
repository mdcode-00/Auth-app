import toast from 'react-hot-toast';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api/auth'

export const useAuthStore = create(
  persist(

    (set) => ({

      user: null,
      isLoading: true,
      isError: false,
      userId: null,



      checkAuth: async () => {

        set({ isLoading: true })
        try {
          const response = await fetch(`${API_BASE}/refresh`, {
            method: "GET",
            credentials: "include"
          })

          const data = await response.json();


          if (response.ok && data.user) {
            set({ userId: data.user })
          } else {
            set({ userId: null })
          }

        } catch (error) {
          set({ userId: null })
        } finally {
          set({ isLoading: false })
        }
      },


      authSingUp: async (formData) => {
        set({ isLoading: true })
        try {

          const res = await fetch(`${API_BASE}/singin`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: 'include'
          });
          const data = await res.json();
          if (!res.ok) {
            toast.error(data.message || "Signup failed")
            return;
          }
          set({ user: data.user })
          toast.success("Signup successful!")
        } catch (error) {
          toast.error("Something went wrong")
        } finally {
          set({ isLoading: false })
        }
      },


      authLogIn: async (formData) => {
        set({ isLoading: true })
        try {
          const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
            credentials: 'include'
          })

          const data = await res.json();

          if (!res.ok) {
            toast.error(data.error || "Login failed")
            return;
          }

          set({ user: data.user });

          toast.success("Login successful!")

        } catch (error) {
          toast.error("Something went wrong")
        } finally {
          set({ isLoading: false })
        }
      },

      authLogOut: async () => {
        try {
          const res = await fetch(`${API_BASE}/logout`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
          })

          if (!res.ok) {
            toast.error("Logout failed");
            return;
          }
          set({ user: null })
          toast.success('Logged out successfully!')
        } catch (error) {
          toast.error('Something went wrong')
        }
      }

    }),
    { name: "auth-storage" }
  )
)