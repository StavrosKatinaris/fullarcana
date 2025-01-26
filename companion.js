let turnCounter = 0;

// Classes with special counters
const specialClasses = {
    Healer: "Holy Essence",
    Druid: "Seasons",
    Barbarian: "Rage Points",
};

const seasons = ["Spring 🌸", "Summer ☀️", "Fall 🍂", "Winter ❄️"];

// Handle class change to update special counter
document.getElementById("class-select").addEventListener("change", (event) => {
    const selectedClass = event.target.value;
    const specialCounterGroup = document.querySelector(".special-counter-group");
    const specialCounterLabel = document.getElementById("special-counter-label");
    const specialCounterInput = document.getElementById("special-counter");
    const seasonCounter = document.getElementById("season-counter");

    if (specialClasses[selectedClass]) {
        specialCounterGroup.style.display = "flex";

        if (selectedClass === "Druid") {
            // Druid uses Seasons
            specialCounterLabel.textContent = "Seasons";
            specialCounterInput.style.display = "none";
            seasonCounter.style.display = "block";
            seasonCounter.textContent = localStorage.getItem("season-counter") || "Spring 🌸";
        } else {
            // Healer and Barbarian use numeric counters
            specialCounterLabel.textContent = specialClasses[selectedClass];
            specialCounterInput.style.display = "block";
            specialCounterInput.value = localStorage.getItem("special-counter") || 0;
            seasonCounter.style.display = "none";
        }
    } else {
        // Hide the special counter group if no special counter
        specialCounterGroup.style.display = "none";
    }
});

// Update HP and history with defense and block mechanics, ensuring HP does not drop below block value
const updateHP = (value, isHeal) => {
    const hpInput = document.getElementById("hp");
    const defense = parseInt(document.getElementById("defense").value, 10) || 0;
    const block = parseInt(document.getElementById("block").value, 10) || 0;

    let currentHP = parseInt(hpInput.value, 10) || 0;
    let effectiveValue = value;

    if (!isHeal) {
        // Apply defense first, then block
        effectiveValue = Math.max(value - defense, 0);
        effectiveValue = Math.max(effectiveValue - block, 0);
    }

    // Calculate new HP, ensuring it does not drop below block value
    let newHP = isHeal ? currentHP + value : currentHP - effectiveValue;
    if (!isHeal && newHP < block) {
        newHP = block; // Ensure HP does not drop below block
    }

    // Update HP input
    hpInput.value = Math.min(Math.max(newHP, 0), 200); // Clamp HP between 0 and 200

    // Update history
    const historyList = document.getElementById("history-list");
    const li = document.createElement("li");
    li.className = isHeal ? "heal" : "damage";
    li.textContent = `${currentHP} → ${hpInput.value} (${isHeal ? "+" : "-"}${value})`;
    historyList.prepend(li);
};



// Handle Heal and Damage buttons
document.getElementById("heal-button").addEventListener("click", () => {
    const value = parseInt(document.getElementById("value").value, 10);
    if (value > 0) updateHP(value, true);
    document.getElementById("value").value = 0;
});

document.getElementById("damage-button").addEventListener("click", () => {
    const value = parseInt(document.getElementById("value").value, 10);
    if (value > 0) updateHP(value, false);
    document.getElementById("value").value = 0;
});

// Handle Initiative Roll
document.getElementById("roll-initiative").addEventListener("click", () => {
    const roll = Math.floor(Math.random() * 20) + 1;
    const initiativeResult = document.getElementById("initiative-result");

    initiativeResult.textContent = `You rolled: ${roll}`;
    initiativeResult.classList.add("rolling");

    setTimeout(() => initiativeResult.classList.remove("rolling"), 500);

    // Update turn counter
    turnCounter++;
    document.getElementById("turn-counter").textContent = `Turn: ${turnCounter}`;

    // Update Seasons for Druid
    if (document.getElementById("class-select").value === "Druid") {
        const seasonCounter = document.getElementById("season-counter");
        const currentSeason = seasonCounter.textContent;
        const nextSeason = seasons[(seasons.indexOf(currentSeason) + 1) % seasons.length];
        seasonCounter.textContent = nextSeason;
        localStorage.setItem("season-counter", nextSeason);
    }
});

// Lock/Unlock class toggle button
document.getElementById("lock-class-toggle").addEventListener("click", () => {
    const classSelect = document.getElementById("class-select");
    const lockButton = document.getElementById("lock-class-toggle");

    if (lockButton.textContent === "Lock Selection") {
        classSelect.disabled = true;
        lockButton.textContent = "Locked Class";
    } else {
        classSelect.disabled = false;
        lockButton.textContent = "Lock Selection";
    }
});

// Save and Restore Data
const saveToLocalStorage = () => {
    localStorage.setItem("class-select", document.getElementById("class-select").value);
    localStorage.setItem("hp", document.getElementById("hp").value);
    localStorage.setItem("defense", document.getElementById("defense").value);
    localStorage.setItem("block", document.getElementById("block").value);
    localStorage.setItem("value", document.getElementById("value").value);
    const specialCounterInput = document.getElementById("special-counter");
    if (specialCounterInput.style.display === "block") {
        localStorage.setItem("special-counter", specialCounterInput.value);
    }
};

window.addEventListener("load", () => {
    document.getElementById("class-select").dispatchEvent(new Event("change"));
});

