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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false); // 👈 shared state

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setImgLoaded(false);
    setFlyerForm((prev) => ({
      ...prev,
      currFlyer: template,
    }));
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

  const handleProductSelect = (product) => {
    setFlyerForm((prev) => {
      const updatedForm = { ...prev };
      updatedForm.inputImageUrl = product.imageUrl;
      console.log("Saving inputImageUrl:", product.imageUrl);
      console.log("Updated FlyerForm:", updatedForm);
      return updatedForm;
    });
    setSelectedProduct(product);
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      <div className="flex mt-16">
        <FlyerSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedTemplate={selectedTemplate}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          selectedProduct={selectedProduct}
          products={products}
          handleTemplateClick={handleTemplateClick}
          handleProductSelect={handleProductSelect}
          panelOpen={panelOpen}
          setPanelOpen={setPanelOpen} // 🔥 ADD THIS LINE
        />

        <FlyerCanvas
          selectedTemplate={selectedTemplate}
          activeEdit={activeEdit}
          setActiveEdit={setActiveEdit}
          imgLoaded={imgLoaded}
          setImgLoaded={setImgLoaded}
          getScaledPosition={getScaledPosition}
          flyerForm={flyerForm}
          setFlyerForm={setFlyerForm}
          panelOpen={panelOpen}
        />
      </div>
    </div>
  );
}
