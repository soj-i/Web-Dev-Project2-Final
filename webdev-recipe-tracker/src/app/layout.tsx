
import "./globals.css";
import { RecipeEditContextProvider } from "./components/contexts/IdHandlingContext";
import { RecipeStepsContextProvider } from "./components/contexts/RecipeStepsContext";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RecipeEditContextProvider>
    <RecipeStepsContextProvider>
      
    <html lang="en">
      <body>
        {children}
        
      </body>
    </html>
    </RecipeStepsContextProvider>
    </RecipeEditContextProvider>
  );
}
