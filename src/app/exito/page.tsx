import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function LoginForm() {
   
  return (
    <div className="relative flex min-h-screen flex-col justify-center bg-white overflow-hidden py-6 px-6">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-check text-green-500 mx-auto mb-2"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
            <CardTitle className="text-2xl text-center">Registro exitoso</CardTitle>
            <CardDescription className="text-center">
              Tu número de la rifa ha sido registrado exitosamente.
            </CardDescription>
          </CardHeader>
          <CardContent>          
          </CardContent>
        </Card>
    </div>
  )
}
