export const state = {
  todo: []
};
export const reducer = (state = {}, { payload }) => {
  return { ...state, ...payload };
};
