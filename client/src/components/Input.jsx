import Input from "@mui/base/Input";

export default function MyApp(setProducts, products) {
  return (
    <Input
      onChange={(e) => setProducts({ ...products, product: e.target.value })}
    />
  );
}
