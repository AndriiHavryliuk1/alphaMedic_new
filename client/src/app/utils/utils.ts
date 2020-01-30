

/**
 * Shows/hides the "loading" overlay.
 * @param status - true/false (show/hide)
 */
export function setLoading(status?) {
  if (status === false) { // hide loader
    document.body.classList.remove('is-loading');
  } else { // show loader
    document.getElementById('wait-msg').style.display = status ? 'none' : 'block';
    document.getElementById('load-msg').style.display = status ? 'block' : 'none';
    document.body.classList.add('is-loading');
  }
}

/**
 * Escape some html symbol to html numbers
 * @param html - incoming html
 */
export function escapeHTML(html: string) {
  const __entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;'
  };

  return String(html).replace(/[&<>"']/g, (s) => {
    return __entityMap[s];
  });
}