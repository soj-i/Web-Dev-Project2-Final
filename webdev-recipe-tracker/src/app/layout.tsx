
import "./globals.css";
import { RecipeEditContextProvider } from "./IdHandlingContext";
import { RecipeStepsContextProvider } from "./RecipeStepsContext";


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
