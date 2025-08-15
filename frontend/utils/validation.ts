import { z } from 'zod';

export const step1Schema = z.object({
  pseudo: z
    .string()
    .min(3, 'Le pseudo doit contenir au moins 3 caractères')
    .max(20, 'Le pseudo ne peut pas dépasser 20 caractères')
    .regex(/^[a-zA-Z0-9_]+$/, 'Le pseudo ne peut contenir que des lettres, chiffres et underscores'),
});

export const step2Schema = z.object({
  firstName: z
    .string()
    .min(2, 'Le prénom doit contenir au moins 2 caractères')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  lastName: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  height: z
    .string()
    .min(1, 'La taille est requise')
    .regex(/^\d{2,3}$/, 'La taille doit être entre 50 et 250 cm')
    .refine((val) => {
      const height = parseInt(val);
      return height >= 50 && height <= 250;
    }, 'La taille doit être entre 50 et 250 cm'),
  dateOfBirth: z
    .string()
    .min(1, 'La date de naissance est requise')
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Format invalide. Utilisez DD/MM/YYYY'),
});

export const step3Schema = z.object({
  gender: z
    .enum(['homme', 'femme', 'autre'])
    .refine((val) => val !== '', 'Veuillez sélectionner votre genre'),
  bodyType: z
    .enum(['athlétique', 'moyenne', 'mince', 'ronde', 'musclée'])
    .refine((val) => val !== '', 'Veuillez sélectionner votre corpulence'),
  city: z
    .string()
    .min(2, 'La ville doit contenir au moins 2 caractères')
    .max(50, 'La ville ne peut pas dépasser 50 caractères'),
});

export const step4Schema = z.object({
  portraitPhoto: z
    .string()
    .optional()
    .or(z.literal('')), // Accepte explicitement les chaînes vides
  fullBodyPhoto: z
    .string()
    .optional()
    .or(z.literal('')), // Accepte explicitement les chaînes vides
});

export const step5Schema = z.object({
  maxMessagesPerDay: z
    .enum(['0', '3', '5', '10'])
    .refine((val) => val !== '', 'Veuillez sélectionner le nombre de messages'),
  maxInvitationsPerDay: z
    .enum(['0', '3', '5', '10'])
    .refine((val) => val !== '', 'Veuillez sélectionner le nombre d\'invitations'),
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type Step4FormData = z.infer<typeof step4Schema>;
export type Step5FormData = z.infer<typeof step5Schema>;