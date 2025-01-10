const data = {
    "facts": [
        { "text": "Russia invaded Ukraine", "isTrue": true, "color": "#51a078" },
        { "text": "The invasion was unjustified", "isTrue": false, "color": "#c83d3d" },
        { "text": "Russia is committing genocide", "isTrue": false, "color": "#c83d3d" },
        { "text": "Russia is suffering large losses", "isTrue": true, "color": "#51a078" }
        // Add more facts as needed
    ],
    "armyStats": [
        { "label": "Russian Army", "personnel": 1500000, "barLength": "100%" },
        { "label": "Ukraine Army", "personnel": 1260000, "barLength": "84%" },
        { "label": "French Army", "personnel": 270000, "barLength": "18%" }
        // Add more armies as needed
    ],
    "territorialControl": [
        { "label": "Russian occupation of Ukraine", "area": 109000, "barLength": "100%" },
        { "label": "Ukrainian occupation of Russia", "area": 500, "barLength": "0.5%" }
    ],
    "combatLosses": [
        {
            "label": "Russia",
            "total": 800000,
            "killed": "30%",
            "wounded": "70%"
        },
        {
            "label": "Ukraine",
            "total": 1000000,
            "killed": "30%",
            "wounded": "70%"
        }
    ]
};
