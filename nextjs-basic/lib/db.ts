class Counter {
	private count: number = 0;

	increment(amount: number = 1): number {
		this.count += amount;
		return this.count;
	}

	decrement(amount: number = 1): number {
		this.count -= amount;
		return this.count;
	}

	reset(value: number = 0): number {
		this.count = value;
		return this.count;
	}

	getValue(): number {
		return this.count;
	}
}

// Export a singleton instance
export const counter = new Counter();

