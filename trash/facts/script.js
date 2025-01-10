document.addEventListener("DOMContentLoaded", () => {
    // Populate Facts
    const factsList = document.getElementById("facts-list");
    data.facts.forEach(fact => {
        const li = document.createElement("li");
        li.style.backgroundColor = fact.color;
        li.innerHTML = `${fact.text} <span class="icon"><i class="fas ${fact.isTrue ? 'fa-check' : 'fa-times'}"></i></span>`;
        factsList.appendChild(li);
    });

    // Populate Army Stats
    const armyStats = document.getElementById("army-stats");
    data.armyStats.forEach(stat => {
        const div = document.createElement("div");
        div.classList.add("progress-item");
        div.innerHTML = `
            <div class="progress-bar">
                <span class="label">${stat.label}: ${stat.personnel.toLocaleString()} personnel</span>
                <div class="bar"><span style="width: ${stat.barLength};"></span></div>
            </div>`;
        armyStats.appendChild(div);
    });

    // Populate Territorial Control
    const territorialControl = document.getElementById("territorial-control");
    data.territorialControl.forEach(control => {
        const div = document.createElement("div");
        div.classList.add("progress-item");
        div.innerHTML = `
            <div class="progress-bar">
                <span class="label">${control.label}: ${control.area.toLocaleString()} sq. km</span>
                <div class="bar"><span style="width: ${control.barLength};"></span></div>
            </div>`;
        territorialControl.appendChild(div);
    });

    // Populate Combat Losses
    const combatLosses = document.getElementById("combat-losses");
    data.combatLosses.forEach(loss => {
        const div = document.createElement("div");
        div.classList.add("progress-item");
        div.innerHTML = `
            <div class="progress-bar multi-section-bar" style="width: 100%; display: flex; border-radius: 10px; overflow: hidden;">
                <div class="section" style="background-color: #404040; width: 100%; text-align: center; color: white; font-weight: bold;">${loss.label}: ~${loss.total.toLocaleString()}</div>
                <div class="section" style="background-color: #c83d3d; width: ${loss.killed};">Killed</div>
                <div class="section" style="background-color: #51a078; width: ${loss.wounded};">Wounded or Missing</div>
            </div>`;
        combatLosses.appendChild(div);
    });
});
