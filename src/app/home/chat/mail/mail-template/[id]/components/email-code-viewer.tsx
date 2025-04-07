import ClickButton from "@/components/ui/button/click-button";

type EmailCodeViewerProps = {
	emailCode: string;
	showView: "code" | "view";
	setShowView: (view: "code" | "view") => void;
};

function EmailCodeViewer({
	emailCode,
	showView,
	setShowView,
}: EmailCodeViewerProps) {
	return (
		<div
			className={`w-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 ${
				showView === "code" ? "hidden md:flex" : ""
			} min-h-0 flex-1`}
		>
			<div className="p-4 md:py-6 border-b border-gray-200">
				<div className="flex justify-between items-center">
					<h2 className="text-lg font-semibold text-gray-800">Email Preview</h2>
					<ClickButton
						id="run-template"
						variant="outline-default"
						size="xs"
						onClick={() => setShowView("code")}
						className="block md:hidden"
					>
						Show Code
					</ClickButton>
				</div>
			</div>
			<div className="flex-1 p-4 min-h-0">
				<iframe
					srcDoc={emailCode}
					className="w-full h-full border border-gray-200 rounded-md bg-white"
					title="Email Preview"
				/>
			</div>
		</div>
	);
}

export default EmailCodeViewer;
