import "./globals.css";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
    >
      <body className="min-h-screen bg-[#1F2833]">
        {children}
      </body>
    </html>
  );
}
