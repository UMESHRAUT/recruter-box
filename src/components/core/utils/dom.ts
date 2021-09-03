export function hasOverflowingText(el: HTMLElement, document: Document) {
  const clone = el.cloneNode(true) as HTMLElement;
  clone.style.display = 'inline';
  clone.style.width = 'auto';
  clone.style.maxWidth = 'none';
  clone.style.visibility = 'hidden';
  clone.style.position = 'absolute';
  clone.style.top = '0px';

  if (window.getComputedStyle) {
    const computedStyles = window.getComputedStyle(el);
    // @ts-ignore
    clone.style.fontSize = computedStyles['font-size'];
    // @ts-ignore
    clone.style.fontWeight = computedStyles['font-weight'];
  }

  document.body.append(clone);
  const ellipsized = clone.getBoundingClientRect().width
    > el.getBoundingClientRect().width;
  document.body.removeChild(clone);
  return ellipsized;
}
