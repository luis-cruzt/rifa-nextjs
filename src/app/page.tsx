"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PocketBase from 'pocketbase';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Ingresa tu nombre completo",
  }),
  number: z.string().min(1, {
    message: "Ingresa el número que deseas",
  }),
  phone: z.string().min(1, {
    message: "Ingresa el número de contacto",
  })
});

const pb = new PocketBase('https://pocketbase-production-fbf4.up.railway.app');

export default function Home() {

  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      number: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {    
    if(parseInt(values.number) < 0 || parseInt(values.number) > 80){
      toast.error("Ingresa un número entre 1 y 80.");
      return;
    }    

    const data = {
      "name": values.name,
      "number": values.number,
      "phone": values.phone,
  };
    try {
      setIsLoading(true);
      const record = await pb.collection('raffle_numbers').create(data);      
      setIsLoading(false);
      toast.success(`Número ${values.number} apartado con éxito.`);
      form.setValue('number', '');
    } catch (error: any) {
      setIsLoading(false);      
      if(error.data.data.number.code == 'validation_not_unique'){
        toast.error("El número ya ha sido apartado.")
      }
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-center bg-white py-6 px-6">
      <div className="relative sm:mx-auto">
        <div className="mx-auto md:w-96">          
          <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">Rifa por Aitana</h3>
          <p className="text-sm text-muted-foreground mb-4">Apoyemos a nuestra compañerita Aitana, todo suma cuando se da desde el corazón ❤️</p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Nombre Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresa tu nombre completo" {...field} />
                    </FormControl>                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Número de contacto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresa el número de contacto"
                      type="number"
                      {...field} />
                    </FormControl>                    
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem className="mb-8">
                    <FormLabel>Número deseado</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresa el número que quieres" type="tel" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ingresa el número deseado entre el 1 y el 80.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                Apartar número
                </Button>
            </form>
          </Form>
          {/* <div className="grid grid-cols-10 gap-x-12 gap-y-4 mt-6">
            {Array.from({ length: 80 }, (_, index) => (
              <div
                key={index + 1}
                className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full"
              >
                {index + 1}
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
