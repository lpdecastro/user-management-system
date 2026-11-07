import z from 'zod';

export const userSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
  team: z.string().min(1, 'Team is required'),
});

export type UserFormValues = z.infer<typeof userSchema>;
