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
export type Product = {
  id: number;
  price: number;
  title: string;
  variants: any;
  image: string;
};

const useActionCell = ({ row }: { row: Row<Product> }) => {
  const route = useRouter();
  const id = parseInt(row.getValue("id")!);
  const { execute } = useAction(deleteProductAction, {
    onSuccess: (data) => {
      if (data.status === "success") toast.success(data.message);
      else toast.error(data.message);
    },
  });

  return (
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
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={() => execute({ id })}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
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
