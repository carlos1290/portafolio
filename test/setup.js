// Stubs de APIs que jsdom no implementa
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })
}

class IOStub {
  constructor(cb) {
    this.cb = cb
    IOStub.instances.push(this)
  }
  observe(el) {
    // En tests: todo lo observado se considera visible de inmediato
    this.cb([{ isIntersecting: true, target: el }], this)
  }
  unobserve() {}
  disconnect() {}
}
IOStub.instances = []

if (!window.IntersectionObserver) {
  window.IntersectionObserver = IOStub
}
