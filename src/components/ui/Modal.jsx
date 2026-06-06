const Modal = ({ isOpen, children }) => {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="pixel-panel p-6 w-full max-w-md animate-bounce-in">
                {children}
            </div>
        </div>
    )
}

export default Modal