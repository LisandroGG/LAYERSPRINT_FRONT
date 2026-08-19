import NavBar from "@components/NavBar/NavBar";
import FilamentsPage from "@pages/Filaments/Filaments";
import MachinesPage from "@pages/Machines/Machines";
import ProductsPage from "@pages/Products/Products";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

function App() {
	return (
		<div className="min-h-screen bg-ink">
			<Toaster richColors position="top-right" />
			<NavBar />
			<Routes>
				<Route path="/" element={<MachinesPage />} />
				<Route path="/machines" element={<MachinesPage />} />
				<Route path="/filaments" element={<FilamentsPage />} />
				<Route path="/products" element={<ProductsPage />} />
			</Routes>
		</div>
	);
}

export default App;
