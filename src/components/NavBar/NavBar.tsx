import { NavLink } from "react-router-dom";
import logo from "/assets/logo/icon-white.png";

const links = [
	{ to: "/machines", label: "Máquinas" },
	{ to: "/filaments", label: "Filamentos" },
	{ to: "/products", label: "Productos" },
	{ to: "/settings", label: "Configuración" },
];

export default function NavBar() {
	return (
		<nav className="flex items-center gap-6 bg-brand px-6 py-3">
			<div className="flex items-center gap-2">
				<img src={logo} alt="LayersPrint" className="h-7 w-7" />
				<span className="font-display text-sm font-semibold text-white">
					LayersPrint
				</span>
			</div>

			<div className="flex gap-1">
				{links.map((link) => (
					<NavLink
						key={link.to}
						to={link.to}
						className={({ isActive }) =>
							`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
								isActive
									? "bg-white text-brand-dark"
									: "text-white/80 hover:bg-brand-dark hover:text-white"
							}`
						}
					>
						{link.label}
					</NavLink>
				))}
			</div>
		</nav>
	);
}
