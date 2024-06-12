import prisma from "@/lib/db";
import CreateProductForm from "./createProductForm";

type ProductData = {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;

  productVariants?: {
    id: number | undefined;
    name: string;
    color: number;
  }[];
};

const AddProductsPage = async ({
  searchParams,
}: {
  searchParams: { id: string };
}) => {
  const { id } = searchParams;
  let productData: ProductData = {
    id: undefined,
    name: "",
    price: 0,
    description: "",
    productVariants: [
      {
        id: undefined,
        color: 0,
        name: "",
      },
    ],
  };

  if (id) {
    const product = await prisma.product.findUnique({
      where: {
        id: +id,
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
    if (product) {
      productData = { ...product };
    }
  }

  return (
    <section className="p-2">
      <CreateProductForm
        description={productData.description || ""}
        id={productData.id || undefined}
        name={productData.name || ""}
        price={productData.price || 0}
        productVariants={productData.productVariants || []}
      />
    </section>
  );
};

export default AddProductsPage;
