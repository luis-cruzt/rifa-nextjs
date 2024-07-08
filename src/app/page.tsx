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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Ingresa tu nombre completo",
  }),
  number: z.string(),
});

const pb = new PocketBase('https://pocketbase-production-fbf4.up.railway.app');

export default function Home() {

  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      number: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {    
    const data = {
      "name": values.name,
      "number": values.number,
  };
    try {
      const record = await pb.collection('raffle_numbers').create(data);
      console.log('Record created: ', record);
      router.push('/exito')
      form.reset();
    } catch (error: any) {      
      if(error.data.data.number.code == 'validation_not_unique'){
        toast.error("El número ya ha sido apartado.")
      }
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col justify-center bg-white overflow-hidden py-6 px-6">
      <div className="relative sm:mx-auto">
        <div className="mx-auto w-96">          
          <h3 className="text-2xl font-semibold leading-none tracking-tight mb-2">Segunda rifa por Aitana</h3>
          <p className="text-sm text-muted-foreground mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos error dolorem tempora quis, voluptatum nam nihil iure animi cum, minus.</p>
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
                name="number"
                render={({ field }) => (
                  <FormItem className="mb-8">
                    <FormLabel>Número deseado</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingresa el número que quieres" {...field} />
                    </FormControl>
                    <FormDescription>
                      Ingresa el número deseado entre el 1 y el 80.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Apartar número</Button>
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
