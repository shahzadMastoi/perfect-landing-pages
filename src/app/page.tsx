// 'use client';

// import { useState } from 'react';

// export default function Home() {
//   const [activeTab, setActiveTab] = useState('home');
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');

//   const categories = ['All', 'Business', 'Portfolio', 'E-commerce'];

//   const landingPageTemplates = Array.from({ length: 12 }).map((_, idx) => ({
//     title: `Template ${idx + 1}`,
//     description: 'A clean and modern landing page layout.',
//     image: `https://picsum.photos/seed/${idx + 1}/400/240`,
//     category: categories[(idx % (categories.length - 1)) + 1],
//   }));

//   const openPreview = (imageUrl) => {
//     setPreviewImage(imageUrl);
//     setIsPreviewOpen(true);
//   };

//   const closePreview = () => {
//     setIsPreviewOpen(false);
//     setPreviewImage('');
//   };

//   const filteredTemplates = landingPageTemplates.filter((template) => {
//     const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'home':
//         return (
//           <>
//             <div className="filter-bar">
//               <input
//                 type="text"
//                 placeholder="Search templates..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//                 {categories.map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="cards-container">
//               {filteredTemplates.map((template, idx) => (
//                 <div key={idx} className="card">
//                   <img src={template.image} alt={template.title} />
//                   <h3>{template.title}</h3>
//                   <p>{template.description}</p>
//                   <p className="category-label">Category: {template.category}</p>
//                   <button onClick={() => openPreview(template.image)}>Preview</button>
//                 </div>
//               ))}
//             </div>
//           </>
//         );
//       case 'about':
//         return (
//           <div className="content">
//             <h2>About Us</h2>
//             <p>Perfect Landing Page helps you build high-converting pages with ease.</p>
//           </div>
//         );
//       case 'contact':
//         return (
//           <div className="content">
//             <h2>Contact Us</h2>
//             <p>Email us at support@perfectlandingpage.com</p>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <main className="container">
//       <header>
//         <div className="brand-name">
//           <h1>Perfect Landing Page</h1>
//         </div>
//         <nav>
//           <button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'active' : ''}>
//             Home
//           </button>
//           <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>
//             About Us
//           </button>
//           <button onClick={() => setActiveTab('contact')} className={activeTab === 'contact' ? 'active' : ''}>
//             Contact Us
//           </button>
//         </nav>
//       </header>

//       <section className="main-section">{renderContent()}</section>

//       {isPreviewOpen && (
//         <div className="modal" onClick={closePreview}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="blog-post">
//               <img src={previewImage} alt="Preview" className="modal-image" />
//               <div className="blog-content">
//                 <h2 className="blog-heading">Blog Post Title</h2>
//                 <h3 className="blog-subheading">This is a subheading for the blog post.</h3>
//                 <p className="blog-lore">
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet tortor id felis cursus
//                   lacinia. Cras a vehicula leo. Nulla nec urna ut justo vestibulum scelerisque.
//                 </p>
//                 <p className="blog-paragraph">
//                   Phasellus nec magna sit amet metus aliquet maximus. Donec laoreet, velit id tincidunt venenatis,
//                   sapien eros luctus felis, eu tristique dui ex et elit. Suspendisse potenti. Morbi at mollis purus.
//                 </p>
//                 <p className="blog-paragraph">
//                   Duis vitae velit at ipsum tincidunt tincidunt. Nam at urna a elit iaculis laoreet eget ac nulla.
//                   Quisque id sapien et sapien tempor laoreet. Nullam at velit tristique, tempus purus sed, varius leo.
//                 </p>
//               </div>
//             </div>
//             <button className="close-btn" onClick={closePreview}>
//               ✖
//             </button>
//           </div>
//         </div>
//       )}

//       <footer>
//         <p>&copy; 2025 Perfect Landing Page. All rights reserved.</p>
//       </footer>






"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import Card from "./components/Card";
import ModalPreview from "./components/ModalPreview";
import Footer from "./components/Footer";
import { Template } from "./types";
import Hero from "./components/Hero";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";

