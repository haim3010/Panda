import { create } from 'zustand'

interface OnboardingData {
  step: number
  name: string
  jobTitle: string
  department: string
  location: string
  avatar: string | null
  hobbies: string[]
  interests: string[]
  connectionPreference: 'in-person' | 'online' | 'both'
  frequency: 'weekly' | 'bi-weekly' | 'monthly'
  activityInterests: string[]
}

interface OnboardingStore extends OnboardingData {
  setStep: (step: number) => void
  setField: <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) => void
  toggleHobby: (hobby: string) => void
  toggleActivityInterest: (interest: string) => void
  reset: () => void
}

const defaultData: OnboardingData = {
  step: 1,
  name: '',
  jobTitle: '',
  department: '',
  location: '',
  avatar: null,
  hobbies: [],
  interests: [],
  connectionPreference: 'both',
  frequency: 'weekly',
  activityInterests: [],
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  ...defaultData,
  setStep: (step) => set({ step }),
  setField: (key, value) => set({ [key]: value }),
  toggleHobby: (hobby) =>
    set((state) => ({
      hobbies: state.hobbies.includes(hobby)
        ? state.hobbies.filter((h) => h !== hobby)
        : [...state.hobbies, hobby],
    })),
  toggleActivityInterest: (interest) =>
    set((state) => ({
      activityInterests: state.activityInterests.includes(interest)
        ? state.activityInterests.filter((i) => i !== interest)
        : [...state.activityInterests, interest],
    })),
  reset: () => set(defaultData),
}))
