import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="py-12 bg-primary text-primary-foreground">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="The Printing House" className="h-12 w-auto rounded-full bg-primary-foreground p-1" />
          <div>
            <p className="font-display font-bold text-lg">The Printing House</p>
            <p className="text-sm opacity-70">Est. 2003 · We Print It Right</p>
          </div>
        </div>
        <div className="flex gap-8 text-sm opacity-70">
          <a href="#" className="hover:opacity-100 transition-opacity">About</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
          <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-primary-foreground/20 text-center text-sm opacity-50">
        © 2026 The Printing House. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
