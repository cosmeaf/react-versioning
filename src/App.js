import packageJson from "../package.json";
function App() {
  return (
    <div className="App">
      <span className="font-bold text-black">{packageJson.version}</span>
      <p>git commit -m "Fet: Novo Recurso"</p>
      <p>git commit -m "Fix: Correçao"</p>
      <p>git commit -m "Build: Nova Versão"</p>
      <p>MAIS UM</p>
    </div>
  );
}

export default App;
