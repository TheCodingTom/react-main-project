import SignModal from "../components/SignModal";
import lock from "../images/lock-logo.png";

function ProtectedRoutePage() {
  return (
    <div className="protected-route-page">
      <h1>Login to see more!</h1>
      <p>
        Sorry, this content is available only for users that already have an
        account.
      </p>
      <img src={lock} className="logo" alt="image of a lock" />
      <SignModal />
    </div>
  );
}

export default ProtectedRoutePage;
