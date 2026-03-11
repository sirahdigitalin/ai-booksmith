import { motion } from "framer-motion";
import bookSpace from "@/assets/book-space.jpg";
import bookFairy from "@/assets/book-fairy.jpg";
import bookJungle from "@/assets/book-jungle.jpg";
import bookWedding from "@/assets/book-wedding.jpg";
import bookBirthday from "@/assets/book-birthday.jpg";

const books = [
  { img: bookSpace, title: "Space Adventure", tag: "Kids", gradient: "from-secondary to-secondary/70" },
  { img: bookFairy, title: "Fairy Tale", tag: "Kids", gradient: "from-primary to-primary/70" },
  { img: bookJungle, title: "Jungle Explorer", tag: "Kids", gradient: "from-green-600 to-green-500" },
  { img: bookBirthday, title: "Birthday Special", tag: "Gifts", gradient: "from-accent to-accent/70" },
  { img: bookWedding, title: "Wedding Story", tag: "Wedding", gradient: "from-primary to-secondary" },
];

const BookTypes = () => (
  <section id="book-types" className="py-28 bg-gradient-warm relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <span className="text-sm font-accent font-semibold text-primary uppercase tracking-widest mb-3 block">Our Collection</span>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
          Choose Your Book Type
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto text-lg">
          From kids' adventures to wedding memories — we print them all.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {books.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-card mb-4 aspect-[2/3] book-card">
              <img
                src={b.img}
                alt={b.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Tag */}
              <div className={`absolute top-3 right-3 px-3 py-1.5 rounded-full bg-gradient-to-r ${b.gradient} text-primary-foreground text-xs font-bold font-accent shadow-sm`}>
                {b.tag}
              </div>

              {/* Hover title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-primary-foreground font-display font-bold text-sm">Personalize →</span>
              </div>
            </div>
            <h3 className="font-display text-sm font-bold text-foreground text-center group-hover:text-primary transition-colors">
              {b.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BookTypes;
