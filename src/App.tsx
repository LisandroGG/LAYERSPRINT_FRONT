import NavBar from "@components/NavBar/NavBar";
import DashboardPage from "@pages/Dashboard/Dashboard";
import FilamentsPage from "@pages/Filaments/Filaments";
import MachinesPage from "@pages/Machines/Machines";
import ProductsPage from "@pages/Products/Products";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

const App = () => {
	return (
		<div className="flex h-screen flex-col bg-ink">
			<Toaster richColors position="top-right" />
			<NavBar />
			<main className="flex-1 overflow-hidden">
				<Routes>
					<Route path="/" element={<DashboardPage />} />
					<Route path="/machines" element={<MachinesPage />} />
					<Route path="/filaments" element={<FilamentsPage />} />
					<Route path="/products" element={<ProductsPage />} />
				</Routes>
			</main>
		</div>
	);
};

export default App;
