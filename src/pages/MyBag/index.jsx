import { Helmet } from "react-helmet";
import "./style.css";
import MyBag from "../../components/organisms/MyBag";

export default function MyBagPage() {
  return (
    <div className="showInAnimation">
      <Helmet>
        <title>Tuku - My Bag</title>
      </Helmet>
      <div className="displayColumn inDevelopment">
        {/* <h1>My Bag - In Development</h1> */}
      </div>
      {/* <Home /> */}
      <MyBag />
    </div>
  );
}
