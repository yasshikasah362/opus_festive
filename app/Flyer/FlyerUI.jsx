"use client";
import { useState, useEffect } from "react";
import productsData from "../../public/products.json";
import FlyerSidebar from "./FlyerSidebar";
import FlyerCanvas from "./FlyerCanvas";
import { FlyerForm } from "./FlyerForm";


export default function Flyer() {
  const [activeTab, setActiveTab] = useState("templates");
  const [activeEdit, setActiveEdit] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [flyerForm, setFlyerForm] = useState(new FlyerForm());
 const [inputImageUrl, setInputImageUrl] = useState("");


const handleTemplateClick = (template) => {
  setSelectedTemplate(template);
  setImgLoaded(false);

  setFlyerForm((prev) => {
  return {
    ...prev,
    currFlyer: template,
    
  };
});

};



useEffect(() => {
  if (activeTab === "products") setProducts(productsData);
}, [activeTab]);


 



  const getScaledPosition = (coord) => {
    if (!imgLoaded) return { left: 0, top: 0 };
    const scaleX = imgLoaded.renderedWidth / imgLoaded.naturalWidth;
    const scaleY = imgLoaded.renderedHeight / imgLoaded.naturalHeight;

    return {
      left: coord.x * scaleX + imgLoaded.offsetX,
      top: coord.y * scaleY + imgLoaded.offsetY,
    };
  };

 // Product select pe sirf product ka imageUrl bhejna hai
const handleProductSelect = (product) => {
  setFlyerForm((prev) => {
    const updatedForm = { ...prev };
    updatedForm.inputImageUrl = product.imageUrl; // class ka field update
    console.log(" Saving inputImageUrl:", product.imageUrl);
    console.log("Updated FlyerForm:", updatedForm);
    return updatedForm;
  });
};










  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <div className="flex mt-16">
        <FlyerSidebar
  activeTab={activeTab}
  setActiveTab={setActiveTab}
  selectedTemplate={selectedTemplate} 
  selectedProducts={selectedProducts}
  products={products}
  handleTemplateClick={handleTemplateClick} 
  handleProductSelect={handleProductSelect}   
/>



        <FlyerCanvas
  selectedTemplate={selectedTemplate}
  activeEdit={activeEdit}
  setActiveEdit={setActiveEdit}
  imgLoaded={imgLoaded}
  setImgLoaded={setImgLoaded}
  getScaledPosition={getScaledPosition}
  flyerForm={flyerForm}            // ✅ add
  setFlyerForm={setFlyerForm}      // ✅ add
/>
      </div>
    </div>
  );
}
