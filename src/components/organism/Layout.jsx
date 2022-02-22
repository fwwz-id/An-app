import Sidebar from "../molecules/Sidebar";

function Layout({ children }) {
    return (
        <div className="relative w-screen">
            <Sidebar />
            {children}
        </div>
    );
}

export default Layout;
