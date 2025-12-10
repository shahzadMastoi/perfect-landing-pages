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
//             <p>Perfect Landing Pages helps you build high-converting pages with ease.</p>
//           </div>
//         );
//       case 'contact':
//         return (
//           <div className="content">
//             <h2>Contact Us</h2>
//             <p>Email us at info@morextech.com</p>
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
//           <h1>Perfect Landing Pages</h1>
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
//         <p>&copy; 2025 Perfect Landing Pages with <a href=https://www.morextech.com>More X Tech</a>. All rights reserved.</p>
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
      {/* <AboutUs /> */}
      {/* <ContactUs /> */}

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
