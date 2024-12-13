import { Footer } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function FooterComponent() {
  const navigate = useNavigate();
  return (
    <Footer container bgDark>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
          <Footer.Brand
            onClick={() => navigate("/")}
            src="/images/icon.png"
            alt="ShoppyGlobe Logo"
            name="shoppyGlobe-logo"
            className="hand"
          />
          <Footer.LinkGroup>
            <Footer.Link
              onClick={() => {
                navigate("/");
              }}
              className="hand"
            >
              Home
            </Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright
          onClick={() => {
            navigate("/");
          }}
          by="ShoppyGlobe"
          year={2024}
        />
      </div>
    </Footer>
  );
}
