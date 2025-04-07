async function getTemplates() {
	const response = await fetch("/api/email-template/get-all-id-label");
	return await response.json();
}

export default getTemplates;
