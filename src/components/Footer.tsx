const Footer = () => {
  return <footer className="bg-primary py-8 border-t-2" style={{
    borderTopColor: 'hsl(45 65% 53%)'
  }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2" style={{
            color: 'white'
          }}>
              <span translate="no">MARMORARIA UNIÃO</span>  
            </h3>
            
            <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent mb-6" />
            <p className="font-sans text-sm" style={{
            color: 'hsl(40 40% 93%)'
          }}>
              © {new Date().getFullYear()} <span translate="no">Marmoraria União</span>. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;