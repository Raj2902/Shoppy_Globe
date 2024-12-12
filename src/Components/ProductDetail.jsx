import { useParams } from "react-router-dom";
import UseApiCall from "../utils/customHook/useApiCall";
import { useEffect, useState } from "react";
import ProductDetailItem from "./ProductDetailItem";
import Loader from "./Loader";

/*calling the products data and list from the api using custo hook api*/

export default function ProductDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = UseApiCall(
    "https://dummyjson.com/products"
  );
  if (error) {
    return <p>Error...</p>;
  } else if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="detailSection">
      {data &&
        data.products
          .filter((prd) => prd.id == id)
          .map((item) => <ProductDetailItem key={item.id} product={item} />)}
    </div>
  );
}
