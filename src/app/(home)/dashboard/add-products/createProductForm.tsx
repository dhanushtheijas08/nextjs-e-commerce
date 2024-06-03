"use client";
import { createProductAction } from "@/actions/productAction";
import TextEditor from "@/components/dashboard/products/text-editor";
import Heading from "@/components/heading";
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
import { Product, productSchema } from "@/schema/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DollarSign } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateProductForm = () => {
  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: "",
      name: "",
      price: 0,
      description: "",
    },
  });

  const { execute, status } = useAction(createProductAction, {
    onSuccess: (data) => {
      console.log(data);

      if (data.status === "success") {
        toast.success(data.message);
        form.reset();
      } else {
        toast.error(data.message[0]);
      }
    },
  });
  const onSubmit = (values: Product) => {
    execute(values);
  };
  return (
    <div className="space-y-5 flex flex-col py-5">
      <Heading className="pl-10">Create Product</Heading>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 pl-10 max-w-lg"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Sample Product Name"
                    {...field}
                    disabled={status === "executing" ? true : false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <TextEditor
                    value={field.value}
                    disabled={status === "executing" ? true : false}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center">
                    <DollarSign className="h-9 w-9 rounded bg-muted p-1.5" />
                    <Input
                      placeholder="$5"
                      {...field}
                      type="number"
                      disabled={status === "executing" ? true : false}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={status === "executing" ? true : false}>
            Create Product
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateProductForm;
