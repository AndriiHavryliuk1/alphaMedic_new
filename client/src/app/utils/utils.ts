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
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;'
  };

  return String(html).replace(/[&<>"']/g, (s) => {
    return __entityMap[s];
  });
}


export function getAncestorById(partialId, currentElem: HTMLElement, finalElemId?) {
  if (currentElem.id && currentElem.id.indexOf(partialId) > -1) {
    return currentElem;
  }

  let parent = currentElem.parentElement;
  while (parent || (finalElemId && parent.id === finalElemId)) {
    if (parent.id && parent.id.indexOf(partialId) > -1) {
      return parent;
    }
    parent = parent.parentElement;
  }

  return null;
}
