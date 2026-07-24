const API_BASE = "/api/mod";

// ---------- global state ----------
let animeCache = [];          // full anime rows, refreshed on load / after commit
let watchingEdits = {};       // { [animeId]: { field: newValue, ... } }
let watchingTileData = {};    // { [animeId]: anime row }, used to redraw a tile after Undo
let removedFromWatching = new Set(); // ids marked for removal from the watching list this session
let currentEditingAnimeId = null;

// ---------- helpers ----------
function $(id) { return document.getElementById(id); }

function toast(msg, type = "") {
  const t = $("toast");
  t.textContent = msg;
  t.className = "toast show" + (type ? " " + type : "");
  setTimeout(() => t.classList.remove("show"), 2600);
}

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: options.body instanceof FormData ? {} : { "Content-Type": "application/json" },
    ...options,
  });
  if (res.status === 401) {
    window.location.href = "/mod";
    throw new Error("Not authenticated");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

function boolBadge(val) {
  return val ? '<span class="badge yes">Yes</span>' : '<span class="badge no">No</span>';
}

// ---------- auth / session guard ----------
(async function guardSession() {
  try {
    const data = await api("/session");
    if (!data.loggedIn) window.location.href = "/mod";
  } catch (err) {
    window.location.href = "/mod";
  }
})();

$("logoutBtn").addEventListener("click", async () => {
  await api("/logout", { method: "POST" });
  window.location.href = "/mod";
});

// ---------- sidebar navigation ----------
const navItems = document.querySelectorAll(".nav-item[data-page]");
navItems.forEach((btn) => {
  btn.addEventListener("click", () => showPage(btn.dataset.page));
});

function showPage(page) {
  document.querySelectorAll(".page").forEach((p) => (p.style.display = "none"));
  navItems.forEach((b) => b.classList.toggle("active", b.dataset.page === page));
  $(`page-${page}`).style.display = "block";

  if (page === "view") loadViewTable();
  if (page === "add") loadNextId();
  if (page === "watching") loadWatchingTiles();
  if (page === "changes") loadChangesTable();
}

// ================================================================
// VIEW AND MODIFY ANIME
// ================================================================
async function loadViewTable() {
  const tbody = $("viewTableBody");
  tbody.innerHTML = '<tr class="loading-row"><td colspan="9">Loading...</td></tr>';
  try {
    const data = await api("/anime");
    animeCache = data.anime;
    if (!animeCache.length) {
      tbody.innerHTML = '<tr><td colspan="9" class="empty-state">No anime in database.</td></tr>';
      return;
    }
    tbody.innerHTML = animeCache
      .map(
        (a) => `
      <tr>
        <td>${a.image_path ? `<img class="thumb" src="/${a.image_path}" onerror="this.style.visibility='hidden'" />` : ""}</td>
        <td>${a.id}</td>
        <td>${escapeHtml(a.name)}</td>
        <td>${boolBadge(a.watched)}</td>
        <td>${boolBadge(a.watching)}</td>
        <td>${boolBadge(a.planned)}</td>
        <td>${escapeHtml(a.status || "")}</td>
        <td>${formatDateTime(a.updated_at)}</td>
        <td><button class="btn btn-small" onclick="jumpToEdit(${a.id})">Edit</button></td>
      </tr>`
      )
      .join("");
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="9" class="empty-state">Failed to load: ${escapeHtml(err.message)}</td></tr>`;
  }
}

function formatDateTime(value) {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d)) return "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) +
    " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function jumpToEdit(id) {
  showPage("edit");
  loadAnimeIntoEditForm(id);
}

// ================================================================
// ADD ANIME
// ================================================================
setupImageUpload("add_imageBox", "add_imageFile", "add_image_path", "add_imagePathShown", null);

async function loadNextId() {
  const display = $("add_id_display");
  display.value = "(auto-generated)";
  try {
    const data = await api("/anime/next-id");
    display.value = `${data.nextId} (auto-generated, estimated)`;
  } catch (err) {
    // leave the placeholder if this fails — non-critical
  }
}

$("addCancelBtn").addEventListener("click", () => {
  $("addForm").reset();
  $("add_image_path").value = "";
  $("add_imagePathShown").textContent = "";
  loadNextId();
});

$("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    name: $("add_name").value.trim(),
    image_path: $("add_image_path").value || null,
    watched: $("add_watched").checked,
    watching: $("add_watching").checked,
    planned: $("add_planned").checked,
    status: $("add_status").value.trim() || null,
    info: $("add_info").value.trim() || null,
    release_month: $("add_release_month").value || null,
    love_peace: $("add_love_peace").checked,
    growth_adventure: $("add_growth_adventure").checked,
    mind_psychology: $("add_mind_psychology").checked,
    conflict_battle: $("add_conflict_battle").checked,
  };
  if (!data.name) return toast("Name is required.", "error");

  try {
    await api("/changes", {
      method: "POST",
      body: JSON.stringify({ type: "add", animeId: null, animeName: data.name, data }),
    });
    toast("Add staged. Review it in Current Changes.", "success");
    $("addForm").reset();
    $("add_image_path").value = "";
    $("add_imagePathShown").textContent = "";
    refreshChangesCount();
    loadNextId();
  } catch (err) {
    toast(err.message, "error");
  }
});

// ================================================================
// EDIT ANIME
// ================================================================
$("editSearchBtn").addEventListener("click", () => runSearch("edit"));
$("editSearchInput").addEventListener("keydown", (e) => { if (e.key === "Enter") runSearch("edit"); });
$("deleteSearchBtn").addEventListener("click", () => runSearch("delete"));
$("deleteSearchInput").addEventListener("keydown", (e) => { if (e.key === "Enter") runSearch("delete"); });

async function runSearch(context) {
  const q = $(`${context}SearchInput`).value.trim();
  if (!q) return toast("Type an ID or name to search.", "error");
  try {
    const data = await api(`/anime/search?q=${encodeURIComponent(q)}`);
    const table = $(`${context}SearchTable`);
    const tbody = $(`${context}SearchResults`);
    if (!data.results.length) {
      table.style.display = "none";
      toast("No matches found.");
      return;
    }
    table.style.display = "table";
    tbody.innerHTML = data.results
      .map(
        (r) => `
      <tr>
        <td>${r.id}</td>
        <td>${escapeHtml(r.name)}</td>
        <td>${
          context === "edit"
            ? `<button class="btn btn-small" onclick="loadAnimeIntoEditForm(${r.id})">Edit</button>`
            : `<button class="btn btn-small btn-danger" onclick="confirmDelete(${r.id}, '${escapeHtml(r.name).replace(/'/g, "\\'")}')">Delete</button>`
        }</td>
      </tr>`
      )
      .join("");
  } catch (err) {
    toast(err.message, "error");
  }
}

setupImageUpload("edit_imageBox", "edit_imageFile", "edit_image_path", "edit_imagePathShown", "edit_imagePreview");

async function loadAnimeIntoEditForm(id) {
  try {
    const data = await api(`/anime/${id}`);
    const a = data.anime;
    currentEditingAnimeId = a.id;

    $("edit_id").value = a.id;
    $("edit_id_display").value = a.id;
    $("editFormAnimeName").textContent = a.name;
    $("edit_name").value = a.name || "";
    $("edit_image_path").value = a.image_path || "";
    $("edit_imagePathShown").textContent = a.image_path || "";
    const preview = $("edit_imagePreview");
    if (a.image_path) {
      preview.src = "/" + a.image_path;
      preview.style.display = "block";
    } else {
      preview.style.display = "none";
    }
    $("edit_watched").checked = !!a.watched;
    $("edit_watching").checked = !!a.watching;
    $("edit_planned").checked = !!a.planned;
    $("edit_status").value = a.status || "";
    $("edit_info").value = a.info || "";
    $("edit_release_month").value = a.release_month ? a.release_month.substring(0, 10) : "";
    $("edit_love_peace").checked = !!a.love_peace;
    $("edit_growth_adventure").checked = !!a.growth_adventure;
    $("edit_mind_psychology").checked = !!a.mind_psychology;
    $("edit_conflict_battle").checked = !!a.conflict_battle;

    $("editFormWrap").style.display = "block";
    $("editFormWrap").scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (err) {
    toast(err.message, "error");
  }
}

$("editCancelBtn").addEventListener("click", () => {
  $("editFormWrap").style.display = "none";
  currentEditingAnimeId = null;
});

$("editForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    name: $("edit_name").value.trim(),
    image_path: $("edit_image_path").value || null,
    watched: $("edit_watched").checked,
    watching: $("edit_watching").checked,
    planned: $("edit_planned").checked,
    status: $("edit_status").value.trim() || null,
    info: $("edit_info").value.trim() || null,
    release_month: $("edit_release_month").value || null,
    love_peace: $("edit_love_peace").checked,
    growth_adventure: $("edit_growth_adventure").checked,
    mind_psychology: $("edit_mind_psychology").checked,
    conflict_battle: $("edit_conflict_battle").checked,
  };
  if (!data.name) return toast("Name is required.", "error");

  try {
    await api("/changes", {
      method: "POST",
      body: JSON.stringify({ type: "edit", animeId: currentEditingAnimeId, animeName: data.name, data }),
    });
    toast("Edit staged. Review it in Current Changes.", "success");
    $("editFormWrap").style.display = "none";
    currentEditingAnimeId = null;
    refreshChangesCount();
  } catch (err) {
    toast(err.message, "error");
  }
});

// ================================================================
// DELETE ANIME
// ================================================================
async function confirmDelete(id, name) {
  if (!window.confirm(`Delete "${name}" (ID ${id})? This will be staged and only applied when you commit.`)) return;
  try {
    await api("/changes", {
      method: "POST",
      body: JSON.stringify({ type: "delete", animeId: id, animeName: name, data: null }),
    });
    toast("Deletion staged. Review it in Current Changes.", "success");
    refreshChangesCount();
    runSearch("delete");
  } catch (err) {
    toast(err.message, "error");
  }
}

// ================================================================
// IMAGE UPLOAD (shared by add + edit forms)
// ================================================================
function setupImageUpload(boxId, fileId, hiddenPathId, shownId, previewId) {
  const box = $(boxId);
  const fileInput = $(fileId);

  box.addEventListener("click", () => fileInput.click());
  box.addEventListener("dragover", (e) => { e.preventDefault(); box.classList.add("dragover"); });
  box.addEventListener("dragleave", () => box.classList.remove("dragover"));
  box.addEventListener("drop", (e) => {
    e.preventDefault();
    box.classList.remove("dragover");
    if (e.dataTransfer.files.length) uploadImage(e.dataTransfer.files[0], hiddenPathId, shownId, previewId);
  });
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length) uploadImage(fileInput.files[0], hiddenPathId, shownId, previewId);
  });
}

async function uploadImage(file, hiddenPathId, shownId, previewId) {
  const fd = new FormData();
  fd.append("image", file);
  try {
    toast("Uploading image...");
    const data = await api("/upload-image", { method: "POST", body: fd });
    $(hiddenPathId).value = data.path;
    $(shownId).textContent = data.path;
    if (previewId) {
      const preview = $(previewId);
      preview.src = "/" + data.path;
      preview.style.display = "block";
    }
    toast("Image uploaded.", "success");
  } catch (err) {
    toast("Image upload failed: " + err.message, "error");
  }
}

// ================================================================
// UPDATE WATCHING LIST
// ================================================================
async function loadWatchingTiles() {
  const wrap = $("watchingTiles");
  wrap.innerHTML = '<div class="empty-state">Loading...</div>';
  watchingEdits = {};
  watchingTileData = {};
  removedFromWatching = new Set();
  try {
    const data = await api("/anime");
    animeCache = data.anime;
    const watching = data.anime.filter((a) => a.watching);
    if (!watching.length) {
      wrap.innerHTML = '<div class="empty-state">Nothing is currently marked as watching.</div>';
      return;
    }
    watching.forEach((a) => { watchingTileData[a.id] = a; });
    wrap.innerHTML = watching.map(renderWatchingTile).join("");
  } catch (err) {
    wrap.innerHTML = `<div class="empty-state">Failed to load: ${escapeHtml(err.message)}</div>`;
  }
}

function renderWatchingTile(a) {
  return `
  <div class="tile" id="wtile-${a.id}">
    <div class="edited-flag">Edited (unsaved)</div>
    <div class="tile-title-row">
      <div class="tile-title">${escapeHtml(a.name)}</div>
      <button class="remove-watching-btn" title="Remove from watching list" onclick="confirmRemoveFromWatching(${a.id})">&#10005;</button>
    </div>
    <div class="tile-id">ID ${a.id}</div>

    ${watchingField(a.id, "season", "Season", a.season)}
    ${watchingField(a.id, "day", "Day", a.day)}
    ${watchingField(a.id, "status", "Status", a.status)}
    <div class="tile-field">
      <span class="label">Episode</span>
      <span class="actions">
        <span class="value" id="wval-${a.id}-current_episode">${a.current_episode ?? "-"}</span>
        <span class="value">/ ${a.total_episodes ?? "-"}</span>
        <button class="icon-btn" title="Edit" onclick="openFieldModal(${a.id}, 'current_episode', 'Current Episode', ${JSON.stringify(a.current_episode)})">&#9998;</button>
        <button class="icon-btn" title="+1 episode" onclick="incrementEpisode(${a.id}, ${a.current_episode ?? 0})">&#9650;</button>
      </span>
    </div>
    ${watchingField(a.id, "total_episodes", "Total Eps", a.total_episodes)}
  </div>`;
}

function confirmRemoveFromWatching(id) {
  const a = watchingTileData[id];
  const name = a ? a.name : `ID ${id}`;
  if (!window.confirm(`Remove "${name}" from the watching list? This clears season, day, status, and episode progress once staged.`)) return;
  markRemovedFromWatching(id);
}

function markRemovedFromWatching(id) {
  removedFromWatching.add(id);
  watchingEdits[id] = {
    watching: false,
    season: null,
    day: null,
    status: null,
    current_episode: null,
    total_episodes: null,
  };

  const a = watchingTileData[id] || {};
  const tile = $(`wtile-${id}`);
  if (!tile) return;
  tile.className = "tile marked-removed";
  tile.innerHTML = `
    <div class="tile-title-row">
      <div class="tile-title">${escapeHtml(a.name || `ID ${id}`)}</div>
    </div>
    <div class="tile-id">ID ${id}</div>
    <div class="removed-note">Marked for removal from watching</div>
    <button class="btn btn-small btn-secondary undo-btn" onclick="undoRemoveFromWatching(${id})">Undo</button>
  `;
}

function undoRemoveFromWatching(id) {
  removedFromWatching.delete(id);
  delete watchingEdits[id];
  const tile = $(`wtile-${id}`);
  const a = watchingTileData[id];
  if (tile && a) tile.outerHTML = renderWatchingTile(a);
}

function watchingField(id, field, label, value) {
  return `
  <div class="tile-field">
    <span class="label">${label}</span>
    <span class="actions">
      <span class="value" id="wval-${id}-${field}">${value ?? "-"}</span>
      <button class="icon-btn" title="Edit" onclick='openFieldModal(${id}, "${field}", "${label}", ${JSON.stringify(value)})'>&#9998;</button>
    </span>
  </div>`;
}

let modalContext = null; // { animeId, field }

function openFieldModal(animeId, field, label, currentValue) {
  modalContext = { animeId, field };
  $("fieldModalTitle").textContent = `Edit ${label}`;
  $("fieldModalOldValue").textContent = currentValue ?? "(empty)";
  $("fieldModalInput").value = currentValue ?? "";
  $("fieldModal").classList.add("show");
  $("fieldModalInput").focus();
}

$("fieldModalCancel").addEventListener("click", closeFieldModal);
function closeFieldModal() {
  $("fieldModal").classList.remove("show");
  modalContext = null;
}

$("fieldModalSave").addEventListener("click", () => {
  if (!modalContext) return;
  const newVal = $("fieldModalInput").value.trim();
  applyWatchingEdit(modalContext.animeId, modalContext.field, newVal);
  closeFieldModal();
});

function incrementEpisode(animeId, currentValue) {
  const base = watchingEdits[animeId]?.current_episode ?? currentValue ?? 0;
  applyWatchingEdit(animeId, "current_episode", Number(base) + 1);
}

function applyWatchingEdit(animeId, field, value) {
  if (!watchingEdits[animeId]) watchingEdits[animeId] = {};
  watchingEdits[animeId][field] = value;

  const tile = $(`wtile-${animeId}`);
  if (tile) tile.classList.add("edited");
  const valSpan = $(`wval-${animeId}-${field}`);
  if (valSpan) valSpan.textContent = value;
}

$("watchingSaveBtn").addEventListener("click", async () => {
  const ids = Object.keys(watchingEdits);
  if (!ids.length) return toast("No changes to save.");

  try {
    for (const id of ids) {
      const anime = animeCache.find((a) => a.id === Number(id)) || {};
      await api("/changes", {
        method: "POST",
        body: JSON.stringify({
          type: "edit",
          animeId: Number(id),
          animeName: anime.name || `ID ${id}`,
          data: watchingEdits[id],
        }),
      });
    }
    toast(`${ids.length} change(s) staged. Review them in Current Changes.`, "success");
    watchingEdits = {};
    refreshChangesCount();
    loadWatchingTiles();
  } catch (err) {
    toast(err.message, "error");
  }
});

// ================================================================
// CURRENT CHANGES
// ================================================================
async function loadChangesTable() {
  const tbody = $("changesTableBody");
  tbody.innerHTML = '<tr><td colspan="4" class="empty-state">Loading...</td></tr>';
  try {
    const data = await api("/changes");
    renderChangesTable(data.changes);
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="4" class="empty-state">Failed to load: ${escapeHtml(err.message)}</td></tr>`;
  }
}

function renderChangesTable(changes) {
  const tbody = $("changesTableBody");
  if (!changes.length) {
    tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No pending changes.</td></tr>';
    updateChangesCountBadge(0);
    return;
  }
  tbody.innerHTML = changes
    .map(
      (c, i) => `
    <tr>
      <td><span class="change-type-tag ${c.type}">${c.type}</span></td>
      <td>${escapeHtml(c.animeName)}${c.animeId ? ` <span style="color:var(--text-muted)">(ID ${c.animeId})</span>` : ""}</td>
      <td>${changeDetailSummary(c)}</td>
      <td><button class="btn btn-small btn-danger" onclick="removeChange(${i})">Remove</button></td>
    </tr>`
    )
    .join("");
  updateChangesCountBadge(changes.length);
}

function changeDetailSummary(c) {
  if (c.type === "delete") return "—";
  if (!c.data) return "—";
  const entries = Object.entries(c.data).slice(0, 6);
  return `<ul class="changes-detail-list">${entries
    .map(([k, v]) => `<li>${escapeHtml(k)}: ${escapeHtml(typeof v === "boolean" ? (v ? "true" : "false") : v)}</li>`)
    .join("")}</ul>`;
}

async function removeChange(index) {
  try {
    await api(`/changes/${index}`, { method: "DELETE" });
    loadChangesTable();
  } catch (err) {
    toast(err.message, "error");
  }
}

$("commitBtn").addEventListener("click", async () => {
  if (!window.confirm("Apply all staged changes to the live database? This cannot be undone.")) return;
  try {
    const data = await api("/changes/commit", { method: "POST" });
    toast(`Committed ${data.applied} change(s) to the database.`, "success");
    loadChangesTable();
    loadViewTable();
  } catch (err) {
    toast(err.message, "error");
  }
});

async function refreshChangesCount() {
  try {
    const data = await api("/changes");
    updateChangesCountBadge(data.changes.length);
  } catch (err) {
    // ignore
  }
}

function updateChangesCountBadge(n) {
  $("changesCount").textContent = n > 0 ? n : "";
}

// ---------- init ----------
showPage("view");
refreshChangesCount();
