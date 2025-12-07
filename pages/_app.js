// import "../styles/globals.css";
// import "@fortawesome/fontawesome-svg-core/styles.css";
// import "../lib/fontawesome";

// import { SidebarProvider } from "@/context/SidebarContext";

// function MyApp({ Component, pageProps }) {
//   return (
//     <SidebarProvider>
//       <Component {...pageProps} />
//     </SidebarProvider>
//   );
// }

// export default MyApp;

import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "../lib/fontawesome";

import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
