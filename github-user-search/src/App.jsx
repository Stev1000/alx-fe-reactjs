import Search from "./components/Search";

function App() {
  return (
    <div className="p-10 max-w-3xl mx-auto text-center">
      <h1 className="text-6xl font-extrabold text-red-500 underline mb-10">
        GitHub User Search
      </h1>
      <Search />
    </div>
  );
}

export default App;
