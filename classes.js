const descriptions = {
    Warrior: "Warrior: Offensive powerhouse with equipment synergies and dual-wielding mechanics.",
    Mage: "Mage: Versatile caster with arcane attacks, utility, and resource management.",
    Rogue: "Rogue: Stealthy damage dealer with assassination combos and debuffs.",
    Healer: "Healer: Support-focused class excelling in recovery, buffs, and utility.",
    Hunter: "Hunter: Ranged combatant with animal companions, traps, and tracking abilities.",
    Paladin: "Paladin: Balanced protector with defensive auras, divine damage, and healing.",
    Warlock: "Warlock: High-risk, high-reward caster using curses, life tap, and apocalyptic spells.",
    Bard: "Bard: Synergistic class with musical notes that buff allies and debuff enemies.",
    Druid: "Druid: Adaptive class leveraging seasonal mechanics for varied effects.",
    Alchemist: "Alchemist: Resource-based class crafting potions and using elements strategically.",
    Shaman: "Shaman: Spirit walker manipulating weather and spiritual forces.",
    Necromancer: "Necromancer: Master of minions and discard pile manipulation.",
    Barbarian: "Barbarian: Rage-fueled melee fighter excelling in aggressive damage.",
    Duelist: "Duelist: Tactical class utilizing combo chains and counters.",
    Artificer: "Artificer: Biomechanical specialist with prosthetics and gadgets.",
    Wizard: "Wizard: Utility-focused caster with powerful spells and support capabilities.",
};

const modal = document.getElementById("class-modal");
const closeModal = document.getElementById("close-modal");
const description = document.getElementById("class-description");
const classImage = document.getElementById("class-image");
const moreAboutBtn = document.getElementById("more-about-btn");

document.querySelector(".class-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("class-item")) {
        const className = e.target.dataset.class;
        const classDesc = descriptions[className].split(": ");
        const modalLeft = document.querySelector(".modal-left");

        // Update modal text and image
        modalLeft.innerHTML = `
            <h2>${classDesc[0]}</h2>
            <p>${classDesc[1]}</p>
        `;
        classImage.src = `${className.toLowerCase()}.png`;
        moreAboutBtn.onclick = () => {
            window.location.href = `${className.toLowerCase()}.html`;
        };

        // Show modal
        modal.style.display = "flex";
    }
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
