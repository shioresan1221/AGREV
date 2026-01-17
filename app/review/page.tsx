'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Question {
  question: string;
  choices: string[];
  correct: string;
  subject: string;
  explanation: string;
}

const questions: Question[] = [
  // Crop Science
  {
    question: "Which of the following is the primary purpose of soil tillage in crop production?",
    choices: [
      "To increase soil compactness",
      "To control weeds and aerate the soil",
      "To reduce soil organic matter",
      "To increase water runoff"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Soil tillage primarily controls weeds, incorporates organic matter, and improves soil aeration for better root growth."
  },
  {
    question: "What is the main function of photosynthesis in plants?",
    choices: [
      "To produce oxygen",
      "To convert light energy into chemical energy",
      "To absorb water from the soil",
      "To release carbon dioxide"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Photosynthesis converts light energy into chemical energy stored in glucose, while producing oxygen as a byproduct."
  },
  {
    question: "Which nutrient is primarily responsible for chlorophyll production in plants?",
    choices: [
      "Nitrogen",
      "Phosphorus",
      "Potassium",
      "Calcium"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Nitrogen is essential for chlorophyll synthesis and overall plant growth and development."
  },
  {
    question: "What is the primary function of roots in plants?",
    choices: [
      "To produce flowers",
      "To absorb water and nutrients from the soil",
      "To perform photosynthesis",
      "To store food"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Roots anchor the plant and absorb water and nutrients from the soil for transport to other parts."
  },
  {
    question: "Which crop is known as a C4 plant?",
    choices: [
      "Wheat",
      "Rice",
      "Maize",
      "Barley"
    ],
    correct: "C",
    subject: "Crop Science",
    explanation: "Maize is a C4 plant, which is more efficient in photosynthesis under high light and temperature conditions."
  },
  {
    question: "What is the term for the process of planting seeds in rows?",
    choices: [
      "Broadcasting",
      "Drilling",
      "Transplanting",
      "Hill planting"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Drilling refers to planting seeds in straight rows using a drill machine for uniform spacing."
  },
  // Soil Science
  {
    question: "What is the primary component of soil that provides nutrients to plants?",
    choices: [
      "Sand particles",
      "Organic matter",
      "Water",
      "Air"
    ],
    correct: "B",
    subject: "Soil Science",
    explanation: "Organic matter in soil provides essential nutrients and improves soil structure."
  },
  {
    question: "Which soil texture has the largest particle size?",
    choices: [
      "Clay",
      "Silt",
      "Sand",
      "Loam"
    ],
    correct: "C",
    subject: "Soil Science",
    explanation: "Sand particles are the largest in soil texture classification."
  },
  // Crop Protection
  {
    question: "What is the primary goal of integrated pest management (IPM)?",
    choices: [
      "To eliminate all pests",
      "To use pesticides exclusively",
      "To minimize pesticide use while maintaining crop yield",
      "To focus only on biological control"
    ],
    correct: "C",
    subject: "Crop Protection",
    explanation: "IPM combines various pest control methods to minimize chemical use and maintain yield."
  },
  {
    question: "Which of the following is a fungal disease affecting crops?",
    choices: [
      "Bacterial blight",
      "Powdery mildew",
      "Viral mosaic",
      "Nematode infection"
    ],
    correct: "B",
    subject: "Crop Protection",
    explanation: "Powdery mildew is a common fungal disease that appears as white powdery spots on leaves."
  },
  // Animal Science
  {
    question: "What is the primary function of ruminant animals' multiple stomach compartments?",
    choices: [
      "To store food",
      "To digest cellulose through microbial fermentation",
      "To produce milk",
      "To regulate body temperature"
    ],
    correct: "B",
    subject: "Animal Science",
    explanation: "Ruminants have multiple stomachs to ferment cellulose with microbes for digestion."
  },
  {
    question: "Which vitamin is essential for blood clotting in animals?",
    choices: [
      "Vitamin A",
      "Vitamin D",
      "Vitamin K",
      "Vitamin E"
    ],
    correct: "C",
    subject: "Animal Science",
    explanation: "Vitamin K is crucial for blood clotting and coagulation processes."
  },
  // Agricultural Economics
  {
    question: "What does the law of diminishing returns state?",
    choices: [
      "As input increases, output increases proportionally",
      "As input increases, output increases but at a decreasing rate",
      "As input increases, output decreases",
      "Inputs have no effect on outputs"
    ],
    correct: "B",
    subject: "Agricultural Economics",
    explanation: "The law states that adding more of a factor of production results in smaller increases in output."
  },
  {
    question: "Which market structure is characterized by many buyers and sellers with no single entity controlling the market?",
    choices: [
      "Monopoly",
      "Oligopoly",
      "Perfect competition",
      "Monopolistic competition"
    ],
    correct: "C",
    subject: "Agricultural Economics",
    explanation: "Perfect competition has many buyers and sellers with no market control by any single entity."
  },
  // Extension
  {
    question: "What is the primary role of agricultural extension services?",
    choices: [
      "To enforce government regulations",
      "To disseminate research-based knowledge to farmers",
      "To sell agricultural products",
      "To manage farm finances"
    ],
    correct: "B",
    subject: "Extension",
    explanation: "Extension services provide farmers with research-based knowledge and best practices."
  },
  {
    question: "Which communication method is most effective for reaching rural farmers?",
    choices: [
      "Social media only",
      "Radio broadcasts",
      "Personal visits and demonstrations",
      "Email newsletters"
    ],
    correct: "C",
    subject: "Extension",
    explanation: "Personal visits and demonstrations are effective for rural farmers with limited access to media."
  },
  // Additional Crop Science Questions
  {
    question: "The 'Green Revolution' in the Philippines focused on which crops?",
    choices: [
      "Abaca & Coffee",
      "Rice & Corn",
      "Banana & Coconut",
      "Vegetables"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Focused on HYVs of rice (IRRI) and corn."
  },
  {
    question: "Which law is the 'Agriculture and Fisheries Modernization Act' (AFMA)?",
    choices: [
      "RA 8435",
      "RA 9003",
      "RA 10068",
      "RA 7607"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "RA 8435 is the AFMA Law of 1997."
  },
  {
    question: "Scientific name of Corn?",
    choices: [
      "Zea Mays",
      "Zea mays",
      "zea mays",
      "Zea Mays L."
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Genus capitalized, species lowercase."
  },
  {
    question: "Which is a monocot?",
    choices: [
      "Peanut",
      "Mungbean",
      "Coconut",
      "Tomato"
    ],
    correct: "C",
    subject: "Crop Science",
    explanation: "Coconut is a monocot; others are dicots."
  },
  {
    question: "Hormone for fruit ripening?",
    choices: [
      "Auxin",
      "Gibberellin",
      "Ethylene",
      "Cytokinin"
    ],
    correct: "C",
    subject: "Crop Science",
    explanation: "Ethylene is the ripening hormone."
  },
  {
    question: "Optimum soil pH for most crops?",
    choices: [
      "3.0-4.0",
      "5.5-6.5",
      "8.0-9.0",
      "4.0-5.0"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Slightly acidic is best for nutrient availability."
  },
  {
    question: "Process of removing anthers?",
    choices: [
      "Emasculation",
      "Pollination",
      "Fertilization",
      "Hybridization"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Removing male parts to prevent selfing."
  },
  {
    question: "IPM stands for?",
    choices: [
      "Internal Pest Management",
      "Integrated Pest Management",
      "Insect Pest Management",
      "Intensive Pest Management"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Holistic approach to pest control."
  },
  {
    question: "Storage for orthodox seeds?",
    choices: [
      "High temp, High moisture",
      "Low temp, Low moisture",
      "High temp, Low moisture",
      "Low temp, High moisture"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Cool and dry extends viability."
  },
  {
    question: "Main function of Xylem?",
    choices: [
      "Transport food",
      "Transport water/minerals",
      "Photosynthesis",
      "Protection"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Xylem carries water up."
  },
  {
    question: "Main function of Phloem?",
    choices: [
      "Transport food (sugar)",
      "Transport water",
      "Support",
      "Rooting"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Phloem carries photosynthates down."
  },
  {
    question: "Site of Photosynthesis?",
    choices: [
      "Mitochondria",
      "Chloroplast",
      "Nucleus",
      "Ribosome"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Chloroplasts contain chlorophyll."
  },
  {
    question: "Powerhouse of the cell?",
    choices: [
      "Mitochondria",
      "Vacuole",
      "Wall",
      "Membrane"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Site of respiration/ATP production."
  },
  {
    question: "Kranz anatomy is found in?",
    choices: [
      "C3 Plants",
      "C4 Plants",
      "CAM Plants",
      "Mosses"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Typical of C4 plants like corn."
  },
  {
    question: "First product of C3 photosynthesis?",
    choices: [
      "PGA (3-carbon)",
      "OAA (4-carbon)",
      "Glucose",
      "Pyruvate"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Phosphoglyceric acid."
  },
  {
    question: "First product of C4 photosynthesis?",
    choices: [
      "PGA",
      "OAA (Oxaloacetic acid)",
      "Malate",
      "PEP"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Hence the name C4."
  },
  {
    question: "Plant response to light direction?",
    choices: [
      "Photoperiodism",
      "Phototropism",
      "Geotropism",
      "Thigmotropism"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Bending towards light."
  },
  {
    question: "Response to touch?",
    choices: [
      "Phototropism",
      "Thigmotropism",
      "Geotropism",
      "Hydrotropism"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Like 'makahiya' closing."
  },
  {
    question: "Conversion of N2 gas to ammonia?",
    choices: [
      "Denitrification",
      "Nitrogen Fixation",
      "Nitrification",
      "Ammonification"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Done by Rhizobium etc."
  },
  {
    question: "Loss of water vapor from leaves?",
    choices: [
      "Respiration",
      "Transpiration",
      "Guttation",
      "Evaporation"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Occurs via stomata."
  },
  {
    question: "Loss of liquid water from leaf margins?",
    choices: [
      "Transpiration",
      "Guttation",
      "Dew",
      "Condensation"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Happens when humidity is high."
  },
  {
    question: "Element central to Chlorophyll?",
    choices: [
      "Iron",
      "Magnesium",
      "Calcium",
      "Potassium"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Mg is the center atom."
  },
  {
    question: "Deficiency causing chlorosis in older leaves?",
    choices: [
      "Nitrogen",
      "Iron",
      "Calcium",
      "Boron"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "N is mobile, moves to young leaves."
  },
  {
    question: "Deficiency causing blossom end rot in tomato?",
    choices: [
      "Calcium",
      "Nitrogen",
      "Phosphorus",
      "Potassium"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Ca is immobile."
  },
  {
    question: "Most abundant gas in atmosphere?",
    choices: [
      "Oxygen",
      "Carbon Dioxide",
      "Nitrogen",
      "Argon"
    ],
    correct: "C",
    subject: "Crop Science",
    explanation: "78% Nitrogen."
  },
  {
    question: "Process of breaking dormancy?",
    choices: [
      "Scarification",
      "Stratification",
      "Vernalization",
      "All of the above"
    ],
    correct: "D",
    subject: "Crop Science",
    explanation: "Methods to aid germination."
  },
  {
    question: "Genetic makeup of a plant?",
    choices: [
      "Phenotype",
      "Genotype",
      "Hybrid",
      "Variety"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "The DNA constitution."
  },
  {
    question: "Physical appearance of a plant?",
    choices: [
      "Phenotype",
      "Genotype",
      "Clone",
      "Cultivar"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "G x E = P."
  },
  {
    question: "Father of Genetics?",
    choices: [
      "Darwin",
      "Mendel",
      "Borlaug",
      "Watson"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Gregor Mendel."
  },
  {
    question: "Father of Green Revolution?",
    choices: [
      "Mendel",
      "Norman Borlaug",
      "Umali",
      "Copeland"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Nobel laureate Borlaug."
  },
  {
    question: "Rice variety that started Green Revolution?",
    choices: [
      "IR-64",
      "IR-8",
      "C4-63",
      "Masagana"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Miracle Rice."
  },
  {
    question: "Center of Origin for Rice?",
    choices: [
      "Mexico",
      "SE Asia/India",
      "Africa",
      "Europe"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Diversity center."
  },
  {
    question: "Center of Origin for Corn?",
    choices: [
      "Mexico/Central America",
      "China",
      "Philippines",
      "Brazil"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Teosinte ancestry."
  },
  {
    question: "Propagation using parts other than seeds?",
    choices: [
      "Sexual",
      "Asexual",
      "Gametic",
      "Meiotic"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Vegetative propagation."
  },
  {
    question: "Grafting: The top part is called?",
    choices: [
      "Rootstock",
      "Scion",
      "Cambium",
      "Interstock"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Carries the genes for the fruit."
  },
  {
    question: "Grafting: The bottom part is called?",
    choices: [
      "Scion",
      "Rootstock",
      "Bud",
      "Twig"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Provides the roots."
  },
  {
    question: "Underground stem of Banana?",
    choices: [
      "Corm",
      "Rhizome",
      "Tuber",
      "Bulb"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Solid stem base."
  },
  {
    question: "Edible part of Ginger?",
    choices: [
      "Root",
      "Rhizome",
      "Tuber",
      "Corm"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Underground stem."
  },
  {
    question: "Edible part of Potato?",
    choices: [
      "Root",
      "Tuber",
      "Corm",
      "Rhizome"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Stem tuber."
  },
  {
    question: "Edible part of Sweet Potato?",
    choices: [
      "Root tuber",
      "Stem tuber",
      "Corm",
      "Bulb"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Modified root."
  },
  {
    question: "What is the scientific name of Rice?",
    choices: [
      "Oryza sativa",
      "Oryza spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Oryza sativa."
  },
  {
    question: "What is the scientific name of Corn?",
    choices: [
      "Zea mays",
      "Zea spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Zea mays."
  },
  {
    question: "What is the scientific name of Sugarcane?",
    choices: [
      "Saccharum officinarum",
      "Saccharum spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Saccharum officinarum."
  },
  {
    question: "What is the scientific name of Coconut?",
    choices: [
      "Cocos nucifera",
      "Cocos spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Cocos nucifera."
  },
  {
    question: "What is the scientific name of Banana?",
    choices: [
      "Musa spp.",
      "Musa spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Musa spp.."
  },
  {
    question: "What is the scientific name of Mango?",
    choices: [
      "Mangifera indica",
      "Musa sapientum",
      "Carica papaya",
      "Psidium guajava"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Mangifera indica."
  },
  {
    question: "What is the scientific name of Pineapple?",
    choices: [
      "Ananas comosus",
      "Ananas spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Ananas comosus."
  },
  {
    question: "What is the scientific name of Coffee (Arabica)?",
    choices: [
      "Coffea arabica",
      "Coffea spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Coffea arabica."
  },
  {
    question: "What is the scientific name of Cacao?",
    choices: [
      "Theobroma cacao",
      "Theobroma spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Theobroma cacao."
  },
  {
    question: "What is the scientific name of Rubber?",
    choices: [
      "Hevea brasiliensis",
      "Hevea spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Hevea brasiliensis."
  },
  {
    question: "What is the scientific name of Abaca?",
    choices: [
      "Musa textilis",
      "Musa spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Musa textilis."
  },
  {
    question: "What is the scientific name of Tomato?",
    choices: [
      "Solanum lycopersicum",
      "Solanum spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Solanum lycopersicum."
  },
  {
    question: "What is the scientific name of Eggplant?",
    choices: [
      "Solanum melongena",
      "Solanum spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Solanum melongena."
  },
  {
    question: "What is the scientific name of Potato?",
    choices: [
      "Solanum tuberosum",
      "Solanum spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Solanum tuberosum."
  },
  {
    question: "What is the scientific name of Tobacco?",
    choices: [
      "Nicotiana tabacum",
      "Nicotiana spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Nicotiana tabacum."
  },
  {
    question: "What is the scientific name of Peanut?",
    choices: [
      "Arachis hypogaea",
      "Arachis spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Arachis hypogaea."
  },
  {
    question: "What is the scientific name of Mungbean?",
    choices: [
      "Vigna radiata",
      "Vigna spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Vigna radiata."
  },
  {
    question: "What is the scientific name of Soybean?",
    choices: [
      "Glycine max",
      "Glycine spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Glycine max."
  },
  {
    question: "What is the scientific name of Winged Bean?",
    choices: [
      "Psophocarpus tetragonolobus",
      "Psophocarpus spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Psophocarpus tetragonolobus."
  },
  {
    question: "What is the scientific name of String Bean?",
    choices: [
      "Vigna unguiculata",
      "Vigna spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Vigna unguiculata."
  },
  {
    question: "What is the scientific name of Squash?",
    choices: [
      "Cucurbita moschata",
      "Cucurbita spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Cucurbita moschata."
  },
  {
    question: "What is the scientific name of Watermelon?",
    choices: [
      "Citrullus lanatus",
      "Citrullus spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Citrullus lanatus."
  },
  {
    question: "What is the scientific name of Bitter Gourd?",
    choices: [
      "Momordica charantia",
      "Momordica spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Momordica charantia."
  },
  {
    question: "What is the scientific name of Cucumber?",
    choices: [
      "Cucumis sativus",
      "Cucumis spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Cucumis sativus."
  },
  {
    question: "What is the scientific name of Sweet Potato?",
    choices: [
      "Ipomoea batatas",
      "Ipomoea spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Ipomoea batatas."
  },
  {
    question: "What is the scientific name of Cassava?",
    choices: [
      "Manihot esculenta",
      "Manihot spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Manihot esculenta."
  },
  {
    question: "What is the scientific name of Yam (Ubi)?",
    choices: [
      "Dioscorea alata",
      "Dioscorea spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Dioscorea alata."
  },
  {
    question: "What is the scientific name of Taro (Gabi)?",
    choices: [
      "Colocasia esculenta",
      "Colocasia spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Colocasia esculenta."
  },
  {
    question: "What is the scientific name of Onion?",
    choices: [
      "Allium cepa",
      "Allium spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Allium cepa."
  },
  {
    question: "What is the scientific name of Garlic?",
    choices: [
      "Allium sativum",
      "Allium spp.",
      "Incorrect Name A",
      "Incorrect Name B"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Scientific name: Allium sativum."
  },
  {
    question: "To which family does Rice belong?",
    choices: [
      "Poaceae",
      "Fabaceae",
      "Solanaceae",
      "Musaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Rice (Oryza sativa) belongs to Poaceae."
  },
  {
    question: "To which family does Corn belong?",
    choices: [
      "Poaceae",
      "Fabaceae",
      "Solanaceae",
      "Musaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Corn (Zea mays) belongs to Poaceae."
  },
  {
    question: "To which family does Sugarcane belong?",
    choices: [
      "Poaceae",
      "Fabaceae",
      "Solanaceae",
      "Musaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Sugarcane (Saccharum officinarum) belongs to Poaceae."
  },
  {
    question: "To which family does Coconut belong?",
    choices: [
      "Arecaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Coconut (Cocos nucifera) belongs to Arecaceae."
  },
  {
    question: "To which family does Banana belong?",
    choices: [
      "Musaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Banana (Musa spp.) belongs to Musaceae."
  },
  {
    question: "To which family does Mango belong?",
    choices: [
      "Anacardiaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Mango (Mangifera indica) belongs to Anacardiaceae."
  },
  {
    question: "To which family does Pineapple belong?",
    choices: [
      "Bromeliaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Pineapple (Ananas comosus) belongs to Bromeliaceae."
  },
  {
    question: "To which family does Coffee (Arabica) belong?",
    choices: [
      "Rubiaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Coffee (Arabica) (Coffea arabica) belongs to Rubiaceae."
  },
  {
    question: "To which family does Cacao belong?",
    choices: [
      "Malvaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Cacao (Theobroma cacao) belongs to Malvaceae."
  },
  {
    question: "To which family does Rubber belong?",
    choices: [
      "Euphorbiaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Rubber (Hevea brasiliensis) belongs to Euphorbiaceae."
  },
  {
    question: "To which family does Abaca belong?",
    choices: [
      "Musaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Abaca (Musa textilis) belongs to Musaceae."
  },
  {
    question: "To which family does Tomato belong?",
    choices: [
      "Solanaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Tomato (Solanum lycopersicum) belongs to Solanaceae."
  },
  {
    question: "To which family does Eggplant belong?",
    choices: [
      "Solanaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Eggplant (Solanum melongena) belongs to Solanaceae."
  },
  {
    question: "To which family does Potato belong?",
    choices: [
      "Solanaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Potato (Solanum tuberosum) belongs to Solanaceae."
  },
  {
    question: "To which family does Tobacco belong?",
    choices: [
      "Solanaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Tobacco (Nicotiana tabacum) belongs to Solanaceae."
  },
  {
    question: "To which family does Peanut belong?",
    choices: [
      "Poaceae",
      "Fabaceae",
      "Solanaceae",
      "Musaceae"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Peanut (Arachis hypogaea) belongs to Fabaceae."
  },
  {
    question: "To which family does Mungbean belong?",
    choices: [
      "Poaceae",
      "Fabaceae",
      "Solanaceae",
      "Musaceae"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Mungbean (Vigna radiata) belongs to Fabaceae."
  },
  {
    question: "To which family does Soybean belong?",
    choices: [
      "Poaceae",
      "Fabaceae",
      "Solanaceae",
      "Musaceae"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Soybean (Glycine max) belongs to Fabaceae."
  },
  {
    question: "To which family does Winged Bean belong?",
    choices: [
      "Poaceae",
      "Fabaceae",
      "Solanaceae",
      "Musaceae"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Winged Bean (Psophocarpus tetragonolobus) belongs to Fabaceae."
  },
  {
    question: "To which family does String Bean belong?",
    choices: [
      "Poaceae",
      "Fabaceae",
      "Solanaceae",
      "Musaceae"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "String Bean (Vigna unguiculata) belongs to Fabaceae."
  },
  {
    question: "To which family does Squash belong?",
    choices: [
      "Cucurbitaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Squash (Cucurbita moschata) belongs to Cucurbitaceae."
  },
  {
    question: "To which family does Watermelon belong?",
    choices: [
      "Cucurbitaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Watermelon (Citrullus lanatus) belongs to Cucurbitaceae."
  },
  {
    question: "To which family does Bitter Gourd belong?",
    choices: [
      "Cucurbitaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Bitter Gourd (Momordica charantia) belongs to Cucurbitaceae."
  },
  {
    question: "To which family does Cucumber belong?",
    choices: [
      "Cucurbitaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Cucumber (Cucumis sativus) belongs to Cucurbitaceae."
  },
  {
    question: "To which family does Sweet Potato belong?",
    choices: [
      "Convolvulaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Sweet Potato (Ipomoea batatas) belongs to Convolvulaceae."
  },
  {
    question: "To which family does Cassava belong?",
    choices: [
      "Euphorbiaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Cassava (Manihot esculenta) belongs to Euphorbiaceae."
  },
  {
    question: "To which family does Yam (Ubi) belong?",
    choices: [
      "Dioscoreaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Yam (Ubi) (Dioscorea alata) belongs to Dioscoreaceae."
  },
  {
    question: "To which family does Taro (Gabi) belong?",
    choices: [
      "Araceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Taro (Gabi) (Colocasia esculenta) belongs to Araceae."
  },
  {
    question: "To which family does Onion belong?",
    choices: [
      "Amaryllidaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Onion (Allium cepa) belongs to Amaryllidaceae."
  },
  {
    question: "To which family does Garlic belong?",
    choices: [
      "Amaryllidaceae",
      "Poaceae",
      "Fabaceae",
      "Solanaceae"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Garlic (Allium sativum) belongs to Amaryllidaceae."
  },
  {
    question: "Vector of Tungro Virus in Rice?",
    choices: [
      "Brown Planthopper",
      "Green Leafhopper",
      "Stem borer",
      "Rice Bug"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Nephotettix virescens."
  },
  {
    question: "Vector of Rice Grassy Stunt?",
    choices: [
      "Brown Planthopper",
      "Green Leafhopper",
      "Whitefly",
      "Aphids"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Nilaparvata lugens."
  },
  {
    question: "Causal organism of Rice Blast?",
    choices: [
      "Bacteria",
      "Fungus",
      "Virus",
      "Nematode"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Pyricularia oryzae (Fungus)."
  },
  {
    question: "Causal organism of Bacterial Leaf Blight?",
    choices: [
      "Xanthomonas oryzae",
      "Rhizoctonia solani",
      "Tungro virus",
      "Fusarium"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Bacteria."
  },
  {
    question: "Golden Apple Snail scientific name?",
    choices: [
      "Pomacea canaliculata",
      "Rattus rattus",
      "Nilaparvata",
      "Chilo"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Major rice pest."
  },
  {
    question: "Chemical to control weeds?",
    choices: [
      "Insecticide",
      "Herbicide",
      "Fungicide",
      "Rodenticide"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Herbicides kill plants."
  },
  {
    question: "Chemical to control insects?",
    choices: [
      "Insecticide",
      "Herbicide",
      "Fungicide",
      "Nematicide"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Kills insects."
  },
  {
    question: "Chemical to control fungi?",
    choices: [
      "Fungicide",
      "Bactericide",
      "Herbicide",
      "Acaricide"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Kills fungi."
  },
  {
    question: "Pre-emergence herbicide is applied?",
    choices: [
      "Before planting",
      "Before weed germination",
      "After weed germination",
      "Before harvest"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Prevents weed seeds from sprouting."
  },
  {
    question: "Post-emergence herbicide is applied?",
    choices: [
      "Before planting",
      "Before weeds appear",
      "After weeds appear",
      "During storage"
    ],
    correct: "C",
    subject: "Crop Science",
    explanation: "Kills existing weeds."
  },
  {
    question: "Example of systemic herbicide?",
    choices: [
      "Glyphosate",
      "Paraquat",
      "2,4-D",
      "Atrazine"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Translocates to roots."
  },
  {
    question: "Contact herbicide example?",
    choices: [
      "Paraquat",
      "Glyphosate",
      "Roundup",
      "2,4-D"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Kills only tissue it touches."
  },
  {
    question: "Soil particle with smallest size?",
    choices: [
      "Sand",
      "Silt",
      "Clay",
      "Gravel"
    ],
    correct: "C",
    subject: "Crop Science",
    explanation: "<0.002mm."
  },
  {
    question: "Soil texture with equal sand, silt, clay?",
    choices: [
      "Loam",
      "Sandy Loam",
      "Clay Loam",
      "Silt Loam"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Ideal agricultural soil."
  },
  {
    question: "Ability of soil to exchange cations?",
    choices: [
      "pH",
      "CEC (Cation Exchange Capacity)",
      "EC (Electrical Conductivity)",
      "Bulk Density"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Indicates soil fertility potential."
  },
  {
    question: "Primary macro-nutrients?",
    choices: [
      "N, P, K",
      "Ca, Mg, S",
      "Fe, Mn, Zn",
      "C, H, O"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Nitrogen, Phosphorus, Potassium."
  },
  {
    question: "Secondary macro-nutrients?",
    choices: [
      "N, P, K",
      "Ca, Mg, S",
      "Fe, Zn, Cu",
      "B, Cl, Mo"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Calcium, Magnesium, Sulfur."
  },
  {
    question: "Trace elements are called?",
    choices: [
      "Micronutrients",
      "Macronutrients",
      "Fertilizer",
      "Inoculant"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Needed in small amounts."
  },
  {
    question: "Complete fertilizer contains?",
    choices: [
      "N only",
      "N, P, and K",
      "P and K",
      "Organic matter"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Example: 14-14-14."
  },
  {
    question: "Urea (46-0-0) provides?",
    choices: [
      "Nitrogen",
      "Phosphorus",
      "Potassium",
      "Calcium"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "46% Nitrogen."
  },
  {
    question: "Muriate of Potash is?",
    choices: [
      "0-0-60",
      "14-14-14",
      "46-0-0",
      "16-20-0"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Source of Potassium."
  },
  {
    question: "Solophos is?",
    choices: [
      "0-18-0",
      "0-0-60",
      "46-0-0",
      "16-20-0"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Source of Phosphorus."
  },
  {
    question: "Ammonium Sulfate is?",
    choices: [
      "21-0-0",
      "46-0-0",
      "0-0-60",
      "16-20-0"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Contains Sulfur too."
  },
  {
    question: "Organic fertilizer comes from?",
    choices: [
      "Mined rocks",
      "Plant/Animal residue",
      "Chemical synthesis",
      "Air"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Compost, manure."
  },
  {
    question: "Ideal C:N ratio for composting?",
    choices: [
      "10:1",
      "30:1",
      "100:1",
      "1:1"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Efficient decomposition."
  },
  {
    question: "Vermicomposting uses?",
    choices: [
      "Ants",
      "Earthworms",
      "Beetles",
      "Flies"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Eudrilus eugeniae (African Night Crawler)."
  },
  {
    question: "Study of insects?",
    choices: [
      "Entomology",
      "Pathology",
      "Agronomy",
      "Horticulture"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Branch of zoology."
  },
  {
    question: "Study of plant diseases?",
    choices: [
      "Pathology",
      "Entomology",
      "Weed Science",
      "Genetics"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Phytopathology."
  },
  {
    question: "Metamorphosis with: Egg > Larva > Pupa > Adult?",
    choices: [
      "Complete",
      "Incomplete",
      "Gradual",
      "None"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Holometabolous."
  },
  {
    question: "Metamorphosis with: Egg > Nymph > Adult?",
    choices: [
      "Complete",
      "Incomplete",
      "Complex",
      "Simple"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Hemimetabolous."
  },
  {
    question: "Larva of a butterfly is called?",
    choices: [
      "Maggot",
      "Grub",
      "Caterpillar",
      "Wriggler"
    ],
    correct: "C",
    subject: "Crop Science",
    explanation: "Lepidoptera larva."
  },
  {
    question: "Larva of a fly is called?",
    choices: [
      "Maggot",
      "Grub",
      "Caterpillar",
      "Nymph"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Diptera larva."
  },
  {
    question: "Larva of a beetle is called?",
    choices: [
      "Maggot",
      "Grub",
      "Caterpillar",
      "Worm"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Coleoptera larva."
  },
  {
    question: "Weeds that complete lifecycle in 1 year?",
    choices: [
      "Annuals",
      "Biennials",
      "Perennials",
      "Sedges"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Die after seeding."
  },
  {
    question: "Weeds living more than 2 years?",
    choices: [
      "Perennials",
      "Annuals",
      "Biennials",
      "Ephemerals"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Harder to control."
  },
  {
    question: "Cyperus rotundus (Mutha) is a?",
    choices: [
      "Grass",
      "Sedge",
      "Broadleaf",
      "Fern"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Purple nutsedge."
  },
  {
    question: "Planting pattern: Square?",
    choices: [
      "Equal distance rows/hills",
      "Double rows",
      "Scatter",
      "Diagonal"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Standard layout."
  },
  {
    question: "Quincunx method?",
    choices: [
      "Square with one in center",
      "Triangular",
      "Hexagonal",
      "Rectangular"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Increases density by 15-20%."
  },
  {
    question: "Distance of planting depends on?",
    choices: [
      "Crop canopy",
      "Soil fertility",
      "Season",
      "All of the above"
    ],
    correct: "D",
    subject: "Crop Science",
    explanation: "Determines population density."
  },
  {
    question: "Intercropping is?",
    choices: [
      "Growing 1 crop",
      "Growing 2+ crops simultaneously",
      "Growing crops in sequence",
      "Fallowing"
    ],
    correct: "B",
    subject: "Crop Science",
    explanation: "Maximizes land use."
  },
  {
    question: "Crop Rotation is?",
    choices: [
      "Growing different crops in sequence",
      "Growing same crop yearly",
      "Mixed cropping",
      "Relay cropping"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Breaks pest cycles."
  },
  {
    question: "Rat management method?",
    choices: [
      "Baiting",
      "Trapping",
      "Hunting",
      "All of the above"
    ],
    correct: "D",
    subject: "Crop Science",
    explanation: "Integrated approach."
  },
  {
    question: "Scientific name of Mango?",
    choices: [
      "Mangifera indica",
      "Musa sapientum",
      "Carica papaya",
      "Psidium guajava"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "National fruit."
  },
  {
    question: "Coconut lethal yellowing is caused by?",
    choices: [
      "Phytoplasma",
      "Virus",
      "Fungus",
      "Bacteria"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Like bacteria but no cell wall."
  },
  {
    question: "Sigatoka is a disease of?",
    choices: [
      "Banana",
      "Rice",
      "Corn",
      "Mango"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Fungal leaf spot."
  },
  {
    question: "Panama disease attacks?",
    choices: [
      "Banana",
      "Coconut",
      "Coffee",
      "Cacao"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Fusarium wilt."
  },
  {
    question: "Cadang-cadang attacks?",
    choices: [
      "Coconut",
      "Abaca",
      "Banana",
      "Papaya"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Viroid disease."
  },
  {
    question: "Bunchy top is transmitted by?",
    choices: [
      "Aphids",
      "Beetles",
      "Thrips",
      "Mites"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Pentalonia nigronervosa."
  },
  {
    question: "Coffee Rust causal organism?",
    choices: [
      "Hemileia vastatrix",
      "Rhizoctonia",
      "Pythium",
      "Phytophthora"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Devastating fungal disease."
  },
  {
    question: "Golden Rice is engineered to produce?",
    choices: [
      "Vitamin A (Beta carotene)",
      "Vitamin C",
      "Iron",
      "Zinc"
    ],
    correct: "A",
    subject: "Crop Science",
    explanation: "Biofortification."
  }
];

function ReviewPageContent() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [skipped, setSkipped] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizLength, setQuizLength] = useState(10);
  const [answers, setAnswers] = useState<{selected: string | null, correct: boolean | null}[]>([]);
  const [skippedIndices, setSkippedIndices] = useState<number[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const subject = searchParams.get('subject');
  const filteredQuestions = subject ? questions.filter(q => q.subject === subject) : questions;

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      router.push('/login');
      return;
    }
    setCurrentUser(user);
  }, [router]);

  const handleSelect = (choice: string) => {
    setSelected(choice);
  };

  const handleNext = () => {
    if (!selected) {
      alert('Please select an answer first.');
      return;
    }

    const isCorrect = selected === currentQuestion.correct;
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {selected, correct: isCorrect};
    setAnswers(newAnswers);
    setScore(newAnswers.filter(a => a.correct).length);

    // Remove from skipped if was skipped
    setSkippedIndices(prev => prev.filter(i => i !== currentQuestionIndex));

    // Move to next question or show results
    moveToNext();
  };

  const handleSkip = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {selected: null, correct: false};
    setAnswers(newAnswers);
    setSkipped(skipped + 1);
    setSkippedIndices(prev => [...prev, currentQuestionIndex]);
    moveToNext();
  };

  const moveToNext = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelected(null);
    } else {
      setShowResults(true);
      saveResults();
    }
  };

  const saveResults = () => {
    if (!currentUser) return;
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    const result = {
      date: new Date().toISOString(),
      score,
      total: selectedQuestions.length,
      skipped: answers.filter(a => a.selected === null).length,
      subject
    };
    users[currentUser].history = users[currentUser].history || [];
    users[currentUser].history.push(result);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelected(null);
    setScore(0);
    setSkipped(0);
    setShowResults(false);
    setAnswers([]);
    setSkippedIndices([]);
    setSelectedQuestions([]);
    setQuizStarted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startQuiz = () => {
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    let selected = shuffled.slice(0, Math.min(quizLength, shuffled.length));
    
    // Shuffle choices for each question and update correct answer
    selected = selected.map(q => {
      const shuffledChoices = [...q.choices].sort(() => Math.random() - 0.5);
      const originalCorrectIndex = q.correct.charCodeAt(0) - 65;
      const originalCorrectChoice = q.choices[originalCorrectIndex];
      const newCorrectIndex = shuffledChoices.indexOf(originalCorrectChoice);
      const newCorrect = String.fromCharCode(65 + newCorrectIndex);
      return {
        ...q,
        choices: shuffledChoices,
        correct: newCorrect
      };
    });
    
    setSelectedQuestions(selected);
    setAnswers(new Array(selected.length).fill(null).map(() => ({selected: null, correct: null})));
    setSkippedIndices([]);
    setQuizStarted(true);
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  if (!quizStarted) {
    const maxLength = filteredQuestions.length;
    const lengthOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100].filter(l => l <= maxLength);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-brand-dark">
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
          <h2 className="text-3xl font-bold mb-4 text-brand-primary">Select Quiz Length</h2>
          <p className="text-lg mb-6">Choose how many questions you want to answer (max {maxLength}):</p>
          <div className="grid grid-cols-5 gap-4 mb-6">
            {lengthOptions.map(length => (
              <button
                key={length}
                onClick={() => setQuizLength(length)}
                className={`p-4 rounded-xl font-bold transition-all ${
                  quizLength === length
                    ? 'bg-brand-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-brand-light'
                }`}
              >
                {length}
              </button>
            ))}
          </div>
          <button
            onClick={startQuiz}
            className="bg-brand-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-md"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-brand-dark">
        <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold mb-4 text-brand-primary text-center">Quiz Complete!</h2>
          <div className="text-center mb-6">
            <p className="text-xl mb-2">
              Your score: {score} / {selectedQuestions.length}
            </p>
            <p className="text-lg mb-2">
              Skipped: {answers.filter(a => a.selected === null).length}
            </p>
            <p className="text-lg mb-6">
              Percentage: {Math.round((score / selectedQuestions.length) * 100)}%
            </p>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-brand-primary">Question Analysis:</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {answers.map((answer, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <p className="font-bold mb-2">{index + 1}. {selectedQuestions[index].question}</p>
                <p className="mb-1">
                  Your answer: {answer.selected ? `${answer.selected}. ${selectedQuestions[index].choices[answer.selected.charCodeAt(0) - 65]}` : 'Skipped'}
                  {answer.correct ? ' ✓' : ' ✗'}
                </p>
                <p className="mb-2 text-green-600">
                  Correct answer: {selectedQuestions[index].correct}. {selectedQuestions[index].choices[selectedQuestions[index].correct.charCodeAt(0) - 65]}
                </p>
                {!answer.correct && answer.selected && (
                  <p className="text-sm text-red-600 italic mb-2">
                    Why wrong: The selected option is incorrect. {selectedQuestions[index].explanation}
                  </p>
                )}
                <p className="text-sm text-gray-600 italic">
                  Explanation: {selectedQuestions[index].explanation}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-4 justify-center mt-6">
            <button 
              onClick={handleRestart}
              className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-md"
            >
              Take Another Quiz
            </button>
            <button 
              onClick={() => router.push('/')}
              className="bg-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-600 transition-all shadow-md"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-brand-dark">
      
      {/* Header / Progress Area */}
      <div className="w-full max-w-2xl mb-6 flex justify-between items-center">
        <span className="font-bold text-brand-primary">Board Exam Reviewer</span>
        <div className="flex items-center gap-4">
          <span className="text-sm bg-brand-accent text-white px-3 py-1 rounded-full">
            Question {currentQuestionIndex + 1} / {selectedQuestions.length}
          </span>
          {skippedIndices.length > 0 && (
            <select
              onChange={(e) => {
                const idx = parseInt(e.target.value) - 1;
                setCurrentQuestionIndex(idx);
                setSelected(answers[idx].selected);
              }}
              className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-full border border-red-300"
            >
              <option value="">Go back to skipped</option>
              {skippedIndices.map(i => (
                <option key={i} value={i + 1}>
                  Question {i + 1}
                </option>
              ))}
            </select>
          )}
          <button 
            onClick={() => router.push('/')}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition-all"
          >
            Quit to Home
          </button>
        </div>
      </div>

      {/* The Question Card */}
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        
        {/* Subject */}
        <div className="mb-4">
          <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            {currentQuestion.subject}
          </span>
        </div>
        
        {/* Question Text */}
        <h2 className="text-2xl font-bold mb-8 text-brand-primary leading-snug">
          {currentQuestion.question}
        </h2>

        {/* Choices Container */}
        <div className="space-y-3">
          {currentQuestion.choices.map((choice, index) => {
            const letter = String.fromCharCode(65 + index); // A, B, C, D
            return (
              <button 
                key={letter}
                onClick={() => handleSelect(letter)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 group ${
                  selected === letter 
                    ? 'border-brand-primary bg-brand-light' 
                    : 'border-gray-100 hover:border-brand-primary hover:bg-brand-light'
                }`}
              >
                <span className="font-bold text-brand-accent mr-3">{letter}.</span>
                <span className={selected === letter ? 'text-brand-primary' : 'group-hover:text-brand-primary'}>
                  {choice}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full max-w-2xl mt-8 flex justify-between">
        <button 
          onClick={handleSkip}
          className="bg-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-600 transition-all shadow-md"
        >
          Skip Question
        </button>
        <button 
          onClick={handleNext}
          className="bg-brand-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-md"
        >
          {currentQuestionIndex < selectedQuestions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
        </button>
      </div>

    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ReviewPageContent />
    </Suspense>
  );
}