export const timeFormating = (time: string) => {
	const now = new Date()
	const date = new Date(time)

	const diff = now.getTime() - date.getTime()

	const oneDay = 24 * 60 * 60 * 1000
	const oneWeek = 7 * oneDay

	// Today
	if (now.toDateString() === date.toDateString()) {
		return `Today ${date.toLocaleDateString()}`
	}

	// Yesterday
	const yesterday = new Date()
	yesterday.setDate(now.getDate() - 1)

	if (yesterday.toDateString() === date.toDateString()) {
		return `Yesterday ${date.toLocaleDateString()}`
	}

	// This Week
	if (diff < oneWeek) {
		return `This Week ${date.toLocaleDateString()}`
	}

	return date.toLocaleDateString()
}