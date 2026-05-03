let currentUrl = new URL(location.href);

async function main() {
    const store = await chrome.storage.local.get("autoSimpleChords");
    const isAuto = store.autoSimpleChords || false;
    const isSimple = currentUrl.searchParams.get("chordType") === "simple";

    if (isAuto && !isSimple) {
        currentUrl.searchParams.set("chordType", "simple");
        location.replace(currentUrl.toString());
        return;
    }

    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}

function init() {
    cleanUI();
    setupToggle();

    setTimeout(() => cleanUI(), 1000);
}

function cleanUI() {
    document.querySelectorAll('[data-role="buy"]').forEach(el => el.setAttribute("data-role", ""));
    document.querySelectorAll('[data-role="scroll"]').forEach(el => el.setAttribute("data-role", ""));

    const classesToRemove = ["no-print", "open-pay"];
    document.querySelectorAll('.' + classesToRemove.join(', .')).forEach(el => {
        el.classList.remove(...classesToRemove);
    });

    document.querySelectorAll(".slp-feature-overlay").forEach(el => el.remove());
    document.querySelectorAll(".slp-videos-locked").forEach(el => el.classList.remove("slp-videos-locked"));
    document.querySelectorAll(".slp-video-card__lock-overlay").forEach(el => el.remove());

    document.querySelectorAll('[purchase]').forEach(el => {
        el.remove();
    });
}

async function setupToggle() {
    const bar = document.querySelector(".slp-action-bar__container");
    if (!bar) return;

    const fullToggle = bar.querySelector("#slp-easy-toggle");
    const compactToggle = bar.querySelector("#slp-easy-toggle-collapsed");
    if (!fullToggle && !compactToggle) return;

    const res = await chrome.storage.local.get("autoSimpleChords");
    let active = res.autoSimpleChords || false;

    const syncState = () => {
        document.querySelectorAll(".auto-easy-toggle-switch").forEach((toggle) => {
            toggle.classList.toggle("active", active);
        });
    };

    const createToggle = () => {
        const btn = document.createElement("div");
        btn.className = "auto-easy-toggle-switch";
        btn.innerHTML = `
            <span class="label">גרסה קלה אוטומטית</span>
            <div class="track"><div class="thumb"></div></div>
        `;

        btn.onclick = async () => {
            active = !active;
            syncState();
            await chrome.storage.local.set({ autoSimpleChords: active });
            currentUrl = new URL(location.href);

            if (active && currentUrl.searchParams.get("chordType") !== "simple") {
                currentUrl.searchParams.set("chordType", "simple");
                location.href = currentUrl.toString();
            }
        };

        return btn;
    };

    if (fullToggle && !fullToggle.previousElementSibling?.classList.contains("auto-easy-toggle-switch")) {
        fullToggle.before(createToggle());
    }

    if (compactToggle && !compactToggle.nextElementSibling?.classList.contains("auto-easy-toggle-switch")) {
        compactToggle.after(createToggle());
    }

    syncState();
}

main();