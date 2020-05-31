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

export function getAncestorByClass(classForSearch, currentElem: HTMLElement) {
  if (currentElem.classList.contains(classForSearch)) {
    return currentElem;
  }

  let parent = currentElem.parentElement;
  while (parent) {
    if (parent.id && parent.classList.contains(classForSearch)) {
      return parent;
    }
    parent = parent.parentElement;
  }

  return null;
}

export function retnum(str) {
  const num = str.replace(/[^0-9]/g, '');
  return parseInt(num, 10);
}

export function getToothNumberFromNumber(str, isChild?) {
  let splitedNumber;
  if (isChild) {
    const num = retnum(str) + 40;
    splitedNumber = num.toString().split("");
  } else {
    splitedNumber = retnum(str).toString().split("");
  }
  return splitedNumber[0] + "." + splitedNumber[1];
}

export function sortItemsByText(items) {
  items.sort((a, b) => {
    if (a.text > b.text) {
      return -1;
    } else if (a.text < b.text) {
      return 1;
    }
    return 0;
  });
}

/**
 * Return duration in sec
 */
export function getDurationFromTime(timeValue: string): number {
  const separatedDuration = timeValue.split(':');
  return +separatedDuration[0] * 3600 + +separatedDuration[1] * 60;
}

export function getDayOfWeekStartedFromMonday(day: number): number {
  if (--day === -1) {
    return 6;
  }
  return day;
}
