import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// import HomePage from "./pages/HomePage";
// import PageNotFound from "./pages/PageNotFound";
// import Pricing from "./pages/Pricing";
// import Product from "./pages/Product";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";

import SpinnerFullPage from "./components/SpinnerFullPage";
import CityList from "./components/CityList";
import City from "./components/City";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesProvider";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

function App() {
    return (
        <div>
            <AuthProvider>
                <CitiesProvider>
                    <BrowserRouter>
                        <Suspense fallback={<SpinnerFullPage />}>
                            <Routes>
                                <Route index element={<HomePage />} />
                                <Route path="pricing" element={<Pricing />} />
                                <Route path="product" element={<Product />} />
                                <Route path="login" element={<Login />} />
                                <Route
                                    path="app"
                                    element={
                                        <ProtectedRoute>
                                            <AppLayout />
                                        </ProtectedRoute>
                                    }
                                >
                                    <Route
                                        index
                                        element={
                                            <Navigate to="cities" replace />
                                        }
                                    />
                                    <Route
                                        path="cities"
                                        element={<CityList />}
                                    />
                                    <Route
                                        path="cities/:id"
                                        element={<City />}
                                    />
                                    <Route
                                        path="countries"
                                        element={<CountryList />}
                                    />
                                    <Route
                                        path="countries"
                                        element={<p>countries</p>}
                                    />
                                    <Route path="form" element={<Form />} />
                                </Route>
                                <Route path="*" element={<PageNotFound />} />
                            </Routes>
                        </Suspense>
                    </BrowserRouter>
                </CitiesProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
