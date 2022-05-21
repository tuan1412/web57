import useAuth from "../hooks/useAuth";

function TestContext() {
  const { user } = useAuth();
  return <div>{user}</div>
}

export default TestContext;