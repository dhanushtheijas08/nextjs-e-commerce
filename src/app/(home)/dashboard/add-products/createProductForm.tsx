"use client";
import { createProductAction } from "@/actions/productAction";
import TextEditor from "@/components/dashboard/products/text-editor";
import Heading from "@/components/heading";
import { Separator } from "@/components/ui/separator";

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
import {
  AlertTriangleIcon,
  ChevronLeft,
  ChevronRight,
  Trash2Icon,
} from "lucide-react";
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

  const [page, setPage] = useState(0);

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
      <Heading className="">{id ? "Edit Product" : "Create Product"}</Heading>
      <Separator />
      <div className="max-w-3xl">
        <ul className="flex gap-4">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              {page > index ? (
                <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-sky-600 transition-colors ">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : page === index ? (
                <div
                  className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                  aria-current="step"
                >
                  <span className="text-sm font-medium text-sky-600">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              ) : (
                <div className="group flex h-full w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                  <span className="text-sm font-medium text-gray-500 transition-colors">
                    {step.id}
                  </span>
                  <span className="text-sm font-medium">{step.name}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
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
                        {`Work Experience ${index + 1}`}

                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute right-8"
                          onClick={() => remove(index)}
                        >
                          <Trash2Icon className="h-4 w-4 " />
                        </Button>
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
                                  <Input
                                    type="number"
                                    disabled={loading}
                                    {...field}
                                  />
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
      <div className="mt-8 pt-5">
        <div className="flex justify-between">
          <button
            type="button"
            onClick={prev}
            disabled={currentStep === 0}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            // disabled={currentStep === steps.length - 1}
            className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProductForm;
