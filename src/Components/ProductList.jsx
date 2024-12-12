import { useState } from "react";
import UseApiCall from "../utils/customHook/useApiCall";
import ProductItem from "./ProductItem";
import Loader from "./Loader";

/*calling api using custom hooks*/

function ProductList() {
  const { data, isLoading, error } = UseApiCall(
    "https://dummyjson.com/products"
  );
  const [searchInput, setSearchInput] = useState("");
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error...</div>;
  }
  return (
    <div className="prdSection">
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search by name, category or tag"
          name="search"
          value={searchInput}
          className="searchInput"
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />{" "}
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <div className="productItem">
        {data &&
          data.products
            .filter(
              (item) =>
                item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
                item.category
                  .toLowerCase()
                  .includes(searchInput.toLowerCase()) ||
                item.tags
                  .flat()
                  .join()
                  .toLowerCase()
                  .includes(searchInput.toLowerCase())
            )
            .map((item) => (
              <ProductItem key={item.id} product={item} enableClick={true} />
            ))}
      </div>
    </div>
  );
}
export default ProductList;
