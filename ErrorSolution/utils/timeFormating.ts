


export const timeFormating = (date) => {
	now = new Date()
	time = new Date(time)
	diff = now - time
	
	const oneDay = 24 * 60 * 60 * 1000
	const oneWeek = 7 * oneDay

	if (now.toDateString() === time.toDateString()){
		return "Today"
	yesterday = new Date()
	yesterday.setDate(now.getDate() - 1)
	if (yesterday.toDateString() === time.setDateString()){
		return "Yesterday"
	if (diff < oneWeek){
		return "This Week"

	return time.toLocalDateString()
