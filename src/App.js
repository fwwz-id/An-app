import { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
// routes
import { routes } from "./config/routes/routes"

//utils
import { login } from "./state/auth/auth-services";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state);

    const PrivateRoute = ({ children, auth }) => {
        if (!auth) return <Navigate to="/" />;

        return children;
    };

    useEffect(() => {
        (async () => {
            try {
                if (auth.loggedIn) {
                    return navigate("/dashboard");
                }

                dispatch(login("GET"));
            } catch (err) {
                return err;
            }
        })();

        // eslint-disable-next-line
    }, [auth.as._id]);

    return (
        <div className="App relative min-h-screen bg-trueGray-300 overflow-x-hidden">
            <Routes>
                {
                    //
                    routes.map(
                        ({ path, element: Component, isProtected }, key) => (
                            <Route
                                key={key}
                                path={path}
                                element={
                                    isProtected ? (
                                        <PrivateRoute auth={auth.loggedIn}>
                                            <Component />
                                        </PrivateRoute>
                                    ) : (
                                        <Component />
                                    )
                                }
                            />
                        )
                    )
                }
            </Routes>
        </div>
    );
}

export default App;
