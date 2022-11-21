
export class _newClass extends HTMLElement {
    connectedCallback() {
      let name = this.getAttribute('name')
      this.innerHTML = `<label>${name}안뇨오옹</label><input>`
    }
  }

  