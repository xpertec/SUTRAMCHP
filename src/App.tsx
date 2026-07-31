import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Nosotros from "./pages/Nosotros";
import Directiva from "./pages/Directiva";
import Normativa from "./pages/Normativa";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/blog"
        element={
          <Layout>
            <Blog />
          </Layout>
        }
      />
      <Route
        path="/blog/:slug"
        element={
          <Layout>
            <BlogPost />
          </Layout>
        }
      />
      <Route
        path="/nosotros"
        element={
          <Layout>
            <Nosotros />
          </Layout>
        }
      />
      <Route
        path="/directiva"
        element={
          <Layout>
            <Directiva />
          </Layout>
        }
      />
      <Route
        path="/normativa"
        element={
          <Layout>
            <Normativa />
          </Layout>
        }
      />
      <Route
        path="/contacto"
        element={
          <Layout>
            <Contacto />
          </Layout>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
