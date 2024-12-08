"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarUpload } from "./avatar-upload";
import { Profile, useProfile } from "@/contexts/profile-context";
import { toast } from "sonner";

const profileSchema = z
  .object({
    name: z.string(),
    email: z.string().email("Email inválido"),
    cpf: z.string(),
    ddd: z.string(),
    phone: z.string(),
    avatarUrl: z.string(),
  })
  .partial();

export function ProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { profile, updateProfile } = useProfile();

  const form = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    defaultValues: profile,
  });

  useEffect(() => {
    if (profile) {
      form.reset(profile);
    }
  }, [form, profile]);

  const onSubmit = async (data: Profile) => {
    try {
      setIsLoading(true);
      updateProfile(data);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Erro ao atualizar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center mb-6">
          <AvatarUpload
            currentImageUrl={profile.avatarUrl}
            onImageUpload={(url) => {
              form.setValue("avatarUrl", url);
              updateProfile({ avatarUrl: url });
            }}
          />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ddd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DDD</FormLabel>
                    <FormControl>
                      <Input {...field} maxLength={2} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
