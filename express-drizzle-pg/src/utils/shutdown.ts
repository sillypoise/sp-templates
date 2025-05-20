const shutdownTasks: (() => void | Promise<void>)[] = [];

let isShuttingDown = false;

export const registerShutdown = (fn: () => void | Promise<void>): void => {
	shutdownTasks.push(fn);
};

export const runShutdownTasks = async (): Promise<void> => {
	if (isShuttingDown) return;
	isShuttingDown = true;

	for (const task of shutdownTasks) {
		try {
			await task();
		} catch (err) {
			console.error("❌ Error running shutdown task:", err);
		}
	}
};
