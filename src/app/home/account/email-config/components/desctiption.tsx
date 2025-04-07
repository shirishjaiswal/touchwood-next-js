function Description() {
	return (
		<div className="w-full mx-auto px-6 py-8 bg-white shadow-md rounded-lg border border-gray-300">
			{/* Header Section */}
			<h1 className="text-2xl font-semibold text-gray-900 text-center">
				Secure Email Configuration
			</h1>
			<p className="text-sm text-gray-700 text-center mt-2">
				Configure an email account to send system notifications. Your
				credentials are encrypted before being stored and never exposed in plain
				text.
			</p>

			{/* Security Assurance */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="mt-6 border border-gray-300 bg-gray-50 p-5 rounded-md">
					<h2 className="text-lg font-medium text-gray-900">
						Security Measures
					</h2>
					<ul className="mt-2 space-y-2 text-sm text-gray-700">
						<li>
							<strong>Encryption:</strong> All credentials are encrypted before
							being stored.
						</li>
						<li>
							<strong>Secure Transmission:</strong> Data is sent over a
							protected HTTPS connection.
						</li>
						<li>
							<strong>Access Control:</strong> Only authorized users can
							configure email settings.
						</li>
					</ul>
				</div>

				{/* How It Works */}
				<div className="mt-6 p-5 border-l-4 border-gray-400 bg-gray-50">
					<h2 className="text-lg font-medium text-gray-900">How It Works</h2>
					<p className="text-sm text-gray-700 leading-relaxed">
						1. Only authorized users can access this configuration.
						<br />
						2. Credentials are encrypted before being securely stored.
						<br />
						3. Data is transmitted over a secure connection to prevent
						unauthorized access.
					</p>
				</div>
			</div>

			{/* Video Guide */}
			<div className="mt-8">
				<h2 className="text-lg font-medium text-gray-900 text-center">
					Video Guide
				</h2>
				<div className="mt-3 rounded-lg overflow-hidden shadow-md">
					<iframe
						width="100%"
						height="315"
						src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
						title="Secure Email Configuration Guide"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
						className="rounded-lg"
					></iframe>
				</div>
			</div>
		</div>
	);
}

export default Description;
