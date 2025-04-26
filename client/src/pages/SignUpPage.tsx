import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const signupSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyName: z.string().optional(),
  isAgency: z.enum(["yes", "no"]),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignUpPage() {
  const [_, setLocation] = useLocation();
  const [formComplete, setFormComplete] = useState(true); // Set to true to ensure purple button

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      password: "",
      companyName: "",
      isAgency: "yes",
    },
    mode: "onChange",
  });

  const onSubmit = (data: SignupFormValues) => {
    // This is just UI design - no backend needed
    setLocation("/profile");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1 text-[#1D2226]">
        Create your PopX account
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <div className="text-[#6C25FF] text-xs font-normal">
                  Full Name*
                </div>
                <FormControl>
                  <input
                    placeholder="Marry Doe"
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
                <div className="text-[#6C25FF] text-xs font-normal">
                  Phone number*
                </div>
                <FormControl>
                  <input
                    placeholder="Marry Doe"
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
                <div className="text-[#6C25FF] text-xs font-normal">
                  Email address*
                </div>
                <FormControl>
                  <input
                    placeholder="Marry Doe"
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
                <div className="text-[#6C25FF] text-xs font-normal">
                  Password*
                </div>
                <FormControl>
                  <input
                    type="password"
                    placeholder="Marry Doe"
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
                <div className="text-[#6C25FF] text-xs font-normal">
                  Company name
                </div>
                <FormControl>
                  <input
                    placeholder="Marry Doe"
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
              <FormItem className="space-y-1.5">
                <div className="text-[#6C25FF] text-xs font-normal">
                  Are you an Agency?*
                </div>
                <FormControl>
                  <div className="flex space-x-5">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="agency-yes"
                        checked={true}
                        className="w-4 h-4 accent-[#6C25FF]"
                        readOnly
                      />
                      <label
                        htmlFor="agency-yes"
                        className="cursor-pointer text-sm"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="agency-no"
                        checked={false}
                        className="w-4 h-4 accent-[#6C25FF]"
                        readOnly
                      />
                      <label
                        htmlFor="agency-no"
                        className="cursor-pointer text-sm"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <button
            type="submit"
            className="w-full bg-[#6C25FF] text-white py-3 h-auto font-medium mt-6 rounded text-center"
          >
            Create Account
          </button>
        </form>
      </Form>
    </div>
  );
}
