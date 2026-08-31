// `import.meta.url` is a WHATWG host standard and workerd provides it, but
// @cloudflare/workers-types does not declare it. Node's typings do — together
// with `dirname`, `filename` and `main`, none of which workerd has — so a
// narrow declaration is preferred over widening the workers to @types/node.
interface ImportMeta {
  readonly url: string;
}
