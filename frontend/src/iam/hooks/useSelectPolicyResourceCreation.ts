import React, {useState} from 'react'

const useSelectPolicyResourceCreation = () => {
    const [selectedResource, setSelectedResource] = useState<string | null>(null);
    const [selectedApp, setSelectedApp] = useState<string | null>(null); // Track the selected app
    const [selectedModel, setSelectedModel] = useState<string | null>(null); // Track the selected model
    const [showSelect, setShowSelect] = useState(true);  // 
    const [clickedResource, setClickedResource] = useState<string | null>(null);


     // Handle resource selection change
     const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedResource(event.target.value);
        setSelectedApp(null); // Reset app when changing resource type
        setSelectedModel(null); // Reset model when changing resource type
        setClickedResource(null); // Reset clicked resource
        setShowSelect(true); // Show dropdown again
    };

    // Handle click on an app
    const handleAppClick = (appName: string) => {
        setSelectedApp(appName);
        setSelectedModel(null); // Clear model selection when an app is clicked
        setClickedResource(appName); // Set clicked resource to app
        setShowSelect(false); // Hide select after clicking app
    };

    // Handle click on a model
    const handleModelClick = (modelName: string) => {
        setSelectedModel(modelName);
        setSelectedApp(null); // Clear app selection when a model is clicked
        setClickedResource(modelName); // Set clicked resource to model
        setShowSelect(false); // Hide select after clicking model
    };

  return  {
    showSelect,
    selectedApp,
    selectedModel,
    selectedResource,
    clickedResource,
    handleAppClick,
    handleModelClick,
    handleSelectChange,
    
  }
}

export default useSelectPolicyResourceCreation