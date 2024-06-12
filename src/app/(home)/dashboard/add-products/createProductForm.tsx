"use client";
import { createProductAction } from "@/actions/productAction";
import TextEditor from "@/components/dashboard/products/text-editor";
import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { useColor } from "react-color-palette";

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
import { AlertTriangleIcon, Trash2Icon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import NavigationBtn from "@/components/dashboard/products/navigation-btn";
import StepsIndicator from "@/components/dashboard/products/steps-indicator";
import MyColorPicker from "@/components/dashboard/color-picker";

type CreateProductFormProps = {
  id: number | undefined;
  name: string;
  description: string;
  price: number;
  productVariants: {
    id: number | undefined;
    name: string;
    color: number;
  }[];
};

const CreateProductForm = ({
  description,
  id,
  name,
  price,
  productVariants,
}: CreateProductFormProps) => {
  const router = useRouter();
  const [color, setColor] = useColor("rgb(86 30 203)");

  const productDefaultValues = {
    id: Number(id) || undefined,
    description: description || "",
    name: name || "",
    price: price || 0,
    variants: productVariants?.map((variant) => ({
      variantName: variant.name,
      variantColorCode: variant.color,
    })) || [{ variantColorCode: 0, variantName: "" }],
  };

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: productDefaultValues,
  });
  const {
    control,
    formState: { errors },
  } = form;
  const { execute, status } = useAction(createProductAction, {
    onSuccess: (data) => {
      if (data.status === "success") {
        toast.success(data.message);
        router.push("/dashboard/products");
        form.reset();
      } else {
        toast.error(data.message[0]);
      }
    },
  });

  const onSubmit = (values: Product) => {
    execute(values);
  };

  const { append, remove, fields } = useFieldArray({
    control,
    name: "variants",
  });

  const steps = [
    {
      id: "Step 1",
      name: "Add Product Detials",
      fields: ["name", "price", "description"],
    },
    {
      id: "Step 2",
      name: "Add Product variants",
      fields: fields
        ?.map((_, index) => [
          `variants.${index}.variantsName` as const,
          `variants.${index}.variantsColorCode` as const,
        ])
        .flat(),
    },
  ];

  const [currentStep, setCurrentStep] = useState(1);

  type FieldName = "name" | "price" | "description" | "variants";
  const next = async () => {
    const fields = steps[currentStep - 1].fields;

    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep <= steps.length) {
      if (currentStep === steps.length) {
        form.handleSubmit(onSubmit)();
      } else setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((step) => step - 1);
    }
  };

  const loading = status === "executing" ? true : false;
  return (
    <div className="space-y-5 flex flex-col py-5 max-w-3xl mx-auto">
      <Heading>{id ? "Edit Product" : "Create Product"}</Heading>
      <StepsIndicator currentStep={currentStep} steps={steps} />
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full space-y-8">
            {currentStep === 1 && (
              <>
                <div className="flex gap-4 w-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Sample Product"
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
                    name="price"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="$5"
                            {...field}
                            type="number"
                            disabled={status === "executing" ? true : false}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
              </>
            )}
            {currentStep === 2 && (
              <>
                {fields?.map((field, index) => (
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="item-1"
                    key={field.id}
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger
                        className={cn(
                          "relative !no-underline [&[data-state=closed]>button]:hidden [&[data-state=open]>.alert]:hidden",
                          errors?.variants?.[index] && "text-red-700"
                        )}
                      >
                        {`Product Variants ${index + 1}`}

                        <div
                          className="absolute right-8 border p-2 rounded-sm border-input bg-background hover:bg-accent hover:text-accent-foreground"
                          onClick={() => remove(index)}
                        >
                          <Trash2Icon className="h-4 w-4 " />
                        </div>
                        {errors?.variants?.[index] && (
                          <span className="alert absolute right-8">
                            <AlertTriangleIcon className="h-4 w-4   text-red-700" />
                          </span>
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div
                          className={cn(
                            "relative mb-4 gap-8 rounded-md border p-4 md:grid md:grid-cols-2"
                          )}
                        >
                          <FormField
                            control={form.control}
                            name={`variants.${index}.variantName`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Variant Name</FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    disabled={loading}
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`variants.${index}.variantColorCode`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Variant Color</FormLabel>
                                <FormControl>
                                  <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <MyColorPicker
                                      color={color}
                                      setColor={setColor}
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}

                <div className="mt-4 flex justify-center">
                  <Button
                    type="button"
                    className="flex justify-center"
                    size={"lg"}
                    onClick={() =>
                      append({
                        variantColorCode: 0,
                        variantName: "",
                      })
                    }
                  >
                    Add variants
                  </Button>
                </div>
              </>
            )}
          </div>
        </form>
      </Form>
      <NavigationBtn currentStep={currentStep} next={next} prev={prev} />
    </div>
  );
};

export default CreateProductForm;
