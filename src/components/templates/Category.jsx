import { Navbar, Tshirt, Jacket } from "../organisms";
import Pants from "../organisms/Category/Pants";
import Shoes from "../organisms/Category/Shoes";
import Short from "../organisms/Category/Shorts";

export default function Category({ param }) {
  return (
    <div style={{ background: "#F9F9F9" }}>
      <Navbar />
      {param === "tshirt" ? (
        <Tshirt />
      ) : param === "jacket" ? (
        <Jacket />
      ) : param === "shoes" ? (
        <Shoes />
      ) : param === "pants" ? (
        <Pants />
      ) : param === "short" ? (
        <Short />
      ) : (
        <div style={{ marginLeft: "30vw", marginTop: "15vw" }}>
          <h1>Oopss! no data for {param} category...</h1>
        </div>
      )}
    </div>
  );
}
