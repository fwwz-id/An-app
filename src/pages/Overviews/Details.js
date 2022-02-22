import { useState } from "react";
import { useSelector } from "react-redux";

// components
import Layout from "../../components/organism/Layout";
import Charts from "../../components/molecules/Charts";
import Sweetalert from "../../components/molecules/Sweetalert";

function Details() {
    const {
        auth: { as },
    } = useSelector((state) => state);
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Layout>
            {isOpen && (
                <Sweetalert
                    className="flex justify-between items-center space-x-3"
                    isOpen={isOpen}
                    message="this feature is under development"
                >
                    <button
                        className="btn btn-primary"
                        onClick={() => setIsOpen(false)}
                    >
                        Oke
                    </button>
                </Sweetalert>
            )}
            <div className="container">
                <header className="text-center py-10">
                    <h3>{as.username}</h3>
                </header>
                <Charts type="radar" />
            </div>
        </Layout>
    );
}

export default Details;
