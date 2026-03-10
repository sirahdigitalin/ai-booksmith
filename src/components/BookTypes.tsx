import { motion } from "framer-motion";
import bookSpace from "@/assets/book-space.jpg";
import bookFairy from "@/assets/book-fairy.jpg";
import bookJungle from "@/assets/book-jungle.jpg";
import bookWedding from "@/assets/book-wedding.jpg";
import bookBirthday from "@/assets/book-birthday.jpg";

const books = [
  { img: bookSpace, title: "Space Adventure", tag: "Kids" },
  { img: bookFairy, title: "Fairy Tale", tag: "Kids" },
  { img: bookJungle, title: "Jungle Explorer", tag: "Kids" },
  { img: bookBirthday, title: "Birthday Special", tag: "Gifts" },
  { img: bookWedding, title: "Wedding Story", tag: "Wedding" },
];

const BookTypes = () => (
  <section id="book-types" className="py-24 bg-gradient-warm">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Choose Your Book Type
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          From kids' adventures to wedding memories — we print them all.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {books.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative rounded-xl overflow-hidden shadow-card mb-3 aspect-[2/3]">
              <img
                src={b.img}
                alt={b.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-primary/80 text-primary-foreground text-xs font-semibold">
                {b.tag}
              </div>
            </div>
            <h3 className="font-display text-sm font-semibold text-foreground text-center">
              {b.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BookTypes;
