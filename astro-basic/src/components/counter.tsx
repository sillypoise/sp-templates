// create counter component
import { useState } from "react";

export default function Counter({
	children,
	count: initialCount,
}: {
	children: React.ReactNode;
	count: number;
}) {
	const [count, setCount] = useState(initialCount);
	const add = () => setCount((i) => i + 1);
	const subtract = () => setCount((i) => i - 1);

	return (
		<>
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold">{children}</h1>
				<p className="text-lg">Count: {count}</p>
				<div className="flex space-x-4">
					<button
						className="bg-sky-800 text-white px-4 py-2 rounded"
						onClick={add}
					>
						Add
					</button>
					<button
						className="bg-red-800 text-white px-4 py-2 rounded"
						onClick={subtract}
					>
						Subtract
					</button>
				</div>
			</div>
		</>
	);
}
