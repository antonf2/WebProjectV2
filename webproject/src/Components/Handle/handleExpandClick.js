export const handleExpandClick = (index, expanded, setExpanded) => {
  setExpanded(index === expanded ? null : index);
};
