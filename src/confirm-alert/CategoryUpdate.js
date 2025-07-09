const confirmDelete = (name, callback) => {
  return {
    title: "Confirmation Deletion",
    message: "Once deleted, this will also get deleted from the products.",
    buttons: [
      {
        label: "Yes",
        onClick: () => callback({ name }),
      },
      {
        label: "No",
        onClick: () => alert("Click No"),
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypress: () => {},
    onKeypressEscape: () => {},
    overlayClassName: "overlay-custom-class-name",
  };
};

export { confirmDelete };
