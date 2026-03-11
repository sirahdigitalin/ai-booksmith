import bookSpace from "@/assets/book-space.jpg";
import bookFairy from "@/assets/book-fairy.jpg";
import bookJungle from "@/assets/book-jungle.jpg";
import bookWedding from "@/assets/book-wedding.jpg";
import bookBirthday from "@/assets/book-birthday.jpg";

export interface TemplatePage {
  pageNumber: number;
  text: string;
  illustration: string;
}

export interface BookTemplate {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  ageRange: string;
  tags: string[];
  pageCount: number;
  theme: string;
  storyTemplate: TemplatePage[];
}

export const bookTemplates: BookTemplate[] = [
  {
    id: "space-explorer",
    title: "The Little Space Explorer",
    coverImage: bookSpace,
    description: "Blast off on an intergalactic adventure through stars, planets, and nebulae!",
    ageRange: "3-8",
    tags: ["Adventure", "Kids"],
    pageCount: 10,
    theme: "space",
    storyTemplate: [
      { pageNumber: 1, text: "One starry night, {name} looked up at the sky and whispered, 'I want to see the stars up close!' A shimmering rocket appeared in the garden.", illustration: "🚀" },
      { pageNumber: 2, text: "With a countdown from ten, {name} blasted off! The Earth shrank below like a beautiful blue marble. 'Wow!' {name} gasped.", illustration: "🌍" },
      { pageNumber: 3, text: "{name} zoomed past the Moon, waving at the craters. A friendly moon rabbit hopped along the surface, waving back.", illustration: "🌙" },
      { pageNumber: 4, text: "Next stop - Mars! The red planet was covered in swirling dust storms. {name} planted a flag that read: '{name} Was Here!'", illustration: "🔴" },
      { pageNumber: 5, text: "Floating through the asteroid belt, {name} dodged space rocks like a pro pilot. Each asteroid sparkled with hidden crystals.", illustration: "💎" },
      { pageNumber: 6, text: "Saturn's rings were the most magical - they shimmered like a cosmic rainbow. {name} slid along one like a slide!", illustration: "🪐" },
      { pageNumber: 7, text: "A group of friendly aliens invited {name} for a space picnic. They shared glowing fruit that tasted like strawberries and stardust.", illustration: "👽" },
      { pageNumber: 8, text: "{name} discovered a brand-new star and named it after someone special. It glowed warm and bright, just like {name}'s smile.", illustration: "⭐" },
      { pageNumber: 9, text: "As the rocket turned homeward, {name} looked back at the galaxy - millions of lights twinkling just for this brave explorer.", illustration: "🌌" },
      { pageNumber: 10, text: "Back home, {name} snuggled into bed. 'I will go back tomorrow,' {name} whispered, already dreaming of new adventures among the stars. The End.", illustration: "🌟" },
    ],
  },
  {
    id: "enchanted-kingdom",
    title: "The Enchanted Kingdom",
    coverImage: bookFairy,
    description: "Enter a magical kingdom of fairies, castles, and enchanted forests.",
    ageRange: "3-7",
    tags: ["Fantasy", "Kids"],
    pageCount: 10,
    theme: "fairy",
    storyTemplate: [
      { pageNumber: 1, text: "Deep in an ancient forest, {name} found a tiny golden door at the base of an old oak tree. With a gentle push, it swung open.", illustration: "🚪" },
      { pageNumber: 2, text: "Inside was a kingdom of light! Tiny fairies with glittering wings flew around {name}, showering sparkles everywhere.", illustration: "🧚" },
      { pageNumber: 3, text: "The Fairy Queen welcomed {name} warmly. 'We have been waiting for you, brave one. Our kingdom needs a hero!'", illustration: "👑" },
      { pageNumber: 4, text: "A mischievous troll had stolen the Crystal of Joy, and without it, the flowers could not bloom. {name} volunteered to help.", illustration: "🌺" },
      { pageNumber: 5, text: "{name} crossed the Whispering Bridge, where the wind sang lullabies and the river below sparkled like liquid silver.", illustration: "🌉" },
      { pageNumber: 6, text: "In the Enchanted Grove, talking animals joined {name}'s quest - a wise owl, a brave fox, and a cheerful hedgehog.", illustration: "🦊" },
      { pageNumber: 7, text: "The troll's cave was dark and echoey. But {name} was not afraid. With kindness, {name} asked the troll why he took the crystal.", illustration: "🗻" },
      { pageNumber: 8, text: "'I was lonely,' the troll sniffled. {name} offered friendship, and the troll's heart softened. He returned the Crystal of Joy.", illustration: "💝" },
      { pageNumber: 9, text: "Flowers burst into bloom across the kingdom! The fairies danced, the animals cheered, and the Fairy Queen crowned {name} a Friend of the Realm.", illustration: "🌸" },
      { pageNumber: 10, text: "{name} stepped back through the golden door, heart full of magic. 'Every act of kindness is its own kind of magic.' The End.", illustration: "✨" },
    ],
  },
  {
    id: "jungle-adventure",
    title: "The Great Jungle Adventure",
    coverImage: bookJungle,
    description: "Swing through vines, befriend wild animals, and discover hidden treasures!",
    ageRange: "4-9",
    tags: ["Adventure", "Nature"],
    pageCount: 10,
    theme: "jungle",
    storyTemplate: [
      { pageNumber: 1, text: "{name} stood at the edge of a thick, green jungle. Strange calls echoed through the trees. 'Let us explore!' {name} said bravely.", illustration: "🌴" },
      { pageNumber: 2, text: "A colorful parrot landed on {name}'s shoulder. 'Follow me!' it squawked. 'I know where the Hidden Waterfall is!'", illustration: "🦜" },
      { pageNumber: 3, text: "Swinging on vines like a real adventurer, {name} crossed a wide ravine. Below, a river sparkled in the sunlight.", illustration: "🌿" },
      { pageNumber: 4, text: "A baby elephant was stuck in the mud! {name} helped pull it free. The grateful elephant trumpeted with joy and nuzzled {name}.", illustration: "🐘" },
      { pageNumber: 5, text: "Deeper in the jungle, {name} found ancient stone carvings on a mossy wall. They told the story of a lost treasure.", illustration: "🗿" },
      { pageNumber: 6, text: "A troop of playful monkeys invited {name} to share some bananas. They chattered and laughed, pointing the way forward.", illustration: "🐒" },
      { pageNumber: 7, text: "The path led to a cave behind a roaring waterfall. {name} took a deep breath and stepped through the curtain of water.", illustration: "💧" },
      { pageNumber: 8, text: "Inside the cave, golden light filled the chamber. The treasure was not gold - it was a garden of glowing, magical flowers!", illustration: "🌺" },
      { pageNumber: 9, text: "{name} picked one flower. 'This is the real treasure,' {name} whispered. 'Beauty and wonder are all around us.'", illustration: "🌟" },
      { pageNumber: 10, text: "Walking home through the emerald jungle, {name} smiled. Every rustle and chirp was a friend saying goodbye - until next time. The End.", illustration: "🌈" },
    ],
  },
  {
    id: "birthday-surprise",
    title: "The Birthday Surprise",
    coverImage: bookBirthday,
    description: "A magical birthday adventure filled with surprises, cakes, and wishes coming true!",
    ageRange: "2-8",
    tags: ["Birthday", "Gifts"],
    pageCount: 10,
    theme: "birthday",
    storyTemplate: [
      { pageNumber: 1, text: "{name} woke up to sunshine streaming through the window. Today was a very special day - {name} was turning {age}!", illustration: "🌞" },
      { pageNumber: 2, text: "Downstairs, the house was quiet. Too quiet. Where was everyone? {name} found a note: 'Follow the clues for a surprise!'", illustration: "📝" },
      { pageNumber: 3, text: "The first clue led to the garden, where balloons in every color floated among the flowers. A tiny gift box sat under a tree.", illustration: "🎈" },
      { pageNumber: 4, text: "Inside the box was a golden key and another clue! {name}'s eyes sparkled with excitement. 'This is the best treasure hunt ever!'", illustration: "🔑" },
      { pageNumber: 5, text: "The clues led {name} through the neighborhood - past the bakery (which smelled AMAZING), the park, and the old library.", illustration: "🏘️" },
      { pageNumber: 6, text: "At the library, {name} met a magician! He pulled a stuffed bunny from his hat and handed it to {name} with a wink.", illustration: "🎩" },
      { pageNumber: 7, text: "The golden key opened a music box that played {name}'s favorite song. Inside was the final clue: 'Come home, birthday star!'", illustration: "🎵" },
      { pageNumber: 8, text: "{name} raced home and opened the door - 'SURPRISE!' Everyone was there! Friends, family, and the biggest cake {name} had ever seen!", illustration: "🎂" },
      { pageNumber: 9, text: "The cake had {age} candles glowing like tiny stars. {name} closed both eyes, made a wish, and blew them all out in one magical breath!", illustration: "🕯️" },
      { pageNumber: 10, text: "As the stars came out that night, {name} smiled. 'This was the best birthday ever.' And somewhere, a wish was already coming true. The End.", illustration: "🎉" },
    ],
  },
  {
    id: "love-story",
    title: "Our Love Story",
    coverImage: bookWedding,
    description: "A beautiful keepsake capturing your unique love story for weddings and anniversaries.",
    ageRange: "Adults",
    tags: ["Wedding", "Romance"],
    pageCount: 10,
    theme: "love",
    storyTemplate: [
      { pageNumber: 1, text: "Every great love story has a beginning, and this one starts with {name}. A heart full of hope and a smile that could light up any room.", illustration: "💕" },
      { pageNumber: 2, text: "Some people search the world for love. For {name}, it arrived like a gentle surprise - unexpected, unmistakable, and unforgettable.", illustration: "🌹" },
      { pageNumber: 3, text: "The first conversation felt like coming home. Words flowed easily, laughter came naturally, and time simply stopped.", illustration: "☕" },
      { pageNumber: 4, text: "Adventures followed - long walks under canopies of stars, spontaneous road trips, and quiet moments that said more than words ever could.", illustration: "🌃" },
      { pageNumber: 5, text: "Through seasons of change, {name}'s love grew deeper. Like a tree with strong roots, it weathered every storm with grace.", illustration: "🌳" },
      { pageNumber: 6, text: "There were challenges, of course. But each one became a stepping stone, making the bond stronger and the trust unshakeable.", illustration: "🌊" },
      { pageNumber: 7, text: "Then came the moment - the question, the tears, the 'yes.' A promise written not just in words, but in the very fabric of their souls.", illustration: "💍" },
      { pageNumber: 8, text: "Surrounded by the people they loved most, {name} celebrated the beginning of forever. Every smile in the room was a reflection of their joy.", illustration: "🥂" },
      { pageNumber: 9, text: "This book is a reminder: love is not just a feeling. It is a choice made every day - to show up, to be kind, to keep choosing each other.", illustration: "📖" },
      { pageNumber: 10, text: "And so the story continues, one beautiful chapter at a time. Here is to love, to laughter, and to happily ever after. The End.", illustration: "💖" },
    ],
  },
  {
    id: "ocean-explorer",
    title: "Deep Sea Discovery",
    coverImage: bookSpace,
    description: "Dive into the ocean depths and discover underwater wonders and sea creatures!",
    ageRange: "3-8",
    tags: ["Adventure", "Nature"],
    pageCount: 10,
    theme: "ocean",
    storyTemplate: [
      { pageNumber: 1, text: "{name} stood on a golden beach, watching waves roll in. 'I wonder what is down there,' {name} said, gazing at the deep blue sea.", illustration: "🏖️" },
      { pageNumber: 2, text: "A magical seahorse appeared in the shallows. 'Hop on!' it said. 'I will show you a world you have never seen!' And down they went.", illustration: "🌊" },
      { pageNumber: 3, text: "Coral reefs stretched out like underwater gardens - red, orange, purple, and gold. Fish of every color darted between the branches.", illustration: "🐠" },
      { pageNumber: 4, text: "A gentle sea turtle swam alongside {name}. 'I am 100 years old,' it said wisely. 'And the ocean still surprises me every day.'", illustration: "🐢" },
      { pageNumber: 5, text: "{name} discovered a sunken pirate ship covered in barnacles and mystery. Inside, a treasure chest glowed with soft light.", illustration: "🏴‍☠️" },
      { pageNumber: 6, text: "The treasure was a pearl that showed anyone's happiest memory. {name} held it close and saw the most wonderful moment replay.", illustration: "🫧" },
      { pageNumber: 7, text: "An octopus artist painted pictures on the sandy floor using ink. It made a portrait of {name} that looked absolutely perfect!", illustration: "🐙" },
      { pageNumber: 8, text: "Deep in the twilight zone, bioluminescent creatures lit up like living lanterns. {name} danced with jellyfish that glowed like stars.", illustration: "✨" },
      { pageNumber: 9, text: "The seahorse brought {name} back to the surface as the sunset painted the sky in gold and pink. 'Come back anytime,' it whispered.", illustration: "🌅" },
      { pageNumber: 10, text: "{name} walked home along the shore, pockets full of shells and heart full of wonder. The ocean would always be a friend. The End.", illustration: "🐚" },
    ],
  },
  {
    id: "superhero-origin",
    title: "The Everyday Superhero",
    coverImage: bookJungle,
    description: "Discover the superhero within! A story about kindness, courage, and inner strength.",
    ageRange: "4-10",
    tags: ["Inspiration", "Kids"],
    pageCount: 10,
    theme: "superhero",
    storyTemplate: [
      { pageNumber: 1, text: "{name} always felt ordinary. Same school, same routine. But one morning, a mysterious package arrived with a note: 'For the bravest heart.'", illustration: "📦" },
      { pageNumber: 2, text: "Inside was a cape - not flashy or glittery, but warm and soft. The moment {name} put it on, something incredible happened.", illustration: "🦸" },
      { pageNumber: 3, text: "{name} could hear people who needed help! A lost puppy whimpering, a friend feeling sad, a neighbor struggling with heavy bags.", illustration: "👂" },
      { pageNumber: 4, text: "First mission: {name} found the lost puppy and reunited it with its owner. The little girl hugged {name} so tight. 'You are my hero!'", illustration: "🐕" },
      { pageNumber: 5, text: "At school, {name} noticed a kid sitting alone at lunch. {name} sat down beside them, shared snacks, and made a new best friend.", illustration: "🤝" },
      { pageNumber: 6, text: "{name} helped the elderly neighbor carry groceries. 'You have got a strong heart,' she smiled. 'That is the greatest superpower.'", illustration: "💪" },
      { pageNumber: 7, text: "Word spread about the Everyday Superhero! Soon, other kids wanted to help too. {name} had started a whole team of kindness heroes.", illustration: "👫" },
      { pageNumber: 8, text: "The biggest challenge came when a storm knocked down the community garden. {name} rallied everyone to rebuild it, better than before.", illustration: "🌻" },
      { pageNumber: 9, text: "That evening, {name} looked at the cape and understood: it was not magic. The superpower was always inside - courage, kindness, and heart.", illustration: "❤️" },
      { pageNumber: 10, text: "{name} smiled. 'Everyone can be a superhero. You just have to choose to be kind.' And that is exactly what {name} did, every single day. The End.", illustration: "🌟" },
    ],
  },
  {
    id: "dinosaur-time",
    title: "Journey to Dinosaur Land",
    coverImage: bookFairy,
    description: "Travel back in time to meet dinosaurs, volcanoes, and prehistoric wonders!",
    ageRange: "3-8",
    tags: ["Adventure", "Education"],
    pageCount: 10,
    theme: "dinosaur",
    storyTemplate: [
      { pageNumber: 1, text: "{name} found a strange, glowing fossil in the backyard. The moment {name} touched it - WHOOSH! - everything changed.", illustration: "🦴" },
      { pageNumber: 2, text: "Giant ferns towered overhead. Volcanoes rumbled in the distance. {name} had traveled millions of years back in time!", illustration: "🌋" },
      { pageNumber: 3, text: "A baby Triceratops waddled up and nuzzled {name}'s hand. 'I will call you Trixie,' {name} laughed, patting its bumpy head.", illustration: "🦕" },
      { pageNumber: 4, text: "Together, {name} and Trixie explored a valley of giant trees. Everything was HUGE - dragonflies as big as eagles!", illustration: "🌲" },
      { pageNumber: 5, text: "A mighty T-Rex appeared! But it was not scary at all - it was trying to reach fruit from a tall tree. {name} helped by climbing up.", illustration: "🦖" },
      { pageNumber: 6, text: "The T-Rex was so grateful, it gave {name} a ride on its back! {name} could see the whole prehistoric world from up there.", illustration: "🏔️" },
      { pageNumber: 7, text: "{name} discovered dinosaur eggs in a cozy nest. Tiny cracks appeared, and - POP! - adorable baby dinos hatched, chirping happily.", illustration: "🥚" },
      { pageNumber: 8, text: "As the sun set over the ancient world, pterodactyls soared across an orange sky. {name} had never seen anything so beautiful.", illustration: "🌅" },
      { pageNumber: 9, text: "The glowing fossil began to pulse. 'Time to go home,' {name} sighed, hugging Trixie goodbye. 'I will never forget you.'", illustration: "💫" },
      { pageNumber: 10, text: "Back in the garden, {name} held the fossil close. 'History is alive,' {name} whispered, 'if you know where to look.' The End.", illustration: "🌟" },
    ],
  },
];
