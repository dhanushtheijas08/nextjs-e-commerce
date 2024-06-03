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
  });

  const productData = products.map((product) => {
    return {
      id: product.id,
      title: product.name,
      price: product.price,
      variants: [],
      image: placeholderImage.src,
    };
  });

  return (
    <div className="pl-10 p-2 h-full">
      <Heading className="">Products</Heading>

      {products.length > 0 ? (
        <DataTable columns={columns} data={productData} />
      ) : (
        <div className="text-center text-gray-500">No products found</div>
      )}
    </div>
  );
};

export default ProductsPage;
