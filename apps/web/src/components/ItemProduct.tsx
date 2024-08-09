import useGetProducts from '@/hooks/product/useGetProducts';
import { SelectContent, SelectItem } from './ui/select';

const ItemProduct = () => {
  const { data: products } = useGetProducts();
  return (
    <SelectContent>
      {products.map((product, index) => {
        return (
          <SelectItem key={index} value={`${product.id}`}>
            {product.name}
          </SelectItem>
        );
      })}
    </SelectContent>
  );
};

export default ItemProduct;
