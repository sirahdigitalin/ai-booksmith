import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="py-16 bg-gradient-royal text-secondary-foreground">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4">
          <img src={logo} alt="The Printing House" className="h-14 w-auto" />
          <div>
            <p className="font-display font-bold text-lg">The Printing House</p>
            <p className="text-sm opacity-70 font-accent">Est. 2003 · We Print It Right</p>
          </div>
        </div>
        <div className="flex gap-8 text-sm opacity-70 font-accent">
          <a href="#" className="hover:opacity-100 hover:text-accent transition-all">About</a>
          <a href="#" className="hover:opacity-100 hover:text-accent transition-all">Contact</a>
          <a href="#" className="hover:opacity-100 hover:text-accent transition-all">Privacy</a>
          <a href="#" className="hover:opacity-100 hover:text-accent transition-all">Terms</a>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-secondary-foreground/15 text-center text-sm opacity-40 font-accent">
        © 2026 The Printing House. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
