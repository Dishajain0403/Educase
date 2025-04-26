import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [_, setLocation] = useLocation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    // This is just UI design - no backend needed
    setLocation("/profile");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1 text-[#1D2226]">
        Signin to your PopX account
      </h1>
      <p className="text-[#6D7D8B] text-sm mb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <div className="text-[#6C25FF] text-xs font-normal">
                  Email Address
                </div>
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
                <div className="text-[#6C25FF] text-xs font-normal">
                  Password
                </div>
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

          <button
            type="submit"
            className="w-full bg-[#6C25FF] text-white py-3 h-auto font-medium mt-6 rounded text-center"
          >
            Login
          </button>
        </form>
      </Form>
    </div>
  );
}
