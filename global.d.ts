// global.d.ts
declare global {
  interface Window {
    ym: (id: number, action: string, params?: any) => void;
  }

  function ym(id: number, action: string, params?: any): void;
}

export {};
