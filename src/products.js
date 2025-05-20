const products = [
  {
    id: "001",
    category: "graphic element",
    name: "Mirror Orb Mockup",
    description: {
      bodyCopy1:
        "Mirror Orb Mockup is a high-fidelity digital asset designed to enhance your creative presentations and visuals.",
      bodyCopy2:
        "Crafted with modern aesthetics, it\u2019s ideal for branding, portfolio showcases, and product campaigns.",
    },
    designer: "Studio Moderno",
    price: 12,
    date: "2025-04-06",
    fileType: "PSD",
    previewImg: "product_001.jpeg",
    productImages: ["product_001.jpeg", "product_002.jpeg", "product_003.jpeg"],
    compatibility: "Photoshop",
  },
  {
    id: "002",
    category: "mockup",
    name: "Earbud Ad Mockup",
    description: {
      bodyCopy1:
        "Earbud Ad Mockup is a high-fidelity digital asset designed to enhance your creative presentations and visuals.",
      bodyCopy2:
        "Crafted with modern aesthetics, it\u2019s ideal for branding, portfolio showcases, and product campaigns.",
    },
    designer: "AudioHaus",
    price: 30,
    date: "2025-04-07",
    fileType: "PNG",
    previewImg: "product_002.jpeg",
    productImages: ["product_002.jpeg", "product_003.jpeg", "product_004.jpeg"],
    compatibility: "Figma",
  },
  {
    id: "003",
    category: "mockup",
    name: "Minimal Phone Mockup",
    description: {
      bodyCopy1:
        "Minimal Phone Mockup is a high-fidelity digital asset designed to enhance your creative presentations and visuals.",
      bodyCopy2:
        "Crafted with modern aesthetics, it\u2019s ideal for branding, portfolio showcases, and product campaigns.",
    },
    designer: "Form Labs",
    price: 10,
    date: "2025-04-08",
    fileType: "PSD",
    previewImg: "product_003.jpeg",
    productImages: ["product_003.jpeg", "product_004.jpeg", "product_005.jpeg"],
    compatibility: "Photoshop",
  },
  {
    id: "004",
    category: "graphic element",
    name: "Hanging Lamp Element",
    description: {
      bodyCopy1:
        "Hanging Lamp Element is a high-fidelity digital asset designed to enhance your creative presentations and visuals.",
      bodyCopy2:
        "Crafted with modern aesthetics, it\u2019s ideal for branding, portfolio showcases, and product campaigns.",
    },
    designer: "Lumen Design",
    price: 5,
    date: "2025-04-09",
    fileType: "SVG",
    previewImg: "product_004.jpeg",
    productImages: ["product_004.jpeg", "product_005.jpeg", "product_006.jpeg"],
    compatibility: "Figma",
  },
  {
    id: "005",
    category: "mockup",
    name: "Keyboard Top View",
    description: {
      bodyCopy1:
        "Keyboard Top View is a high-fidelity digital asset designed to enhance your creative presentations and visuals.",
      bodyCopy2:
        "Crafted with modern aesthetics, it\u2019s ideal for branding, portfolio showcases, and product campaigns.",
    },
    designer: "Keystroke Studio",
    price: 15,
    date: "2025-04-10",
    fileType: "PSD",
    previewImg: "product_005.jpeg",
    productImages: ["product_005.jpeg", "product_006.jpeg", "product_007.jpeg"],
    compatibility: "Photoshop",
  },
  {
    id: "006",
    category: "graphic element",
    name: "Eye Slice Overlay",
    description: {
      bodyCopy1:
        "Eye Slice Overlay is a high-fidelity digital asset designed to enhance your creative presentations and visuals.",
      bodyCopy2:
        "Crafted with modern aesthetics, it\u2019s ideal for branding, portfolio showcases, and product campaigns.",
    },
    designer: "Visage Lab",
    price: 20,
    date: "2025-04-11",
    fileType: "PNG",
    previewImg: "product_006.jpeg",
    productImages: ["product_006.jpeg", "product_007.jpeg", "product_008.jpeg"],
    compatibility: "Figma",
  },
  {
    id: "007",
    category: "mockup",
    name: "Audio Mixer Interface",
    description: {
      bodyCopy1:
        "Audio Mixer Interface is a high-fidelity digital asset designed to enhance your creative presentations and visuals.",
      bodyCopy2:
        "Crafted with modern aesthetics, it\u2019s ideal for branding, portfolio showcases, and product campaigns.",
    },
    designer: "Sonic Grid",
    price: 10,
    date: "2025-04-12",
    fileType: "PSD",
    previewImg: "product_007.jpeg",
    productImages: ["product_007.jpeg", "product_008.jpeg", "product_009.jpeg"],
    compatibility: "Sketch",
  },
  {
    id: "008",
    category: "mockup",
    name: "Futuristic Speaker Render",
    description: {
      bodyCopy1:
        "Futuristic Speaker Render is a high-fidelity digital asset designed to enhance your creative presentations and visuals.",
      bodyCopy2:
        "Crafted with modern aesthetics, it\u2019s ideal for branding, portfolio showcases, and product campaigns.",
    },
    designer: "Echo Form",
    price: 25,
    date: "2025-04-13",
    fileType: "PNG",
    previewImg: "product_008.jpeg",
    productImages: ["product_008.jpeg", "product_009.jpeg", "product_010.jpeg"],
    compatibility: "Photoshop",
  },
  {
    id: "009",
    category: "mockup",
    name: "Gamepad Closeup",
    description: {
      bodyCopy1:
        "Gamepad Closeup is a high-fidelity digital asset designed to enhance your creative presentations and visuals.",
      bodyCopy2:
        "Crafted with modern aesthetics, it\u2019s ideal for branding, portfolio showcases, and product campaigns.",
    },
    designer: "Grip Creative",
    price: 50,
    date: "2025-04-14",
    fileType: "PNG",
    previewImg: "product_009.jpeg",
    productImages: ["product_009.jpeg", "product_010.jpeg", "product_011.jpeg"],
    compatibility: "Figma",
  },
  {
    id: "010",
    category: "motion",
    name: "3D Robot Render",
    description: {
      bodyCopy1:
        "3D Robot Render is a high-fidelity digital asset designed to enhance your creative presentations and visuals.",
      bodyCopy2:
        "Crafted with modern aesthetics, it\u2019s ideal for branding, portfolio showcases, and product campaigns.",
    },
    designer: "Future Constructs",
    price: 20,
    date: "2025-04-15",
    fileType: "MP4",
    previewImg: "product_010.jpeg",
    productImages: ["product_010.jpeg", "product_011.jpeg", "product_012.jpeg"],
    compatibility: "After Effects",
  },
  {
    id: "011",
    category: "mockup",
    name: "Smart Cube Display",
    description: {
      bodyCopy1:
        "Smart Cube Display is a high-fidelity digital asset designed to enhance your creative presentations and visuals.",
      bodyCopy2:
        "Crafted with modern aesthetics, it\u2019s ideal for branding, portfolio showcases, and product campaigns.",
    },
    designer: "Glasshouse Studio",
    price: 12,
    date: "2025-04-16",
    fileType: "PSD",
    previewImg: "product_011.jpeg",
    productImages: ["product_011.jpeg", "product_012.jpeg", "product_013.jpeg"],
    compatibility: "Figma",
  },
  {
    id: "012",
    category: "mockup",
    name: "Silhouette Portrait Mockup",
    description: {
      bodyCopy1:
        "Silhouette Portrait Mockup is a high-fidelity digital asset designed to enhance your creative presentations and visuals.",
      bodyCopy2:
        "Crafted with modern aesthetics, it\u2019s ideal for branding, portfolio showcases, and product campaigns.",
    },
    designer: "Persona",
    price: 20,
    date: "2025-04-17",
    fileType: "PNG",
    previewImg: "product_012.jpeg",
    productImages: ["product_012.jpeg", "product_013.jpeg", "product_014.jpeg"],
    compatibility: "Figma",
  },
  {
    id: "013",
    category: "sfx",
    name: "Retro Joystick UI",
    description: {
      bodyCopy1:
        "Retro Joystick UI is a high-fidelity digital asset designed to enhance your creative presentations and visuals.",
      bodyCopy2:
        "Crafted with modern aesthetics, it\u2019s ideal for branding, portfolio showcases, and product campaigns.",
    },
    designer: "Classic Console Co.",
    price: 5,
    date: "2025-04-18",
    fileType: "MP3",
    previewImg: "product_013.jpeg",
    productImages: ["product_013.jpeg", "product_014.jpeg", "product_015.jpeg"],
    compatibility: "All DAWs",
  },
  {
    id: "014",
    category: "mockup",
    name: "Phone Display Hands",
    description: {
      bodyCopy1:
        "Phone Display Hands is a high-fidelity digital asset designed to enhance your creative presentations and visuals.",
      bodyCopy2:
        "Crafted with modern aesthetics, it\u2019s ideal for branding, portfolio showcases, and product campaigns.",
    },
    designer: "Visual Hands",
    price: 25,
    date: "2025-04-19",
    fileType: "PNG",
    previewImg: "product_014.jpeg",
    productImages: ["product_014.jpeg", "product_015.jpeg", "product_001.jpeg"],
    compatibility: "Figma",
  },
  {
    id: "015",
    category: "motion",
    name: "Laser Cutter Loop",
    description: {
      bodyCopy1:
        "Laser Cutter Loop is a high-fidelity digital asset designed to enhance your creative presentations and visuals.",
      bodyCopy2:
        "Crafted with modern aesthetics, it\u2019s ideal for branding, portfolio showcases, and product campaigns.",
    },
    designer: "Machina Works",
    price: 45,
    date: "2025-04-20",
    fileType: "MP4",
    previewImg: "product_015.jpeg",
    productImages: ["product_015.jpeg", "product_001.jpeg", "product_002.jpeg"],
    compatibility: "Blender",
  },
];

export default products;
