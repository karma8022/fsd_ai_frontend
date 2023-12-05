import './App.css';
import YTComponent from './components/YTComponent';


function App() {
  return (
    <div className="App">
      <div className="flex items-center justify-between mb-2 mt-24">
      <h1 className="text-2xl font-bold text-white mx-1 my-auto"><a href="http://localhost:3000/">Attendance</a></h1>
      
      <h1 className="text-4xl font-bold text-white mx-auto my-auto">infoFLOW</h1>

      </div>
      <YTComponent />
    </div>
  );
}

export default App;
