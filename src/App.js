import packageJson from "../package.json";
function App() {
  return (
    <div className="App">
      <span className="font-bold text-black">{packageJson.version}</span>{" "}
    </div>
  );
}

export default App;
