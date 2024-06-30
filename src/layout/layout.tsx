import Header from "./Header/Header.layout.tsx";
// import Footer from "./Footer/Footer.layout.tsx";

function Layout({children}) {
    return (
        <div>
            <Header/>
                {children}
            {/*<Footer/>*/}
        </div>
    );
}

export default Layout;
