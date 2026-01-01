export const uid = () =>
  crypto.randomUUID();

export const randomColor = () =>
  `hsl(${Math.random() * 360}, 80%, 60%)`;
