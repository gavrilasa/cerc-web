const Footer = () => {
  return (
    <footer className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10 border-t text-center text-xs text-muted-foreground font-mono uppercase tracking-wide">
         <p>&copy; {new Date().getFullYear()} CERC Undip. Think Precisely, Build Wisely.</p>
    </footer>
  )
}

export default Footer