import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { insertUserSchema } from "@shared/schema";

const signupSchema = insertUserSchema.extend({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyName: z.string().optional(),
  isAgency: z.enum(["yes", "no"]),
  description: z.string().optional()
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
      isAgency: "yes", 
      description: ""
    },
    mode: "onChange"
  });

  const isAgencyValue = form.watch("isAgency");

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignupFormValues) => {
      const userData = {
        username: data.email,
        password: data.password,
        fullName: data.fullName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        companyName: data.companyName || "",
        isAgency: data.isAgency,
        description: data.description || ""
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

  // Watch form values to check completeness
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      const isValid = form.formState.isValid;
      setFormComplete(isValid);
    });
    return () => subscription.unsubscribe();
  }, [form.watch, form.formState]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1 text-[#1D2226]">Create your PopX account</h1>
      <p className="text-[#6D7D8B] text-sm mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <div className="text-[#6C25FF] text-xs font-normal">Full Name*</div>
                <FormControl>
                  <input 
                    placeholder="Enter full name" 
                    {...field} 
                    className="w-full p-3 border border-gray-300 rounded bg-white text-sm"
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
                <div className="text-[#6C25FF] text-xs font-normal">Phone number*</div>
                <FormControl>
                  <input 
                    placeholder="Enter phone number" 
                    {...field} 
                    className="w-full p-3 border border-gray-300 rounded bg-white text-sm"
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
                <div className="text-[#6C25FF] text-xs font-normal">Email address*</div>
                <FormControl>
                  <input 
                    type="email" 
                    placeholder="Enter email address" 
                    {...field} 
                    className="w-full p-3 border border-gray-300 rounded bg-white text-sm"
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
                <div className="text-[#6C25FF] text-xs font-normal">Password*</div>
                <FormControl>
                  <input 
                    type="password" 
                    placeholder="Enter password" 
                    {...field} 
                    className="w-full p-3 border border-gray-300 rounded bg-white text-sm"
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
                <div className="text-[#6C25FF] text-xs font-normal">Company name</div>
                <FormControl>
                  <input 
                    placeholder="Enter company name" 
                    {...field} 
                    className="w-full p-3 border border-gray-300 rounded bg-white text-sm"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="isAgency"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="text-[#6C25FF] text-xs font-normal">Are you an Agency?*</div>
                <FormControl>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="agency-yes" 
                        value="yes" 
                        checked={field.value === "yes"} 
                        onChange={() => field.onChange("yes")}
                        className="w-4 h-4 accent-[#6C25FF]"
                      />
                      <label htmlFor="agency-yes" className="cursor-pointer text-sm">Yes</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        id="agency-no" 
                        value="no" 
                        checked={field.value === "no"} 
                        onChange={() => field.onChange("no")}
                        className="w-4 h-4 accent-[#6C25FF]"
                      />
                      <label htmlFor="agency-no" className="cursor-pointer text-sm">No</label>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          
          {isAgencyValue === "yes" && (
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <div className="text-[#6C25FF] text-xs font-normal">Add a description</div>
                  <FormControl>
                    <textarea
                      placeholder="Enter description" 
                      {...field} 
                      className="w-full p-3 border border-gray-300 rounded bg-white text-sm min-h-[100px] resize-none"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
          
          <button 
            type="submit" 
            disabled={isPending}
            className={`w-full py-3 h-auto font-medium mt-6 rounded text-white text-base ${formComplete ? 'bg-[#6C25FF]' : 'bg-[#CBCBCB]'}`}
          >
            Create Account
          </button>
        </form>
      </Form>
    </div>
  );
}
