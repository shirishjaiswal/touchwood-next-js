type AddationalSidebarProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

function AddationalSidebar({ open, onClose, children }: AddationalSidebarProps) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 backdrop-blur bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar (80% width), slides from right */}
      <div
        className={`fixed top-0 right-0 h-full w-10/12 bg-white z-50 transform transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-bold">Sidebar</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black"
          >
            ✕
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </>
  );
}

export default AddationalSidebar;
