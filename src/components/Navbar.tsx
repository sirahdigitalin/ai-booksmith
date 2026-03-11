import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const links = ["How It Works", "Book Types", "Pricing", "Create Your Book"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="The Printing House" className="h-11 w-auto" />
          <div className="hidden sm:block">
            <span className="font-display text-base font-bold text-foreground leading-none block">
              The Printing House
            </span>
            <span className="text-[10px] font-accent text-muted-foreground uppercase tracking-widest">
              We Print It Right
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium text-muted-foreground hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/5 transition-all duration-200"
            >
              {l}
            </a>
          ))}
          <Link
            to="/admin"
            className="ml-2 text-sm font-semibold text-secondary-foreground bg-secondary px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors"
          >
            Admin
          </Link>
        </div>

        <button className="md:hidden text-foreground p-2" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass border-b border-border/50 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm font-medium text-muted-foreground hover:text-primary p-3 rounded-lg hover:bg-primary/5 transition-all"
                  onClick={() => setOpen(false)}
                >
                  {l}
                </a>
              ))}
              <Link
                to="/admin"
                className="text-sm font-semibold text-secondary-foreground bg-secondary p-3 rounded-lg text-center mt-2"
                onClick={() => setOpen(false)}
              >
                Admin Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
