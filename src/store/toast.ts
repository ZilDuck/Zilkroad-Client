import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

export type ToastOptions = {
  type: 'success' | 'warning' | 'error' | 'info'
  duration?: number
  callback?: () => unknown
  message: string
  placeAtEnd?: boolean
}

export type Toast = {
  id: number
  remove: () => void
} & ToastOptions


const createToast = () => {
  const { subscribe, update }: Writable<Toast[]> = writable([] as Toast[])

  let count = 0

  const remove = (id: number) => {
    update((toasts) => toasts.filter((toast) => toast.id !== id))
  }

  const add = (options: ToastOptions) => {
    count += 1
    const id = count

    const toast = {
      ...options,
      duration: options.duration ?? 4000,
      id,
      remove: () => remove(id)
    }

    update((toasts) => (toast.placeAtEnd ? [...toasts, toast] : [toast, ...toasts]))
    return count
  }

  return { subscribe, add, remove }
}

export const toast = createToast()
