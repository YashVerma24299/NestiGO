const sampleListings = [
  {
    title: "Cozy Cabin in the Woods",
    description: "Escape to this peaceful cabin surrounded by nature. Perfect for a relaxing getaway.",
    price: "120",
    location: "AshevilleNC",
    country: "USA",
    image: "https://images.unsplash.com/photo-1589911057171-44545e48c56b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Luxury Beachfront Villa",
    description: "Enjoy breathtaking ocean views from this stunning villa with private beach access.",
    price: "350",
    location: "MalibuCA",
    country: "USA",
    image: "https://plus.unsplash.com/premium_photo-1675745329954-9639d3b74bbf?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Modern Downtown Loft",
    description: "Stay in the heart of the city in this stylish loft with all modern amenities.",
    price: "2000",
    location: "NewYorkNY",
    country: "USA",
    image: "https://plus.unsplash.com/premium_photo-1661923725782-f73c990fbddf?q=80&w=1129&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Rustic Mountain Retreat",
    description: "A beautiful retreat nestled in the mountains with a cozy fireplace and scenic views.",
    price: "150",
    location: "DenverCO",
    country: "USA",
    image: "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Charming Countryside Cottage",
    description: "A quaint and charming cottage perfect for a peaceful countryside escape.",
    price: "2308",
    location: "NashvilleTN",
    country: "USA",
    image: "https://plus.unsplash.com/premium_photo-1675745329804-897876b0fbf0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Sunny Beach House",
    description: "A bright and airy beach house just steps from the ocean with a private deck.",
    price: "1526",
    location: "MiamiFL",
    country: "USA",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Secluded Jungle Bungalow",
    description: "A unique stay deep in the jungle, offering a one-of-a-kind nature experience.",
    price: "5678",
    location: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Historic Paris Apartment",
    description: "A classic Parisian apartment with stunning views of the Eiffel Tower.",
    price: "10890",
    location: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {

    title: "Lakefront Cabin Retreat",
    description: "A peaceful retreat by the lake, perfect for fishing and nature lovers.",
    price: "7830",
    location: "LakeTahoeCA",
    country: "USA",
    image: "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Japanese Ryokan Experience",
    description: "Experience traditional Japanese hospitality in this authentic ryokan.",
    price: "21002",
    location: "Kyoto",
    country: "Japan",
    image: "https://images.unsplash.com/photo-1535827841776-24afc1e255ac?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Ski-In Ski-Out Chalet",
    description: "A perfect winter retreat right on the slopes for skiing enthusiasts.",
    price: "2291",
    location: "AspenCO",
    country: "USA",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Tropical Island Villa",
    description: "A luxurious villa on a remote island with private beaches and lush surroundings.",
    price: "19202",
    location: "Maldives",
    country: "Maldives",
    image: "https://plus.unsplash.com/premium_photo-1661964402307-02267d1423f5?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Classic London Flat",
    description: "A chic apartment in central London, close to major attractions and transport.",
    price: "29992",
    location: "London",
    country: "UK",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Safari Tent Retreat",
    description: "Experience wildlife up close in this luxury safari tent with all modern comforts.",
    price: "9999",
    location: "Serengeti",
    country: "Tanzania",
    image: "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Greek Island Escape",
    description: "A white-washed house with blue domes overlooking the Aegean Sea.",
    price: "89002",
    location: "Santorini",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1545175707-9eec1209f720?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Forest Treehouse",
    description: "Stay in a treehouse high above the forest for a magical nature retreat.",
    price: "2911",
    location: "British Columbia",
    country: "Canada",
    image: "https://plus.unsplash.com/premium_photo-1661340695541-ee1ca7efedd0?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Floating Houseboat",
    description: "A peaceful stay in a floating houseboat with stunning water views.",
    price: "8291",
    location: "Amsterdam",
    country: "Netherlands",
    image: "https://images.unsplash.com/photo-1599722585837-c1cb8eea32ff?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Alpine Ski Lodge",
    description: "A cozy ski lodge in the Alps with breathtaking mountain views.",
    price: "1111",
    location: "Zermatt",
    country: "Switzerland",
    image: "https://plus.unsplash.com/premium_photo-1672097247893-4f8660247b1f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    title: "Royal Heritage Hotel",
    description: "Stay in a former palace with luxurious rooms and a rich history.",
    price: "6666",
    location: "Jaipur",
    country: "India",
    image: "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {

    title: "Igloo Adventure Stay",
    description: "A cozy glass igloo offering incredible views of the Northern Lights.",
    price: "2920",
    location: "Lapland",
    country: "Finland",
    image: "https://images.unsplash.com/photo-1568229988520-4bc288da81f7?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

module.exports = { data: sampleListings };