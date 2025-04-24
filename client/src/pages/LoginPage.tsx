import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      return apiRequest("POST", "/api/users/login", {
        username: data.email,
        password: data.password
      });
    },
    onSuccess: () => {
      toast({
        title: "Logged in",
        description: "You have been logged in successfully."
      });
      setLocation("/profile");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Invalid email or password.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };

  return (
    <div className="py-6 md:py-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login to your PopX account</h1>
      <p className="text-muted-foreground mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Email address<span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Enter email address" 
                    {...field} 
                    className="p-3 bg-input"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Password<span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Enter password" 
                    {...field} 
                    className="p-3 bg-input"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full bg-primary text-white py-6 h-auto font-medium"
          >
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
