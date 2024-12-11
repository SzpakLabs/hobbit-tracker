export interface Hobbit {
  id: string
  name: string
  age: number
  location: string
  isRingbearer: boolean
  race: 'Harfoot' | 'Fallohide' | 'Stoor'
  occupation: string
  birthDate: string
  height: number // in centimeters
  isBilboRelative: boolean
}
