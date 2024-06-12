"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useAction } from "next-safe-action/hooks";
import { deleteProductAction } from "@/actions/productAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type Product = {
  id: number;
  price: number;
  title: string;
  productVariant: {
    id: number;
    color: number;
    name: string;
  }[];
  image: string;
};

const useActionCell = ({ row }: { row: Row<Product> }) => {
  const route = useRouter();
  const id = parseInt(row.getValue("id")!);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { execute, status } = useAction(deleteProductAction, {
    onSuccess: (data) => {
      if (data.status === "success") toast.success(data.message);
      else toast.error(data.message);
      setDialogOpen(false);
    },
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => route.push(`/dashboard/add-products?id=${id}`)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialogOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={dialogOpen} onOpenChange={() => setDialogOpen(true)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={status === "executing"}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={status === "executing"}
              onClick={() => execute({ id })}
            >
              {status === "executing" ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
const useTooltipCell = ({ row }: { row: Row<Product> }) => {
  const renderTooltip = row.original.productVariant.map((variant) => {
    return (
      <TooltipProvider key={variant.id} delayDuration={200}>
        <Tooltip>
          <TooltipTrigger className="h-7 w-7 rounded-full bg-red-300 cursor-pointer"></TooltipTrigger>
          <TooltipContent>
            <p> {variant.name} </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  });

  return <div className="flex gap-2">{renderTooltip}</div>;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",

    header: () => <div className="">Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-In", {
        style: "currency",
        currency: "INR",
      }).format(price);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: useTooltipCell,
  },
  {
    accessorKey: "image",

    header: () => <div className="">Image</div>,
    cell: ({ row }) => {
      const title = row.getValue("title");
      const image = row.getValue("image");

      return (
        <Image
          alt={title as string}
          src={image as string}
          className="h-10 w-10 rounded-md object-cover"
          width={40}
          height={40}
        />
      );
    },
  },
  {
    id: "actions",
    cell: useActionCell,
  },
];
