import { ScrollArea } from "@/components/ui/scroll-area";
import prisma from "@/lib/db";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import Heading from "@/components/heading";

import placeholderImage from "@/placeholder.png";

const ProductsPage = async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      productVariant: {
        select: {
          id: true,
          color: true,
          name: true,
        },
      },
    },
  });
  const productData = products.map((product) => {
    return {
      id: product.id,
      title: product.name,
      price: product.price,
      productVariant: product.productVariant,
      image: placeholderImage.src,
    };
  });
  return (
    <div className="pl-10 p-2 h-full">
      <Heading className="py-6">Products</Heading>
      <DataTable columns={columns} data={productData} />
    </div>
  );
};

export default ProductsPage;
