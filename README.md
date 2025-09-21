# Extract IPs JS

A simple JavaScript snippet to extract text (like IPs) from web page elements and download it as a `.txt` file. Perfect for security researchers, pentesters, or anyone who wants to collect structured data from websites.

---

## Features

- Extracts text from any HTML element using a CSS selector.
- Removes duplicates automatically.
- Downloads as a `.txt` file.
- Works directly in the browser console.
- Optional one-click bookmarklet version.

---

## Usage (Console Method)

1. Open the webpage containing the IPs or text you want to extract.
2. Open your browser console (`F12` → Console tab).
3. Paste the content of `extract-ips.js`.
4. Modify the `selector` if necessary.
5. The extracted text will be downloaded as `shodan-ips.txt`.

**Example:**

```javascript
downloadIPs({ selector: "strong", filename: "ips.txt" });
````

---

## One-Click Bookmarklet

For quick use without opening the console:

1. Create a new browser bookmark.
2. Paste the following code as the **URL**:

```javascript
javascript:(function(){function downloadIPs({selector="strong",filename="shodan-ips.txt"}={}){try{const nodes=document.querySelectorAll(selector);if(!nodes||nodes.length===0){console.warn("No elements found for selector:",selector);return}const values=[...new Set(Array.from(nodes).map(n=>(n.textContent||"").replace(/["']/g,"").trim()).filter(Boolean))];const content=values.join("\n");const blob=new Blob([content],{type:"text/plain;charset=utf-8"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=filename;a.style.display="none";document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(url);a.remove()},1000)}catch(err){console.error("Failed to extract/download IPs:",err)}}downloadIPs();})();
```

3. Name it e.g., **“Download IPs”**.
4. Open any page with IPs/text → click the bookmarklet → download happens automatically.

---

## License

MIT License

---


### ✅ Summary of Files & Structure
```

extract-ips-js/
├── extract-ips.js         # Main script
├── bookmarklet.txt        # Bookmarklet version
└── README.md              # Full usage instructions

```