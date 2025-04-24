import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { insertUserSchema } from "@shared/schema";

const signupSchema = insertUserSchema.extend({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyName: z.string().optional(),
  isAgency: z.enum(["yes", "no"])
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const [_, setLocation] = useLocation();
  const { toast } = useToast();
  const [formComplete, setFormComplete] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      companyName: "",
      isAgency: "yes" // Set default as "yes" to match the screenshot
    },
    mode: "onChange"
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignupFormValues) => {
      const userData = {
        username: data.email,
        password: data.password,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        companyName: data.companyName,
        isAgency: data.isAgency
      };
      
      return apiRequest("POST", "/api/users/signup", userData);
    },
    onSuccess: () => {
      toast({
        title: "Account created",
        description: "Your account has been created successfully."
      });
      setLocation("/profile");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: SignupFormValues) => {
    mutate(data);
  };

  // Check form completeness on every change
  form.watch((data) => {
    const isValid = form.formState.isValid;
    setFormComplete(isValid);
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">Create your PopX account</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[#6C25FF] text-xs">Full Name*</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Marry Doe" 
                    {...field} 
                    className="p-3 border border-gray-300 rounded-md"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[#6C25FF] text-xs">Phone number*</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Marry Doe" 
                    {...field} 
                    className="p-3 border border-gray-300 rounded-md"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[#6C25FF] text-xs">Email address*</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Marry Doe" 
                    {...field} 
                    className="p-3 border border-gray-300 rounded-md"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[#6C25FF] text-xs">Password*</FormLabel>
                <FormControl>
                  <Input 
                    type="password" 
                    placeholder="Marry Doe" 
                    {...field} 
                    className="p-3 border border-gray-300 rounded-md"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[#6C25FF] text-xs">Company name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Marry Doe" 
                    {...field} 
                    className="p-3 border border-gray-300 rounded-md"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="isAgency"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[#6C25FF] text-xs">Are you an Agency?*</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-5"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="agency-yes" className="text-[#6C25FF] border-[#6C25FF]" />
                      <label htmlFor="agency-yes" className="text-sm">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="agency-no" className="text-[#6C25FF] border-[#6C25FF]" />
                      <label htmlFor="agency-no" className="text-sm">No</label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            disabled={isPending || !formComplete}
            className="w-full py-3 h-auto font-medium mt-6 rounded-md bg-[#6C25FF] text-white"
          >
            Create Account
          </Button>
        </form>
      </Form>
    </div>
  );
}
