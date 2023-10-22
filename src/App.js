import packageJson from "../package.json";
function App() {
  return (
    <div className="App">
      <span className="font-bold text-black">{packageJson.version}</span>
      <p>git commit -m "Fet: Sua descrição da correção aqui"</p>
      <p>git commit -m "Fix: Sua descrição da correção aqui"</p>
      <p>git commit -m "Build: Sua descrição da correção aqui"</p>
    </div>
  );
}

export default App;
