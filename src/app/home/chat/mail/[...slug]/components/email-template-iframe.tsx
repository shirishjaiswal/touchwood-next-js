"use client";

import React from "react";

type EmailTemplateIframeProps = {
	body: string;
};

export default function EmailTemplateIframe({ body }: EmailTemplateIframeProps) {
	return (
		<iframe
			srcDoc={body}
			className="w-full h-full bg-white pointer-events-none"
			style={{ border: "none" }}
			sandbox=""
			tabIndex={-1}
		/>
	);
}
