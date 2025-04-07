function PageTitle({ title }: { title: string }) {
	return <h1 className="sticky top-16 font-bold text-2xl capitalize p-2 bg-white shadow-2xl z-30">{title}</h1>;
}

export default PageTitle;
