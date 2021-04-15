import './App.css';
import AppLayout from "./components/AppLayout";
import AppButton from "./components/AppButton";

function App() {
  return (
    <AppLayout>
      <h2>Dashboard</h2>
      <AppButton action={() => console.log('ok')}>Ok</AppButton>
    </AppLayout>
  );
}

export default App;
