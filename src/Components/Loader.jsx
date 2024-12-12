import { ClimbingBoxLoader } from "react-spinners";
/*made a seprate component for loader wil be shown just need to import and show on conditional rendering*/
export default function Loader() {
  return (
    <div
      className="loaderSection"
      style={{
        display: "flex",
        width: "100%",
        height: "80vh",
        justifyContent: "center",
        alignItem: "center",
      }}
    >
      <ClimbingBoxLoader
        color="rgb(75 182 0)"
        loading={true}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p>Loading...</p>
    </div>
  );
}
