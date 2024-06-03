import prisma from "@/lib/db";
import CreateProductForm from "./createProductForm";

type ProductData = {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const AddProductsPage = async ({
  searchParams,
}: {
  searchParams: { id: string };
}) => {
  const { id } = searchParams;

  let productData: ProductData = {
    description: "",
    id: undefined,
    name: "",
    price: 0,
  };

  if (id) {
    const product = await prisma.product.findUnique({
      where: {
        id: +id,
      },
    });
    if (product) {
      productData = product;
    }
  }

  return (
    <section className="p-2">
      <CreateProductForm
        description={productData.description || ""}
        id={productData.id || undefined}
        name={productData.name || ""}
        price={productData.price || 0}
      />
    </section>
  );
};

export default AddProductsPage;