export default function Home() {
  const [previewImage, setPreviewImage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const categories = ["All", "Business", "Portfolio", "E-commerce"];

  useEffect(() => {
    fetch("/data/templates.json")
      .then((res) => res.json())
      .then((data: Template[]) => {
        setTemplates(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading templates:", err);
        setLoading(false);
      });
  }, []);

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="container">
      {/* ✅ Static Header and Hero */}
      <Header />
      <Hero />

      {/* ✅ Template Section */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {loading ? (
        <p className="text-center py-10">Loading templates...</p>
      ) : (
        <div className="cards-container">
          {filteredTemplates.map((template, idx) => (
            <Card key={idx} template={template} onPreview={setPreviewTemplate} />
          ))}
        </div>
      )}

      {/* ✅ About & Contact sections shown directly below */}
      <AboutUs />
      <ContactUs />

      {/* ✅ Modal Preview */}
      <ModalPreview
        isOpen={!!previewTemplate}
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
      />

      {/* ✅ Footer */}
      <Footer />
    </main>
  );
}



// <style jsx>{`
//   .container {
//     font-family: Arial, sans-serif;
//     padding: 0;
//     margin: 0;
//   }
//   header {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     background-color: #0070f3;
//     color: white;
//     padding: 1rem;
//   }
//   .brand-name h1 {
//     margin: 0;
//   }
//   nav button {
//     margin: 0 1rem;
//     padding: 0.5rem 1rem;
//     background: white;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//   }
//   nav button.active {
//     background: #005bb5;
//     color: white;
//   }
//   .main-section {
//     padding: 2rem;
//   }
//   .filter-bar {
//     display: flex;
//     gap: 1rem;
//     margin-bottom: 1.5rem;
//     justify-content: flex-start;
//     align-items: center;
//   }
//   .filter-bar input {
//     padding: 0.5rem;
//     font-size: 1rem;
//     flex: 1;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//   }
//   .filter-bar select {
//     padding: 0.5rem;
//     font-size: 1rem;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//   }
//   .cards-container {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
//     gap: 1.5rem;
//   }
//   .card {
//     background: #fff;
//     border: 1px solid #ddd;
//     border-radius: 8px;
//     padding: 1rem;
//     box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
//     text-align: center;
//     display: flex;
//     flex-direction: column;
//   }
//   .card img {
//     width: 100%;
//     height: 160px;
//     object-fit: cover;
//     border-radius: 4px;
//     margin-bottom: 0.75rem;
//   }
//   .card h3 {
//     margin: 0.5rem 0;
//   }
//   .card p {
//     font-size: 0.9rem;
//     color: #555;
//   }
//   .category-label {
//     font-size: 0.8rem;
//     font-weight: bold;
//     color: #0070f3;
//     margin: 0.5rem 0;
//   }
//   .card button {
//     margin-top: auto;
//     padding: 0.5rem 1rem;
//     background-color: #0070f3;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
//   }
//   footer {
//     background-color: #333;
//     color: white;
//     text-align: center;
//     padding: 1rem;
//     margin-top: 2rem;
//   }
//   .modal {
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: rgba(0, 0, 0, 0.7);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     z-index: 1000;
//   }
//   .modal-content {
//     position: relative;
//     background-color: white;
//     padding: 2rem;
//     max-width: 100%;
//     max-height: 100%;
//     overflow: hidden;
//     width: 80%;
//     height: 80%;
//     border-radius: 8px;
//   }
//   .modal-image {
//     width: 100%;
//     height: auto;
//     object-fit: contain;
//     margin-bottom: 1rem;
//   }
//   .blog-post {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     max-width: 800px;
//     margin: 0 auto;
//     text-align: center;
//   }
//   .blog-heading {
//     font-size: 2rem;
//     font-weight: bold;
//     margin-bottom: 1rem;
//   }
//   .blog-subheading {
//     font-size: 1.2rem;
//     color: #666;
//     margin-bottom: 1rem;
//   }
//   .blog-lore {
//     font-size: 1rem;
//     color: #333;
//     margin-bottom: 1.5rem;
//   }
//   .blog-paragraph {
//     font-size: 1rem;
//     color: #333;
//     margin-bottom: 1rem;
//     line-height: 1.6;
//   }
//   .close-btn {
//     position: absolute;
//     top: 10px;
//     right: 10px;
//     background-color: #ff5b5b;
//     color: white;
//     border: none;
//     border-radius: 50%;
//     padding: 0.5rem;
//     cursor: pointer;
//     font-size: 1.5rem;
//   }
//   .close-btn:hover {
//     background-color: #ff3333;
//   }
// `}</style>


