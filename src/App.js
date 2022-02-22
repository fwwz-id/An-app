import { useCallback, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
// routes
import { routes } from "./config/routes/routes"

//utils
import { fetchMentor } from "./state/mentor/mentor-actions";
import { fetchModerator } from "./state/moderator/moderator-actions";
import { login } from "./state/auth/auth-services";
import { getPrensences } from "./state/presences/presence-actions";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth, presences } = useSelector((state) => state);

    const PrivateRoute = ({ children, auth }) => {
        if (!auth) return <Navigate to="/" />;

        return children;
    };

    const fetchData = useCallback(
        (identifier) => {
            switch (auth.as.role) {
                case "mentor":
                    return fetchMentor(`/${identifier}?expand=true`);
                case "moderator":
                    return fetchModerator(`/${identifier}?expand=true`);
                default:
                    return console.log("default state");
            }
        },
        [auth.as.role]
    );

    useEffect(() => {
        (async () => {
            try {
                if (auth.loggedIn) {
                    dispatch(fetchData(auth.as._id));
                    const now = new Date().toISOString()
                    getPrensences(`/presence/list/${auth.as._id}?date=${now.split('T')[0]}`)(dispatch)
                    return navigate("/dashboard");
                }

                dispatch(login("GET"));
            } catch (err) {
                return err;
            }
        })();

        // eslint-disable-next-line
    }, [fetchData, auth.as._id]);

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
