declare module '*.css';
declare module '*.scss';
declare module '*.sass';

/* Optional: typed CSS modules */
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}