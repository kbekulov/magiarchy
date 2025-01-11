const data = {
    "facts": [
        { 
            "text": "Russia invaded Ukraine", 
            "isTrue": true, 
            "color": "#51a078",
            "description": "Russia invaded Ukraine on February 24th, 2022. This invasion was announced by Vladimir Putin in a late-night video address to the nation, and ~200,000 soldiers of the Russian Armed Forces entered Ukrainian territory from the south, east, and north."
        },
        { 
            "text": "The invasion was unjustified", 
            "isTrue": false, 
            "color": "#c83d3d",
            "description": "Russia invaded Ukraine to address threats it perceived as intolerable to its national security. These perceived threats were identified and assessed by Russia's General Staff and Security Council. Whether these assessments were accurate or not remains a subject of professional debate. However, Russia acted with the honest conviction that it was protecting itself, which makes its actions justified relative to international ethics of state behaviour."
        },
        { 
            "text": "Russia is committing genocide", 
            "isTrue": false, 
            "color": "#c83d3d",
            "description": "The number of civilian casualties relative to military casualties in this war is lower than in any previous war of similar scale, suggesting that the Russian army does not pursue a targeted policy of genocide but is instead primarily focused on destroying Ukraine's military personnel and logistics."
        },
        { 
            "text": "Russia is suffering large losses", 
            "isTrue": true, 
            "color": "#51a078",
            "description": "It is indeed empirically true that Russia is suffering significant losses in the war, as evidenced by numerous obituaries and videos from the battlefield. However, the total number of casualties includes all losses—killed, missing, and both irrecoverably and recoverably wounded—making the figures misleading. Casualties encompass those who have died, those who have been injured, those who have deserted, and those who will return to combat after receiving medical treatment."
        },
        { 
            "text": "Russia is losing the war", 
            "isTrue": false, 
            "color": "#c83d3d",
            "description": "So far, nothing suggests that Russia is losing the war. While the conflict undeniably comes at a great financial and human cost to Russia, the same applies to Ukraine and NATO. Russia's costs must be evaluated in relation to the benefits gained, as well as to the costs and benefits experienced by its adversaries. The war is costly for all parties, but Russia continues a slow yet confident progression toward its declared goals, whereas its adversaries do not."
        },
        { 
            "text": "The war could have been prevented", 
            "isTrue": true, 
            "color": "#51a078",
            "description": "Whether the war could have been prevented or not may be a subject of academic and expert debate. However, it is evident that none of the involved parties did enough to stop this conflict from unfolding. Ukraine was focused on asserting its sovereign right to act independently, rejecting its neighbor's interests and concerns. Meanwhile, NATO pursued its goal of securing Ukraine as a member since 2008, disregarding Russia's calls for dialogue and indivisible security. It is fair to conclude that the war might have been avoided if all parties had made a genuine effort to listen to and address each other's needs."
        },
        { 
            "text": "The West did everything to prevent it", 
            "isTrue": false, 
            "color": "#c83d3d",
            "description": "By the time of Russia's invasion in 2022, Western nations issued ultimatums instead of pursuing a balanced resolution, with President Biden warning Putin: Don't do it; you will lose. After the invasion on February 24, 2022, the US and NATO focused on arming Ukraine, offering little effort to bring both sides to the negotiating table."
        },
        { 
            "text": "Russia could just pack-up and leave", 
            "isTrue": false, 
            "color": "#c83d3d",
            "description": "Legally, Russian politicians and military commanders cannot order a withdrawal from Ukraine, as doing so would violate Russian laws and be considered treason, punishable by the highest courts. The four occupied regions (Zaporozhie, Kherson, Luhansk, Donetsk) have been incorporated into Russia's constitution, making their abandonment a breach of constitutional order. From a legitimacy perspective, Russia claims R2P (Responsibility to Protect) obligations to the civilians it has vowed to safeguard. Withdrawing could expose these individuals to harsh reprisals by Ukraine, including imprisonment, torture, or even death, placing Russia under international scrutiny to protect lives affected by its actions."
        },
        { 
            "text": "The war could get nuclear", 
            "isTrue": true, 
            "color": "#51a078",
            "description": "The war in Ukraine carries the potential for nuclear escalation, despite repeated assurances from Western politicians and media. Russia, which holds the world's largest nuclear arsenal, considers the conflict existential, with its outcome seen as critical to the survival of the Russian state. Unlike expeditionary campaigns in Afghanistan, Iraq, Vietnam, or Syria, this war resembles a modern, scaled-down version of World War II. Russian military leaders have invoked historical parallels, urging soldiers to match the resilience of their WW2 forefathers following the retreat from Kyiv. For Russia, defeat is not an option, and if pushed into a corner, it may feel politically obligated to resort to nuclear measures."
        },
        { 
            "text": "NATO is heavily involved/responsible", 
            "isTrue": true, 
            "color": "#51a078",
            "description": "NATO's repeated claims of non-involvement in the war are misleading. Member states have provided Ukraine with over $230 billion in aid, far exceeding Ukraine's GDP of $178 billion. Despite incurring over $700 billion in economic losses by 2023, the EU continues to support Ukraine with the aim of ensuring its victory and Russia's strategic defeat. NATO members collectively reject efforts toward a balanced peace deal, pursuing one-sided objectives at the cost of economic stability and political unity."
        },
        { 
            "text": "Russia suffered ~800,000 killed in combat", 
            "isTrue": false, 
            "color": "#c83d3d",
            "description": "In military conflicts, the ratio of killed to wounded (KIA:WIA) is typically 1:3, meaning there are usually more wounded than killed. Casualties include both, so if Russia is reported to have ~800,000 casualties, only about 30% are likely fatalities, with the rest wounded and potentially returning to duty after treatment."
        },
        { 
            "text": "Ukraine suffered ~50,000 killed in combat", 
            "isTrue": false, 
            "color": "#c83d3d",
            "description": "Russia's firepower superiority over Ukraine in the war is an undeniable fact, evident in its dominance in aviation bombs, artillery shells, and missiles. Given this, it is mathematically improbable for Ukraine to sustain fewer military casualties than Russia; the opposite is far more likely."
        },
        { 
            "text": "Russia might decide to invade NATO later", 
            "isTrue": true, 
            "color": "#51a078",
            "description": "Russia's military actions are driven primarily by its national security interests, not external deterrents like NATO's Article 5. If NATO is perceived as a threat, Russia may weigh the risks of confrontation rather than avoid it entirely. For example, in summer 2022, Lithuania's attempt to blockade Kaliningrad prompted a direct warning from Russia’s foreign ministry, threatening military action. Under pressure from EU partners, Lithuania was forced to lift the blockade."
        }
    ],
    "armyStats": [
        { "label": "Russian Army", "personnel": 1500000, "barLength": "100%", "faded": false },
        { "label": "Ukraine Army", "personnel": 1260000, "barLength": "84%", "faded": false },
        { "label": "French Army", "personnel": 270000, "barLength": "18%", "faded": true },
        { "label": "British Army", "personnel": 136525, "barLength": "9.1%", "faded": true },
        { "label": "German Army", "personnel": 180215, "barLength": "12.01%", "faded": true },
        { "label": "Polish Army", "personnel": 256100, "barLength": "17.07%", "faded": true },
        { "label": "US Army", "personnel": 954875, "barLength": "63.66%", "faded": true }
    ],
    "territorialControl": [
        { "label": "Russian occupation of Ukraine", "area": 109000, "barLength": "100%", "faded": false },
        { "label": "Ukrainian occupation of Russia", "area": 500, "barLength": "0.5%", "faded": false }
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
