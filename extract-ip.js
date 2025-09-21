// Extract IPs (or any text) from elements and download as a .txt file
(function downloadIPs({
  selector = "strong",        // CSS selector to pick elements (change if needed)
  filename = "shodan-ips.txt" // output filename
} = {}) {
  try {
    const nodes = document.querySelectorAll(selector);
    if (!nodes || nodes.length === 0) {
      console.warn("No elements found for selector:", selector);
      return;
    }

    const values = Array.from(nodes)
      .map(n => (n.textContent || "").replace(/["']/g, "").trim())
      .filter(Boolean);

    const unique = [...new Set(values)];
    const content = unique.join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
      a.remove();
    }, 1000);
  } catch (err) {
    console.error("Failed to extract/download IPs:", err);
  }
})();
