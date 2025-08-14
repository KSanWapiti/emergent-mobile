export interface RegistrationStep1 {
  pseudo: string;
}

export interface RegistrationStep2 {
  firstName: string;
  lastName: string;
  height: string;
  dateOfBirth: string;
}

export interface RegistrationStep3 {
  gender: 'homme' | 'femme' | 'autre' | '';
  bodyType: 'athlétique' | 'moyenne' | 'mince' | 'ronde' | 'musclée' | '';
  city: string;
}

export interface CompleteRegistration extends RegistrationStep1, RegistrationStep2, RegistrationStep3 {}

export interface User {
  id: string;
  pseudo: string;
  firstName: string;
  lastName: string;
  height: number;
  dateOfBirth: string;
  gender: string;
  bodyType: string;
  city: string;
  createdAt: string;
  updatedAt: string;
}