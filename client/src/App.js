import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/pages/Landing";
import TravelFeed from "./components/pages/TravelFeed";
import ProfilePage from "./components/pages/ProfilePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { DarkModeProvider } from "./context/DarkModeContext";

const httpLink = createHttpLink({
    uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // Return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});
function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div>
                    <DarkModeProvider>
                        <Header />
                        <Routes>
                            <Route
                                path="/"
                                element={<Landing />}
                            />
                            <Route
                                path="/travelfeed"
                                element={<TravelFeed />}
                            />
                            <Route
                                path="/me"
                                element={<ProfilePage />}
                            />
                            <Route
                                path="/profiles/:username"
                                element={<ProfilePage />}
                            />
                            <Route
                                path="/logout"
                                element={<Landing />}
                            />

                        </Routes>
                        <Footer />
                    </DarkModeProvider>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;