'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, EyeOff, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const securitySchema = z
  .object({
    currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
    newPassword: z
      .string()
      .min(8, 'A nova senha deve ter no mínimo 8 caracteres')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'A senha deve conter letras maiúsculas, minúsculas, números e caracteres especiais'
      ),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: 'A nova senha deve ser diferente da senha atual',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type SecurityFormData = z.infer<typeof securitySchema>;

export function SecurityForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const form = useForm<SecurityFormData>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SecurityFormData) => {
    try {
      setIsLoading(true);
      // Implement API call here
      console.log('Form submitted:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha atual</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPasswords.currentPassword ? "text" : "password"}
                        {...field}
                        className={cn(
                          "pr-20",
                          form.formState.errors.currentPassword && "border-destructive focus-visible:ring-destructive"
                        )}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('currentPassword')}
                      className="absolute right-9 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.currentPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info
                            className={cn(
                              "absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2",
                              form.formState.errors.currentPassword
                                ? "text-destructive"
                                : "text-muted-foreground"
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {form.formState.errors.currentPassword
                              ? form.formState.errors.currentPassword.message
                              : "Digite sua senha atual"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova senha</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPasswords.newPassword ? "text" : "password"}
                        {...field}
                        className={cn(
                          "pr-20",
                          form.formState.errors.newPassword && "border-destructive focus-visible:ring-destructive"
                        )}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('newPassword')}
                      className="absolute right-9 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.newPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info
                            className={cn(
                              "absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2",
                              form.formState.errors.newPassword
                                ? "text-destructive"
                                : "text-muted-foreground"
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          {form.formState.errors.newPassword ? (
                            <p>{form.formState.errors.newPassword.message}</p>
                          ) : (
                            <>
                              <p>A senha deve conter no mínimo 8 caracteres, incluindo:</p>
                              <ul className="list-disc ml-4">
                                <li>Letras maiúsculas</li>
                                <li>Letras minúsculas</li>
                                <li>Números</li>
                                <li>Caracteres especiais</li>
                              </ul>
                            </>
                          )}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar nova senha</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        type={showPasswords.confirmPassword ? "text" : "password"}
                        {...field}
                        className={cn(
                          "pr-20",
                          form.formState.errors.confirmPassword && "border-destructive focus-visible:ring-destructive"
                        )}
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      className="absolute right-9 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.confirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info
                            className={cn(
                              "absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2",
                              form.formState.errors.confirmPassword
                                ? "text-destructive"
                                : "text-muted-foreground"
                            )}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {form.formState.errors.confirmPassword
                              ? form.formState.errors.confirmPassword.message
                              : "Digite a nova senha novamente"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </FormItem>
              )}
            />

            <div className="w-full">
              <Button type="submit" disabled={isLoading} className="w-full">
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}