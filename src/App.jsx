import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PosterDesigner from "./Poster/Poster.jsx";
import PosterGallery from "./Poster/PosterGallery.jsx";
import TemplateEditor from "./Poster/TemplateEditor.jsx";

function App() {
  const [savedPosters, setSavedPosters] = useState([]);
  const [customTemplates, setCustomTemplates] = useState([]);

  const savePoster = (posterData) => {
    setSavedPosters([...savedPosters, posterData]);
  };

  const saveTemplate = (templateData) => {
    setCustomTemplates([...customTemplates, templateData]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Poster Designer Pro
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create stunning posters in seconds
            </p>
          </div>

          <Routes>
            <Route
              path="/"
              element={
                <PosterGallery
                  posters={savedPosters}
                  templates={customTemplates}
                />
              }
            />
            <Route
              path="/design"
              element={
                <PosterDesigner
                  onSave={savePoster}
                  customTemplates={customTemplates}
                />
              }
            />
            <Route
              path="/template-editor"
              element={<TemplateEditor onSave={saveTemplate} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
